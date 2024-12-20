import { Grid } from "./grid";
import { Player } from "./player";

export class ChessGame {
  private grid: Grid;
  private players: Player[];
  private currentPlayerIndex: number;

  constructor() {
    this.grid = new Grid();
    this.grid.initializePieces();
    this.players = [
      new Player("Player 1", "White"),
      new Player("Player 2", "Black"),
    ];
    this.currentPlayerIndex = 0;
    this.printBoard();
  }

  printBoard(): void {
    const board = this.grid.getBoard();
   
    for (let row = 0; row < 8; row++) {
      let rowStr = '';
      for (let col = 0; col < 8; col++) {
        const piece = board[row][col];
        rowStr += piece ? piece.padEnd(15) : 'Empty'.padEnd(15);
      }
      console.log(rowStr);
    }
  
  }

  move(
    player: Player,
    piece: string,
    fromRow: number,
    fromCol: number,
    toRow: number,
    toCol: number
  ): boolean {
    const currentPlayer = this.players[this.currentPlayerIndex];

   
    if (currentPlayer.color !== player.color) {
      console.log("It's not your turn!");
      return false;
    }


    const board = this.grid.getBoard();
    const currentPiece = board[fromRow][fromCol];

  
    if (!currentPiece || !currentPiece.includes(player.color)) {
      console.log("No valid piece at the specified starting position!");
      return false;
    }

    if (currentPiece !== piece) {
      console.log("The piece at the starting position doesn't match the specified piece!");
      return false;
    }

 
    let isValidMove = this.isValidMove(piece, fromRow, fromCol, toRow, toCol);

    if (!isValidMove) {
      console.log("Invalid move for the piece!");
      return false;
    }

 
    this.grid.updatePosition(fromRow, fromCol, toRow, toCol);

  
    this.currentPlayerIndex = (this.currentPlayerIndex + 1) % 2;
    return true;
  }


  isValidMove(piece: string, fromRow: number, fromCol: number, toRow: number, toCol: number): boolean {
    const board = this.grid.getBoard();
    
    switch (piece) {
      case "White Pawn":
      case "Black Pawn":
        return this.isValidPawnMove(piece, fromRow, fromCol, toRow, toCol);
      case "White Queen":
      case "Black Queen":
        return this.isValidQueenMove(piece, fromRow, fromCol, toRow, toCol);
      
      case "White King":
      case "Black King":
        return this.isValidKingMove(piece, fromRow, fromCol, toRow, toCol);
      default:
        return false;
    }
  }



  isValidKingMove(piece: string, fromRow: number, fromCol: number, toRow: number, toCol: number): boolean {
    const rowDiff = Math.abs(toRow - fromRow);
    const colDiff = Math.abs(toCol - fromCol);
    return (rowDiff <= 1 && colDiff <= 1);
  }

  isValidPawnMove(piece: string, fromRow: number, fromCol: number, toRow: number, toCol: number): boolean {
    console.log("Pawn Movement")
    const direction = piece === "White Pawn" ? -1 : 1; // White moves up, Black moves down
    const board = this.grid.getBoard();
    
    

    if (toCol === fromCol && toRow === fromRow + direction) {
      
      if (!board[toRow][toCol]) {
        
        return true; 
      }
    }

   
    if (toCol === fromCol && toRow === fromRow + 2 * direction && (fromRow === 6 || fromRow === 1)) {
   
      if (!board[toRow][toCol] && !board[toRow - direction][toCol]) {
       
        return true; 
      }
    }

   
    if (Math.abs(toCol - fromCol) === 1 && toRow === fromRow + direction) {
      
      const targetPiece = board[toRow][toCol];
      if (targetPiece && !targetPiece.includes(piece.charAt(0))) {
       
        return true; 
      }
    }

    return false;
  }

  
  isValidQueenMove(piece: string, fromRow: number, fromCol: number, toRow: number, toCol: number): boolean {
    const board = this.grid.getBoard();

 
  if (fromRow === toRow) {
    for (let i = Math.min(fromCol, toCol) + 1; i < Math.max(fromCol, toCol); i++) {
      if (board[fromRow][i]) return false; 
    }
    return true;
  }

 
  if (fromCol === toCol) {
    for (let i = Math.min(fromRow, toRow) + 1; i < Math.max(fromRow, toRow); i++) {
      if (board[i][fromCol]) return false; 
    }
    return true;
  }

 let temp1=Math.abs(fromRow - toRow)
 let temp2=Math.abs(fromCol - toCol)
 console.log(temp1,temp2)
  if (Math.abs(fromRow - toRow) === Math.abs(fromCol - toCol)) {

    const rowDir = toRow > fromRow ? 1 : -1;
    const colDir = toCol > fromCol ? 1 : -1;

    let r = fromRow + rowDir;
    let c = fromCol + colDir;

    
    while (r !== toRow && c !== toCol) {
      if (board[r][c]) return false;
      r += rowDir;
      c += colDir;
    }
    return true;
  }

  return false;
  }

  isKingInCheck(player: Player): boolean {
    const kingPosition = this.findKingPosition(player);
    const opponent = player.color === "White" ? "Black" : "White";
    const board = this.grid.getBoard();

    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        const piece = board[row][col];
        if (piece && piece.startsWith(opponent)) {
          
          if (this.isValidMove(piece, row, col, kingPosition.row, kingPosition.col)) {
            return true;
          }
        }
      }
    }
    return false;
  }

  findKingPosition(player: Player): { row: number, col: number } {
    const board = this.grid.getBoard();
    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        if (board[row][col] === `${player.color} King`) {
          return { row, col };
        }
      }
    }
    throw new Error("King not found!");
  }


  isCheckmate(player: Player): boolean {
    if (!this.isKingInCheck(player)) {
      return false; 
    }
   
    const opponent = player.color === "White" ? "Black" : "White";
    const board = this.grid.getBoard();

    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        const piece = board[row][col];
        if (piece && piece.startsWith(player.color)) {
          
          for (let toRow = 0; toRow < 8; toRow++) {
            for (let toCol = 0; toCol < 8; toCol++) {
              if (this.isValidMove(piece, row, col, toRow, toCol)) {
               
                const originalPiece = board[toRow][toCol];
                board[toRow][toCol] = piece;
                board[row][col] = null;
                if (!this.isKingInCheck(player)) {
                  board[toRow][toCol] = originalPiece;
                  board[row][col] = piece;
                  return false; 
                }
               
                board[toRow][toCol] = originalPiece;
                board[row][col] = piece;
              }
            }
          }
        }
      }
    }
    return true; 
  }

  winner(): string {
    if (this.isCheckmate(this.players[1])) {
      return "Black Wins!";
    } else if (this.isCheckmate(this.players[0])) {
      return "White Wins!";
    }
    return "No winner yet!";
  }
}
