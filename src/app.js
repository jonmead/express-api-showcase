import { merge } from 'lodash';
import expressJwt from 'express-jwt';
import express from 'express';
import graphQLExpress from 'express-graphql';
import { makeExecutableSchema } from 'graphql-tools';
import { app, server } from './server/server';

/** import application components here */
import * as sample from './components/sample/sample.module';

/** graphql schemas  - add typeDefs and resolvers as needed */
const graphQLTypeDefs = [sample.typeDefs];
const resolvers = merge(sample.resolvers);
const schema = makeExecutableSchema({
  // need to specify a default query, then extend it in all modules
  typeDefs: ['type Query{_empty:String}', ...graphQLTypeDefs],
  resolvers
});

/** express routes */
// passing expressJwt({ secret: process.env.JWT_SECRET }) only allows requests through
// with a signed jwt token
app.use(express.static('public'));
app.get('/', (req, res) => res.send('espress-api-showcase'));
if (process.env.NODE_ENV === 'development') {
  app.use(
    '/graphiql',
    graphQLExpress({
      schema,
      pretty: true,
      graphiql: true
    })
  );
}
app.use(
  '/graphql',
  expressJwt({ secret: process.env.JWT_SECRET }),
  graphQLExpress({
    schema,
    pretty: true,
    graphiql: false
  })
);

app.use('/sample', sample.expressRouter);

/** start up the server */
const port = process.env.PORT;
server.listen(port, () => console.log(`Listening on port ${port}`)); // eslint-disable-line no-console
