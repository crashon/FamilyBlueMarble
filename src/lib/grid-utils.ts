/**
 * Maps a linear position (0-39) to grid coordinates (row/col) on an 11x11 board.
 * Board perimeter: 40 spaces.
 */
export function getPositionCoordinates(position: number): { row: number; col: number } {
  // Normalize position to 0-39 range just in case
  const pos = position % 40;

  // Bottom edge (0-10): col 11->1, row 11
  if (pos <= 10) {
    return { row: 11, col: 11 - pos };
  }
  
  // Left edge (11-20): col 1, row 10->1
  if (pos <= 20) {
    return { row: 11 - (pos - 10), col: 1 };
  }
  
  // Top edge (21-30): col 2->11, row 1
  if (pos <= 30) {
    return { row: 1, col: 1 + (pos - 20) };
  }
  
  // Right edge (31-39): col 11, row 2->10
  return { row: 1 + (pos - 30), col: 11 };
}
