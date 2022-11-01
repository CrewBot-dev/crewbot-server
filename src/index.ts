import express = require('express');
import { readdirSync } from 'fs';
import path = require('path');
import { Config } from './config';
import logger from './logger';
import { Route, RouteHandler } from './types';

const app = express();

const wrapWithErrorHandler = (handler: RouteHandler): RouteHandler => {
  // yum 😋🍛
  const curry: RouteHandler = (req, res) => {
    try {
      return handler(req, res);
    } catch (e) {
      logger.error((e as Error).message);
      res.sendStatus(500);
    }
  };

  return curry;
};

// __dirname + routes = path to routes directory independent of cwd or build/not-build
const routeFiles = readdirSync(path.join(__dirname, 'routes'))
  .filter((path) => path.endsWith('.ts') || path.endsWith('.js'))
  .map((path) => path.slice(0, -3)) // remove extension
  .map((path) => './routes/' + path); // imports are relative

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

app.listen(Config.listenPort, () => logger.info('Server is running.'));

logger.debug(Config);
