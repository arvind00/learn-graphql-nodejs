## Graphql Queries
- It is a request from graphql client to fetch data
- Syntax

```gql
query {
    field_name
}

# OR

query query_name {
    field_name
}
```

## Activity 1 - Usage of Parent in resolver
- Requirement: In the Employee schema, add a new field called `fullName` and resolve it to `firstName` + ' ' + `lastName`

## Implementation Strategy
- After the Query object in resolver, add `Employee` object that resolves the fullName field

## Solution

```js
// src/schema.js
const { gql } = require('apollo-server-express');
const { TECHNOLOGY_LIST, EMPLOYEE_LIST, COMPANY_LIST } = require('./data');
//define typeDefs and resolvers and export them

exports.typeDefs = gql`
  type Query {
      employeeById(id: ID!): Employee
      employees: [Employee]
      companyById(id: ID!): Company
      companies: [Company]
      technologyById(id: ID!): Technology
      technologies: [Technology]
  }

  type Employee {
      id: ID!
      firstName: String!
      lastName: String
      jobLevel: Int
      companyId: ID
      fullName: String
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
        employeeById: (parent, args, context, info) => EMPLOYEE_LIST.find((e) => e.id == args.id),
        employees: () => EMPLOYEE_LIST,
        companyById: (parent, args) => COMPANY_LIST.find((c) => c.id == args.id),
        companies: () => COMPANY_LIST,
        technologyById: (parent, args) => TECHNOLOGY_LIST.find((t) => t.id == args.id),
        technologies: () => TECHNOLOGY_LIST,
    },
    Employee: {
        fullName: (parent, args, context, info) => `${parent.firstName} ${parent.lastName}`
    }
}
```

### Query in Playground
```js
query {
  employeeById(id: "E1001"){
    fullName
  }
}
```

## Cyclical Schema
- Consider the employee relationship
    - At a specific point of time, An employee works for 1 company.
    - A Company has many employees

## Activity 2 - Cyclical Schema and resolving nested queries
- update the `schema.js` such that `Employee` type has a field calle `company: Company`
- also udpate the `Company` type to have a field called `employees: [Employee]`
- update the resolvers accordingly (make use of parent argument in the resolver function)

## Solution

```js
// src/schema.js
const { gql } = require('apollo-server-express');
const { TECHNOLOGY_LIST, EMPLOYEE_LIST, COMPANY_LIST } = require('./data');

exports.typeDefs = gql`
  type Query {
      employeeById(id: ID!): Employee
      employees: [Employee]
      companyById(id: ID!): Company
      companies: [Company]
      technologyById(id: ID!): Technology
      technologies: [Technology]
  }

  type Employee {
      id: ID!
      firstName: String!
      lastName: String
      jobLevel: Int
      companyId: ID
      fullName: String
      company: Company
  }

  type Company {
      id: ID!
      name: String!
      employees: [Employee]
  }

  type Technology {
      id: ID!
      name: String!
      description: String
  }
`
exports.resolvers = {
    Query: {
        employeeById: (parent, args, context, info) => EMPLOYEE_LIST.find((e) => e.id == args.id),
        employees: () => EMPLOYEE_LIST,
        companyById: (parent, args) => COMPANY_LIST.find((c) => c.id == args.id),
        companies: () => COMPANY_LIST,
        technologyById: (parent, args) => TECHNOLOGY_LIST.find((t) => t.id == args.id),
        technologies: () => TECHNOLOGY_LIST,
    },
    Employee: {
        fullName: (parent, args, context, info) => `${parent.firstName} ${parent.lastName}`,
        company: (parent, args, contect, info) => COMPANY_LIST.find((c) => c.id = parent.companyId)
    },
    Company: {
        employees: (parent, args, context, info) => EMPLOYEE_LIST.filter((e) => e.companyId == parent.id)
    }
}
```

### Query in playground

```gql
query {
  employeeById(id: "E1001"){
    fullName
    company{
      id
      name
    }
  }
}
```