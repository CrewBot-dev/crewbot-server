import { Route } from '../types';

const helloWorldRoute: Route = {
  endpoint: '/ping',
  method: 'GET',
  handler: (_req, res) => {
    res.send('Pong!');
  },
};

export { helloWorldRoute as route };
