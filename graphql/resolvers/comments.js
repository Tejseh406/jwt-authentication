const Post = require("../../models/Post");
const { checkAuth } = require("../../util/check-auth");
const { UserInputError, AuthenticationError } = require("apollo-server");

module.exports = {
  Mutation: {
    async createComment(_, { postId, body }, context) {
      const {username} = checkAuth(context);
      if (body.trim() === "") {
        throw new UserInputError("Empty comment", {
          errors: {
            body: "Comment body must not be empty",
          },
        });
      }

      const post = await Post.findById(postId);

      if(post){
        post.comments.unshift({
            body,
            username,
            createdAt: new Date().toISOString()
        })

        await post.save();
        return post.comments;
      }else throw new UserInputError('Post not found')
    },

    async deleteComment(_, { postId , commentId}, context) {
        const { username } = checkAuth(context);
        const post = await Post.findById(postId);

        if(post){
            const commentIndex = post.comments.findIndex(c => c.id = commentId);

            if(post.comments[commentIndex].username === username){
                await post.comments.splice(commentIndex,1)
                await post.save();
                return 'comment deleted successfully'
            } else {
                throw new AuthenticationError('Action not allowed')
            }
        }
        else throw new UserInputError('Post not found')
    },
    async likePost(_, { postId }, context) {
        const { username } = checkAuth(context);
        const post = await Post.findById(postId);
      
        if (post) {
          const existingLikeIndex = post.likes.findIndex((like) => like.username === username);
      
          if (existingLikeIndex !== -1) {
            post.likes.splice(existingLikeIndex, 1);
          } else {
            post.likes.push({
              username,
              createdAt: new Date().toISOString(),
            });
          }
      
          await post.save();
          return post.likes;
        } else {
          throw new UserInputError('Post not found');
        }
      }
      
  },
};