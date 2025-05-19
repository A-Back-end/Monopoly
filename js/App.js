import { Client } from 'boardgame.io/react';
import { SocketIO } from 'boardgame.io/multiplayer';
import MonopolyLite from '../GameLogic';

const GameClient = Client({
  game: MonopolyLite,
  multiplayer: SocketIO({ server: 'localhost:8000' }),
  board: ({ G, ctx, moves }) => {
    return (
        <div>
        <h1>Monopoly Lite</h1>
        <p>Player's turn: {ctx.currentPlayer}</p>
        <p>Position: {G.players[ctx.currentPlayer].pos}</p>
        <button onClick={() => moves.rollDice()}>Roll the dice</button>
        <button onClick={() => moves.endTurn()}>End turn</button>
        <pre>{JSON.stringify(G.log, null, 2)}</pre>
      </div>      
    );
  }
});

export default GameClient;
