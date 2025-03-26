import axios from "axios";

const API_URL = "http://localhost:8080/api/games";

/**
 * Saves the current game state to the database
 * @param {string} gameId - The unique ID for the game
 * @param {Array} board - 2D array representing the current board state
 * @param {boolean} completed - Whether the game is completed
 * @returns {Promise} The saved game data
 */
export const saveGameState = async (gameId, board, completed = false) => {
  try {
    const response = await axios.post(`${API_URL}/save`, {
      gameId,
      board,
      completed,
    });
    return response.data;
  } catch (error) {
    console.error("Error saving game state:", error);
    throw error;
  }
};

/**
 * Loads a game by its ID
 * @param {string} gameId - The unique ID for the game to load
 * @returns {Promise} The game data
 */
export const loadGame = async (gameId) => {
  try {
    const response = await axios.get(`${API_URL}/${gameId}`);
    return response.data;
  } catch (error) {
    console.error("Error loading game:", error);
    throw error;
  }
};

/**
 * Creates a new game with the given puzzle
 * @param {string} userId - The ID of the user playing (optional)
 * @param {string} puzzleId - The ID of the puzzle being played
 * @param {Array} initialGrid - The starting board state
 * @returns {Promise} The created game data
 */
export const startNewGame = async (userId, puzzleId, initialGrid) => {
  try {
    console.log("Starting new game with:", {
      userId,
      puzzleId,
      initialGridType: typeof initialGrid,
    });

    // Ensure we have a proper string representation
    const payload = {
      userId: userId || "guest",
      puzzleId: puzzleId || "puzzle_" + Date.now(),
      initialGrid: JSON.stringify(initialGrid),
    };

    console.log("Sending payload:", payload);

    const response = await axios.post(`${API_URL}/start`, payload);
    return response.data;
  } catch (error) {
    console.error("Error starting game:", error);
    if (error.response) {
      console.error("Error response data:", error.response.data);
    }
    throw error;
  }
};

/**
 * Generates a Sudoku puzzle using the external Sudoku API
 * @param {string} difficulty - 'easy', 'medium', or 'hard'
 * @returns {Promise} Object containing puzzle and solution
 */
export const generateSudokuPuzzle = async (difficulty) => {
  try {
    // Map our difficulty levels to API difficulty values (1-4)
    const difficultyMap = {
      easy: 1,
      medium: 2,
      hard: 4,
    };

    const difficultyValue = difficultyMap[difficulty] || 1;
    const response = await axios.get(
      `https://sudoku-api.vercel.app/api/dosuku?difficulty=${difficultyValue}`
    );

    if (
      !response.data ||
      !response.data.newboard ||
      !response.data.newboard.grids
    ) {
      throw new Error("Invalid API response format");
    }

    const apiPuzzle = response.data.newboard.grids[0];

    // Check if we have the expected data structures
    if (!apiPuzzle.value || !apiPuzzle.solution) {
      throw new Error("Unexpected API response structure");
    }

    const puzzle = apiPuzzle.value;
    const solution = apiPuzzle.solution;

    // Log for debugging
    console.log("API Response puzzle:", puzzle);
    console.log(`Generated ${difficulty} puzzle from API`);

    return {
      board: puzzle,
      solution: solution,
      difficulty: difficulty,
    };
  } catch (error) {
    console.error("Error generating puzzle from API:", error);
    throw error;
  }
};

/**
 * Validates if the current board matches the solution
 * @param {Array} currentBoard - Current state of the game board
 * @param {Array} solution - Solution for the puzzle
 * @returns {boolean} Whether the board is solved correctly
 */
export const validateSolution = (currentBoard, solution) => {
  if (!currentBoard || !solution) return false;

  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (currentBoard[row][col] !== solution[row][col]) {
        return false;
      }
    }
  }
  return true;
};

/**
 * Creates a complete game flow - generates puzzle and starts game
 * @param {string} difficulty - Difficulty level ('easy', 'medium', 'hard')
 * @param {string} userId - User identifier
 * @returns {Promise} Game data with puzzle
 */
export const createNewGame = async (difficulty, userId = "guest") => {
  try {
    // 1. Generate a puzzle from the API
    const puzzleData = await generateSudokuPuzzle(difficulty);

    // Log the solution to verify format
    console.log("Solution from API:", puzzleData.solution);

    // 2. Create a puzzle ID
    const puzzleId = `puzzle_${difficulty}_${Date.now()}`;

    // 3. Start a new game with the generated puzzle
    const gameData = await startNewGame(userId, puzzleId, puzzleData.board);

    // 4. Add the solution to the game data (but don't store in DB)
    return {
      ...gameData,
      currentGrid: JSON.stringify(puzzleData.board),
      solution: puzzleData.solution,
      difficulty,
    };
  } catch (error) {
    console.error("Error creating new game:", error);
    throw error;
  }
};
