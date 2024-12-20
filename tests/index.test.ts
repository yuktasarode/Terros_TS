import { exampleFunction } from "../src/index";

import { ChessGame } from "../src/chess";
import { Player } from "../src/player";

test("exampleFunction returns the correct string", () => {
    expect(exampleFunction()).toBe("Hello, Terros!");
});



test("Simulate Fools Mate", () => {
    const game = new ChessGame();
    const player1 = new Player("Player 1", "White");
    const player2 = new Player("Player 2", "Black");
  
   
    expect(game.move(player1, "White Pawn", 6, 6, 4, 6)).toBe(true);
  
    
    expect(game.move(player2, "Black Pawn", 1, 4, 3, 4)).toBe(true);

   
    expect(game.move(player1, "White Pawn", 6, 5, 5, 5)).toBe(true);
  
   
    expect(game.move(player2, "Black Queen", 0, 3, 4, 7)).toBe(true);
  
   
    expect(game.winner()).toBe("Black Wins!");
    
  });

 