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