
export abstract class ChessPiece {
    type: string;
    position: [number, number];
    owner: string;
  
    constructor(type: string, position: [number, number], owner: string) {
      this.type = type;
      this.position = position;
      this.owner = owner;
    }
  
    abstract isValidMove(
      toRow: number,
      toCol: number,
      grid: (string | null)[][]
    ): boolean;
  }
  
  export class Pawn extends ChessPiece {
    isValidMove(toRow: number, toCol: number, grid: (string | null)[][]): boolean {
   
      const [currentRow, currentCol] = this.position;
      const direction = this.owner === "White" ? -1 : 1;
      const diffRow = toRow - currentRow;
  
      return (
        diffRow === direction &&
        grid[toRow][toCol] === null &&
        Math.abs(toCol - currentCol) <= 1
      );
    }
  }
  