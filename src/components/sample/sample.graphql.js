export const typeDefs = `
extend type Query {
   hello: String
 }
 
`;

export const resolvers = {
  Query: {
    hello: () => 'Hello, graphql!'
  }
};
