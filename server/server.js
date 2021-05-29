const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const cors = require('cors');

const PORT = process.env.port || 5000;
const app = express();
app.use(express.json(), cors());

// create graphql schema (query + resolvers)
const typeDefs = gql`
  type Query{
    message: String
    randomNumber: Int
  }
`

const resolvers = {
    Query: {
        message: () => 'Hello from Graphql',
        randomNumber: ()=> Math.floor(Math.random() * 10) + 1
    }
}

// initialize apollo server epxress
const server = new ApolloServer({ typeDefs, resolvers });
server.applyMiddleware({ app });

app.listen({ port: PORT }, () => console.log(`server running at localhost:${PORT + server.graphqlPath}`));