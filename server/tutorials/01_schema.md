## Graphql Schema
- It is the definition and description of the functionalities exposed by the graphql server.
- The client can query to this schema and know the exact description of the data it can ask for
- With the schema the client knows what kind of objects it can ask for, the fields inside the objects
- The schema is built using the type system we discussed previously.
- It is the contract between the client and server.

## Activity 1
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

## Activity 2
- Create a folder `src`
- Create a file `src/schema.js` and define 2 types:
    - Query
    - FrontEndTechnology
- Query should have a field : `frontEndTechnologies` of type `[FrontEndTechnology]`
- FrontEndTechnology should have the below fields
    - id
    - name
    - description
- Create a file `src/data.js` with a list of front-end technologies which we can serve it to the query defined above
- In the `src/schema.js` define `resolvers` resolving the field(s) defined in the query 

## Solution

```js
// src/schema.js
const { gql } = require('apollo-server-express');
const { FRONT_END_TECHNOLOGIES } = require('./data');
//define typeDefs and resolvers and export them

exports.typeDefs = gql`
  type Query {
      frontEndTechnologies: [FrontEndTechnology]
  }

  type FrontEndTechnology {
      id: ID!
      name: String!
      description: String
  }
`
exports.resolvers = {
    Query: {
        frontEndTechnologies: () => FRONT_END_TECHNOLOGIES
    }
}
```

```js
// src/data.js
exports.FRONT_END_TECHNOLOGIES = [
    { id: 1001, name: 'Angular', description: 'The modern web developer\'s platform' },
    { id: 1002, name: 'React', description: 'A JavaScript library for building user interfaces' },
    { id: 1003, name: 'Vue', description: 'The Progressive JavaScript Framework' }
];
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
  frontEndTechnologies{
    id
    name
    description
  }
}

```

## Activity 3
- create a schema and resolver that will return `employees, companies and technologies`.
- Consider the below relationships
    - An employee has a company, so in employee schema add a field called `companyId`
    - An employee can be well versed in one or more technologies so employee schema should have a field called `technologyIds`

## Implementation Strategy
- [x] update `src/schema.js` to have 4 types:
    - [x] Query
    - [x] Company
    - [x] Technology
    - [x] Employee
- [x] Query should have the below fields
    - [x] employees: [Employee]
    - [x] companies: [Company]
    - [x] technologies: [Technology]
- [x] Company should have the below fields
    - [x] id: ID!
    - [x] name: String!
- [x] Technology should have the below fields
    - [x] id: ID!
    - [x] name: String!
    - [x] description: String
- [x] Employee should have the below fields
    - [x] id: ID!
    - [x] firstName: String!
    - [x] lastName: String
    - [x] jobLevel: Int
    - [x] companyId: ID
    - [x] technologIds: [ID]

## Solution

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
// src/schema.js
const { gql } = require('apollo-server-express');
const { TECHNOLOGY_LIST, EMPLOYEE_LIST, COMPANY_LIST } = require('./data');
//define typeDefs and resolvers and export them

exports.typeDefs = gql`
  type Query {
      employees: [Employee]
      companies: [Company]
      technologies: [Technology]
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
        technologies: ()=> TECHNOLOGY_LIST
    }
}
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

### Sample query in Graphql playground

```gql
query {
  employees {
    id
    companyId
    technologyIds
  }
  companies{
    id
    name
  }
  technologies{
    id
    name
  }
}
```
