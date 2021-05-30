const { gql } = require('apollo-server-express');
const { TECHNOLOGY_LIST, EMPLOYEE_LIST, COMPANY_LIST } = require('./data');
//define typeDefs and resolvers and export them

exports.typeDefs = gql`
  type Query {
      add(a: Int, b: Int): Int
      subtract(a: Int, b: Int): Int
      multiply(a: Int, b: Int): Int
      divide(a: Int, b: Int): Int
  }
`
exports.resolvers = {
    Query: {
        add: (parent, args, context, info) => args.a + args.b,
        subtract: (parent, args, context, info) => args.a - args.b,
        multiply: (parent, args, context, info) => args.a * args.b,
        divide: (parent, args, context, info) => Math.floor(args.a / args.b)
    }
}