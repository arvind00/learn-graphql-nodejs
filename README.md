# learn-graphql-nodejs
Project to learn graphql server setup with nodejs

## Server setup
- make a folder `server`
- open terminal to this folder path and run `npm init -y`
- create a file `server.js`
- updated the `package.json > script` to have `start: "nodemon server.js"`

## Installation

```sh
npm i cors graphql apollo-server-express -S
```

## Server code

```js 
const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const cors = require('cors');

// create graphql schema (query + resolvers)
const typeDefs = gql`
  type Query{
      hello: String
  }
`

const resolvers = {
    Query: {
        hello: () => 'Hello from Graphql'
    }
}

// 03 instantiate ApolloServer by passing the typeDefs and resolvers
const server = new ApolloServer({ typeDefs, resolvers });
server.applyMiddleware({ app });

app.listen({ port: PORT }, () => console.log(`server running at localhost:${PORT + server.graphqlPath}`));
```
