const { gql } = require('apollo-server');

module.exports = gql`
  type Post {
    id: ID!
    body: String!
    createdAt: String!
    username: String!
    comments: [Comment]!
    likes:[Like]!
  }

  type User{
    id: ID!
    email: String!
    token: String!
    username: String!
    createdAt: String!
  }

  type Comment{
    id: ID!
    createdAt: String!
    username: String!
    body: String!
  }

  type Like {
    id: ID!
    username: String!
    createdAt: String!
  }

  input RegisterInput{
    username: String!
    password: String!
    confirmPassword: String!
    email: String!
  }

  type Query {
    getAllPosts: [Post]
    getPost(postId: ID!): Post
  }

  type Mutation{
    register(registerInput: RegisterInput!): User!
    login(email: String!, password: String!): User!
    createPost(body: String!): Post!
    deletePost(postId: ID!): String!
    createComment(postId: ID!,body: String!): Comment!
    deleteComment(postId: ID!,commentId: ID!): String!
    likePost(postId: ID!): Like!
  }
`;