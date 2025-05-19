import { INVALID_MOVE } from 'boardgame.io/core';

const MonopolyLite = {
  setup: () => ({
    players: [
      { pos: 0, money: 1500, properties: [] },
      { pos: 0, money: 1500, properties: [] }
    ],
    currentPlayer: 0,
    log: [],
  }),

  moves: {
    answerQuestion(G, ctx, isCorrect) {
      if (!isCorrect) return INVALID_MOVE;
      return G;
    },

    rollDice(G, ctx) {
      const roll = Math.ceil(Math.random() * 6);
      const player = G.players[ctx.currentPlayer];
      player.pos = (player.pos + roll) % 40;
      G.log.push(`Player ${ctx.currentPlayer} rolled ${roll}`);
    },

    endTurn(G, ctx) {
      ctx.events.endTurn();
    }
  },

  turn: {
    order: {
      first: () => 0,
      next: (G, ctx) => (ctx.playOrderPos + 1) % ctx.numPlayers,
    },
  },

  endIf: (G, ctx) => {
    const bankrupt = G.players.find(p => p.money <= 0);
    if (bankrupt) return { winner: G.players.findIndex(p => p.money > 0) };
  },
};

export default MonopolyLite;
