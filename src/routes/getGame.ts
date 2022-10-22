import { Game, Route } from '../types';

const getGameRoute: Route = {
  endpoint: '/games/:gameId',
  method: 'GET',
  handler: (req, res) => {
    // TODO: this should come from the datastore instead lol
    const tempGame: Game = {
      id: req.params['gameId'].toString(),
      created: Date.now(),
    };

    res.send(tempGame);
  },
};

export { getGameRoute as route };
