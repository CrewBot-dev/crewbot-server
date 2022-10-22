import express = require('express');

export type RouteHandler = (request: express.Request, response: express.Response) => any;

/**
 * Represents an API route.
 */
export interface Route {
  endpoint: string;
  method: 'GET' | 'POST';
  handler: RouteHandler;
}

/**
 * Represents a CrewBot game.
 */
export interface Game {
  id: string;
  created: number;
}
