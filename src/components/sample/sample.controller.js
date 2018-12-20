import jwt from 'jsonwebtoken';
import User from './sample.model';

const ping = (req, res) => res.sendStatus(200);

const createUser = (req, res, next) => {
  const newUser = new User({ username: req.body.username, password: req.body.password });
  newUser
    .save()
    .then(() => next())
    .catch(e => next(e));
};

function login(req, res, next) {
  User.login(req.body.username, req.body.password)
    .then((user) => {
      const data = { user };
      const token = jwt.sign(data, process.env.JWT_SECRET);
      return res.json({
        userId: data.user._id,
        token
      });
    })
    .catch(e => next(e));
}

export { ping, login, createUser };
