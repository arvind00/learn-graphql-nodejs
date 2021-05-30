## Graphql Schema
- It is the definition and description of the functionalities exposed by the graphql server.
- The client can query to this schema and know the exact description of the data it can ask for
- With the schema the client knows what kind of objects it can ask for, the fields inside the objects
- The schema is built using the type system we discussed previously.
- It is the contract between the client and server.

## Activity
- create and Employee schema 
- the schema should have the below fields
    - id
    - firstName
    - lastName
    - jobLevel
- For the data use some hardcoded values

## Implementation strategy
- [] define a constant `typeDefs` and initialize it with the value returned by `gql` function
- [] To the gql function pass a template string containing two types
    - [] Employee
    - [] Query
- [] Employee should have 
    - [] id: ID!
    - [] firstName: String
    - [] lastName: String
    - [] jobLevel: Int
- [] Query should have
    - [] employees: [Employee]
- [] Next define an array named employeeList which contains an array of employee details
- [] define the resolver returning the employeeList for the query: employee

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
```