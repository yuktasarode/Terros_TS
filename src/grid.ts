
export class Grid {
    private board: (string | null)[][];
  
    constructor() {
      this.board = Array(8)
        .fill(null)
        .map(() => Array(8).fill(null));
    }
  

    initializePieces(): void {
     
      for (let i = 0; i < 8; i++) {
        this.board[1][i] = "Black Pawn";
        this.board[6][i] = "White Pawn";
      }
     
      this.board[0][0] = this.board[0][7] = "Black Rook";
      this.board[7][0] = this.board[7][7] = "White Rook";
    
      this.board[0][1] = this.board[0][6] = "Black Knight";
      this.board[7][1] = this.board[7][6] = "White Knight";
 
      this.board[0][2] = this.board[0][5] = "Black Bishop";
      this.board[7][2] = this.board[7][5] = "White Bishop";
   
      this.board[0][3] = "Black Queen";
      this.board[7][3] = "White Queen";
  
      this.board[0][4] = "Black King";
      this.board[7][4] = "White King";
    }
  
    getBoard(): (string | null)[][] {
      return this.board;
    }
  
    updatePosition(
      fromRow: number,
      fromCol: number,
      toRow: number,
      toCol: number
    ): void {
      
      this.board[toRow][toCol] = this.board[fromRow][fromCol];
      this.board[fromRow][fromCol] = null;
      console.log(this.board)
    }
  }
  