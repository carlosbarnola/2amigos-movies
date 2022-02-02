const { AuthenticationError } = require('apollo-server-express');
const { User, Movie } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    async me(parent, args, context) {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id })
          .select('-__v -password')
          .populate('movies');

        return userData;
      }

      throw new AuthenticationError('Not logged in');
    },
    users: async () => {
      return User.find()
        .select('-__v -password')
        .populate('movies');
    },
    user: async (parent, { username }) => {
      return User.findOne({ username })
        .select('-__v -password')
        .populate('movies');
    },
    movies: async (parent, { username }) => {
      const params = username ? { username } : {};
      return Movie.find(params).sort({ createdAt: -1 });
    },
    movie: async (parent, { _id }) => {
      return Movie.findOne({ _id });
    }
  },

  Mutation: {
    async addUser(parent, args) {
      const user = await User.create(args);
      const token = signToken(user);
      return { token, user };
    },
    async login(parent, { email, password }) {
      const user = await User.findOne({ email });
      if (!user) {
        throw new AuthenticationError('Incorrect credentials');
      }
      const correctPw = await user.isCorrectPassword(password);
      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }
      const token = signToken(user);
      return { token, user };
    },
    // saves a movie
    async saveMovie(_, body, { user }) {
      try {
        const updateUser = await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $push: { movies: movie._id } },
          { new: true }
        );
        return updateUser;
      } catch (err) {
        console.log(err);
        throw new AuthenticationError('Could not save the movie');
      }
    },
    // removes movie
    async removeMovie(_, body, { user }) {
      const updateUser = await user.findOneAndUpdate(
        { _id: user._id },
        { $pull: { savedMovies: { movieId: body.movieId } } },
        { new: true }
      )
    },
    // add a review
    async addReview(parent, { movieId, reviewBody }, context) {
      if (context.user) {
        const updatedMovie = await Movie.findOneAndUpdate(
          { _id: movieId },
          { $push: { reviews: { reviewBody, username: context.user.username } } },
          { new: true, runValidators: true }
        );
        return updatedMovie;
      }
      throw new AuthenticationError('You need to be logged in!');
    }
  }
};

module.exports = resolvers;
