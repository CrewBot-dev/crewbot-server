import { dbGet, dbHasKey } from '../database';
import { Game, Route } from '../types';

const getGameRoute: Route = {
  endpoint: '/games/:gameId',
  method: 'GET',
  handler: (req, res) => {
    const { gameId } = req.params;

    if (!dbHasKey(gameId)) {
      return res.sendStatus(404);
    } else {
      return res.send(dbGet(gameId) as Game);
    }
  },
};

export { getGameRoute as route };
