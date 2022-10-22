import { Game, Route } from '../types';
import { randomUUID } from 'crypto';

const newGameRoute: Route = {
  endpoint: '/games/new',
  method: 'GET',
  handler: (_req, res) => {
    // generate a unique access token for this game and create an entry in the datastore
    const newGame: Game = {
      id: randomUUID(),
      created: Date.now(),
    };

    res.send(newGame);
  },
};

export { newGameRoute as route };
