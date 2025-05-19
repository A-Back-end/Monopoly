import { Server } from 'boardgame.io/server';
import MonopolyLite from './GameLogic.js';

const server = Server({
  games: [MonopolyLite],
});

server.run(8000);
