## What is grapqhql?
- It is a query language for our API.
- Graphql has a type system that defines data
- Types has fields
- Data for each field is provided by a function
- That function is known as resolver.
- Graphql query language is mainly about selecting fields on objects
- Graphql has its own language called `Graphql Schema Language` which is language agnostic

## What are the types available in Graphql?
- Commonly used data types in graphql are
    - Scalar types
    - Object types
    - Query type
    - Mutation Type
    - Enumeration Type
    - List Types
    - Non-Null Types

## Scalar types in graphql type system
- The Scalar types are primitive data types that can store a single value.
- The following are Scalar types:
    - Int - singed 32-bit integer
    - Float - signed double precision floating point value
    - String - UTF-8 character sequence
    - ID - A unique identifier
    - Boolean - true or false

## Object type in graphql type system
- User defined types are express as Object
- Object will have fields that are of scalar types or object types

## List type
- List is used represent an array of values of specific type
- The specific type can be object, scalars or enums
- The specific types are enclosed inside [] like `field: [String]`

## Non-nullable type in graphql type system
- By default the scalar types can be set to null
- To make it non-nullable or mandatory append ! like `name: String!`

## Query type in graphql type system
- Query type represents the entry point for queries from client application
- example

```gql
type Query {
    max(list: [Int]): Int 
}
```

## Mutation type in graphql type system
- Mutations represent entry points for data manipulation operations
```gql
type Mutation {
    add(x: Int, y: Int): Int
}
```


## Activity
- Update your graphql server to express two api like
```json
{
    "message": "Hello from Graphql",
    "randomNumber": 6
}
```
- random number should be a number number between 1 and 10

## Implementation strategy
- [x] define a Type of Query having 2 fields:
    - [x] message
    - [x] randomNumber
- [x] define an object named as resolvers that have a field: `Query`
- [x] `Query` should have two props:
    - [x] `message`
    - [x] `randomNumber`
- [x] define the value of `message` to be a function that returns the string: `Hello from Graphql`
- [x] diefine the value of `randomNumber` to be a function that returns a random number between 1 and 10

## Solution

```js
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
```