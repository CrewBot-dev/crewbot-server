import express = require('express');
import { readdirSync } from 'fs';
import logger from './logger';
import { Route, RouteHandler } from './types';

const app = express();

const wrapWithErrorHandler = (handler: RouteHandler): RouteHandler => {
  // yum 😋🍛
  const curry: RouteHandler = (req, res) => {
    try {
      return handler(req, res);
    } catch (e) {
      const error = e as Error;

      logger.error(error.message);

      res.sendStatus(500);
    }
  };

  return curry;
};

const routeFiles = readdirSync('./src/routes')
  .filter((path) => path.endsWith('.ts') || path.endsWith('.js'))
  .map((path) => path.slice(0, -3)) // remove extension
  .map((path) => './routes/' + path); // add relative directory

for (const routeFile of routeFiles) {
  const { route } = require(routeFile) as { route: Route };

  if (!route) {
    // module does not export a route, skip this file
    logger.warn(`${routeFile} does not export a Route named 'route'`);
    continue;
  }

  const wrappedHandler = wrapWithErrorHandler(route.handler);

  logger.info(`Registering ${route.method} ${route.endpoint} to ${routeFile}`);

  if (route.method === 'GET') {
    app.get(route.endpoint, wrappedHandler);
  } else if (route.method === 'POST') {
    app.post(route.endpoint, wrappedHandler);
  }
}

app.listen(3000, () => logger.info('Server is running.'));
