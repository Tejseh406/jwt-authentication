const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../../config");
const { UserInputError } = require("apollo-server");
const {
  validateRegisterInput,
  validateLoginInput,
} = require("../../util/validators");

const User = require("../../models/User");

function generateToken(user) {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      username: user.username,
    },
    SECRET_KEY,
    { expiresIn: "1h" }
  );
}

module.exports = {
  Mutation: {
    async login(_, { email, password }) {
      const { valid, errors } = validateLoginInput(email, password);
      if (!valid) {
        throw new UserInputError("Errors", { errors });
      }

      const user = await User.findOne({ email });
      if (!user) {
        errors.general = "Email not exist";
        throw new UserInputError("Email not exist", { errors });
      }

      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        errors.general = "Wrong credentials";
        throw new UserInputError("Wrong credentials", { errors });
      }

      const token = generateToken(user);

      return {
        ...user._doc,
        id: user._id,
        token,
      };
    },

    async register(
      _,
      { registerInput: { username, email, password, confirmPassword } },
      context,
      info
    ) {
      const { valid, errors } = validateRegisterInput(
        username,
        email,
        password,
        confirmPassword
      );
      if (!valid) {
        throw new UserInputError("Errors", { errors });
      }
      const user = await User.findOne({ email });
      if (user) {
        throw new UserInputError("email is already exist", {
          errors: {
            email: "This email is already exist",
          },
        });
      }
      password = await bcrypt.hash(password, 12);
      const newUser = new User({
        email,
        username,
        password,
        createdAt: new Date().toISOString(),
      });

      const res = await newUser.save();

      const token = generateToken(res);

      return {
        ...res._doc,
        id: res._id,
        token,
      };
    },
  },
};
