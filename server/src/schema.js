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