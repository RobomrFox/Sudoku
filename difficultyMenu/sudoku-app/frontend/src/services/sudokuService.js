import { generateSudokuPuzzle } from "./gameService";

const API_URL = "http://localhost:8080/api/sudoku";

export const getSudokuPuzzle = async (difficulty) => {
  try {
    // Use the external API through our gameService method
    return await generateSudokuPuzzle(difficulty);
  } catch (error) {
    console.error("Error fetching puzzle:", error);
    throw error;
  }
};
