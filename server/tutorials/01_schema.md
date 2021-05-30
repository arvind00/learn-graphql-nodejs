## Graphql Schema
- It is the definition and description of the functionalities exposed by the graphql server.
- The client can query to this schema and know the exact description of the data it can ask for
- With the schema the client knows what kind of objects it can ask for, the fields inside the objects
- The schema is built using the type system we discussed previously.
- It is the contract between the client and server.

## Activity
- create an Employee schema 
- the schema should have the below fields
    - id
    - firstName
    - lastName
    - jobLevel
- For the data use some hardcoded values

## Implementation strategy
- [x] define a constant `typeDefs` and initialize it with the value returned by `gql` function
- [x] To the gql function pass a template string containing two types
    - [x] Employee
    - [x] Query
- [x] Employee should have 
    - [x] id: ID!
    - [x] firstName: String
    - [x] lastName: String
    - [x] jobLevel: Int
- [x] Query should have
    - [x] employees: [Employee]
- [x] Next define an array named employeeList which contains an array of employee details
- [x] define the resolver returning the employeeList for the query: employee

## Solution

```js
const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const cors = require('cors');

const PORT = process.env.port || 5000;
const app = express();
app.use(express.json(), cors());

// employee list
const employeeList = [
  { id: 611052, firstName: 'Arvindchand', lastName: 'Lairenjam', jobjLevel: 4 },
  { id: 611008, firstName: 'Ankitha', lastName: 'Mittal', jobjLevel: 4 },
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
```

## Query from graphql playground

```gql
query {
  employees{
    id
    firstName
  }
}
```