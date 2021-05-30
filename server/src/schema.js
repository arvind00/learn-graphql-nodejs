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