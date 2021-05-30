## What are Resolvers?
- The Graphql Server needs to know how to populate data for each field in the schema.
- Resolvers are functions that populate data for every field in the schema.
- A resolver function may fetch data from backend or another api

## Special Note
- If we don't define a resolver for a particular field, graphql will automatically define a default resolver for it.

## Activity 1 - Get an employee by ID
- update the `src/schema.js` to have one more field in the query say: `employeeById(id: ID): Employee`
- also update the resolver to have a function to resolve the above defined field

## Solution

```js
// src/schema.js
const { gql } = require('apollo-server-express');
const { TECHNOLOGY_LIST, EMPLOYEE_LIST, COMPANY_LIST } = require('./data');
//define typeDefs and resolvers and export them

exports.typeDefs = gql`
  type Query {
      employees: [Employee]
      companies: [Company]
      technologies: [Technology]
      employeeById(id: ID): Employee
  }

  type Employee {
      id: ID!
      firstName: String!
      lastName: String
      jobLevel: Int
      companyId: ID
      technologyIds: [ID]
  }

  type Company {
      id: ID!
      name: String!
  }

  type Technology {
      id: ID!
      name: String!
      description: String
  }
`
exports.resolvers = {
    Query: {
        employees: () => EMPLOYEE_LIST,
        companies: () => COMPANY_LIST,
        technologies: () => TECHNOLOGY_LIST,
        employeeById: (parent, args, context, info) => EMPLOYEE_LIST.find((e) => e.id == args.id)
    }
}
```

```js
// src/data.js
exports.TECHNOLOGY_LIST = [
    { id: 1001, name: 'Angular', description: 'The modern web developer\'s platform' },
    { id: 1002, name: 'React', description: 'A JavaScript library for building user interfaces' },
    { id: 1003, name: 'Vue', description: 'The Progressive JavaScript Framework' }
];

exports.EMPLOYEE_LIST = [
    { id: 'E1001', firstName: 'Arvindchand', lastName: 'Lairenjam', jobLevel: 4, companyId: 'C1001', technologyIds: [1001, 1002] },
    { id: 'E1002', firstName: 'Vishal', lastName: 'Nag', jobLevel: 3, companyId: 'C1001', technologyIds: [1002, 1003] },
];

exports.COMPANY_LIST = [
    {id: 'C1001', name: 'Infosys Ltd'},
    {id: 'C1002', name: 'Theorem'},
    {id: 'C1003', name: 'Lasren & Turbo'},
]
```

```js
// server.js
const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const cors = require('cors');

const PORT = process.env.port || 5000;
const app = express();
app.use(express.json(), cors());

const { typeDefs, resolvers } = require('./src/schema');

// initialize apollo server epxress
const server = new ApolloServer({ typeDefs, resolvers });
server.applyMiddleware({ app });

app.listen({ port: PORT }, () => console.log(`server running at localhost:${PORT + server.graphqlPath}`));
```

### Query in Graphql Playground

```gql
query {
  employeeById(id: "E1001") {
    id
    companyId
    technologyIds
  }
}
```
