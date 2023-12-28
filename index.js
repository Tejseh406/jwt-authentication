const { ApolloServer } = require("apollo-server");
const gql = require("graphql-tag");
const { mongoose } = require("mongoose");


const resolvers = require('./graphql/resolvers')
const typeDefs = require('./graphql/typeDefs')
const { MONGODB } = require("./config");
const Post = require('./models/Post');

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req })
});

mongoose
  .connect(MONGODB, { useNewUrlParser: true })
  .then(() => {
    console.log("Database connection succesfull")
    return server.listen({ port: 5000 });
  })
  .then((res) => {
    console.log(`Server is ready at ${res.url}`);
  });