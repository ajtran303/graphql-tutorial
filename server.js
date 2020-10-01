var express = require('express');
var { graphqlHTTP } = require('express-graphql');
var { buildSchema } = require('graphql');

// Initialize a GraphQL schema
var schema = buildSchema(`
  type Query {
    user(id: Int!): Person
    users(shark: String): [Person]
  },
  type Person {
    id: Int
    name: String
    age: Int
    shark: String
  }
`);

// Root resolver
var root = {
  hello: () => 'Hello world!'
};

// Create express server and GraphQL endpoint
var app = express();
app.use('/graphql', graphqlHTTP({
  schema: schema, // Required
  rootValue: root,
  graphiql: true, // Enable browser to access GraphiQL
}));
app.listen(4000, () => console.log('Now browse to localhost:4000/graphql'));
