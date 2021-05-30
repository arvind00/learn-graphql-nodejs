const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const cors = require('cors');

const PORT = process.env.port || 5000;
const app = express();
app.use(express.json(), cors());

// employee list
const employeeList = [
  { id: 622052, firstName: 'Arvindchand', lastName: 'Lairenjam', jobjLevel: 4 },
  { id: 603108, firstName: 'Ankitha', lastName: 'Mittal', jobjLevel: 4 },
]

// create graphql schema (query + resolvers)
const typeDefs = gql`
  type Employee {
    id: ID!
    firstName: String
    lastName: String
    jobLevel: Int
  }

  type Query{
    employees: [Employee]
  }
`

const resolvers = {
  Query: {
    employees: ()=> employeeList
  }
}

// initialize apollo server epxress
const server = new ApolloServer({ typeDefs, resolvers });
server.applyMiddleware({ app });

app.listen({ port: PORT }, () => console.log(`server running at localhost:${PORT + server.graphqlPath}`));