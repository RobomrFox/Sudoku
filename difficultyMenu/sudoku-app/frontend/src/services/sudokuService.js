const API_URL = "http://localhost:8080/api/sudoku";

export const getSudokuPuzzle = async (difficulty) => {
  try {
    const response = await fetch(`${API_URL}/generate/${difficulty}`);
    if (!response.ok) {
      throw new Error("Failed to fetch puzzle");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching puzzle:", error);
    throw error;
  }
};
