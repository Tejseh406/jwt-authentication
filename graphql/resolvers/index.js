const postResolvers = require('./post');
const usersResolvers = require('./users.js');
const commentResolvers = require('./comments');

module.exports = {
    Query: {
        ...postResolvers.Query
    },
    Mutation: {
        ...usersResolvers.Mutation,
        ...postResolvers.Mutation,
        ...commentResolvers.Mutation
    }
}
