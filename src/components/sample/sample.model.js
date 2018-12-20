const mongoose = require('mongoose');
const httpStatus = require('http-status');
const bcrypt = require('bcrypt');
/**
 * Sample Schema
 */
const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
});

UserSchema.pre('save', function hashNewAccountPassword(next) {
  const user = this;
  bcrypt.hash(user.password, 10, (err, hash) => {
    if (err) {
      return next(err);
    }
    user.password = hash;
    return next();
  });
});
/**
 * Statics
 */
UserSchema.statics = {
  /**
   * Get user
   * @param {ObjectId} id - The objectId of user.
   * @returns {Promise<User, Error>}
   */
  get(id) {
    return this.findById(id)
      .exec()
      .then((user) => {
        if (user) {
          return user;
        }
        return Promise.reject(new Error('No such user exists!', httpStatus.NOT_FOUND));
      });
  },
  login(username, password) {
    return this.findOne({ username })
      .exec()
      .then((user) => {
        if (user && bcrypt.compareSync(password, user.password)) return user; // login success
        return Promise.reject(new Error('Unauthorized', httpStatus.UNAUTHORIZED)); // bad username or password
      });
  }
};

/**
 * @typedef User
 */
module.exports = mongoose.model('User', UserSchema);
