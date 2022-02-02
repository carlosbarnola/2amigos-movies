const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Category {
    _id: ID
    name: String
  }

  type Movies {
    _id: ID
    name: String
    description: String
    image: String
    reviews: String
    price: Float
    category: Category
  }

  type Review {
    _id: ID
    description: String
  }

  type User {
    _id: ID
    firstName: String
    lastName: String
    email: String
  }

  type Auth {
    token: ID
    user: User
  }

  type Query {
    categories: [Category]
    movies(category: ID, name: String): [Movie]
    product(_id: ID!): Product
    user: User
    order(_id: ID!): Order
  }

  type Mutation {
    addUser(firstName: String!, lastName: String!, email: String!, password: String!): Auth
    addReview(products: [ID]!):
    updateUser(firstName: String, lastName: String, email: String, password: String): User
    updateReview(_id: ID!, quantity: Int!): Product
    login(email: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;
