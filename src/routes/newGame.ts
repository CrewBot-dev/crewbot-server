import { Game, Route } from '../types';
import { randomUUID } from 'crypto';
import { dbSet } from '../database';

const newGameRoute: Route = {
  endpoint: '/newGame',
  method: 'GET',
  handler: (_req, res) => {
    // generate a unique access token for this game and create an entry in the datastore
    const newGame: Game = {
      id: randomUUID(),
      created: Date.now(),
    };

    dbSet(newGame.id, newGame);
    res.send(newGame);
  },
};

export { newGameRoute as route };
