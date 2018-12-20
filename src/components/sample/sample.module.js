import express from 'express';
import expressJwt from 'express-jwt';
import * as controller from './sample.controller';

export { typeDefs, resolvers } from './sample.graphql';

export const expressRouter = express.Router();
expressRouter.get('/ping', controller.ping);
expressRouter.route('/login').post(controller.login);
expressRouter.route('/create').post(controller.createUser, controller.login);
expressRouter
  .route('/jwtProtected')
  .post(expressJwt({ secret: process.env.JWT_SECRET }), controller.ping);
