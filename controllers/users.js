// это файл контроллеров
const User = require('../models/user');

const {
  CREATED,
  BAD_REQUEST,
  NOT_FOUND,
  SERVER_ERROR,
} = require('../statusError');

// все пользователи
module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch((error) => res.status(SERVER_ERROR).send({ message: error.message }));
};

// ссоздаем юзера
module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.status(CREATED).send({ data: user }))
    .catch((error) => {
      if (error.name === 'ValidationError') {
        res
          .status(BAD_REQUEST)
          .send({ message: 'Неверный формат переданных данных' });
      } else {
        res.status(SERVER_ERROR).send({ message: error.message });
      }
    });
};

// данные текущего юзера
module.exports.getUser = (req, res) => {
  const { userId } = req.params;
  console.log(req.params);
  User.findById(userId)
    .orFail(() => {
      const error = new Error();
      error.name = NOT_FOUND;
      throw error;
    })
    .then((users) => res.send({ data: users }))
    .catch((error) => {
      if (error.name === 'CastError') {
        res
          .status(BAD_REQUEST)
          .send({ message: 'Неверный формат переданных данных' });
      } else if (error.name === NOT_FOUND) {
        res.status(NOT_FOUND).send({ message: 'Такого пользователя нет' });
      } else {
        res.status(SERVER_ERROR).send({ message: error.message });
      }
    });
};

// изменить данные
module.exports.patchUser = (req, res) => {
  const { name, about } = req.body;
  const opts = { runValidators: true, new: true };
  User.findByIdAndUpdate(req.user._id, { name, about }, opts)
    .orFail(() => {
      const error = new Error();
      error.name = NOT_FOUND;
      throw error;
    })
    .then((cards) => res.send({ data: cards }))
    .catch((error) => {
      if (error.name === 'ValidationError') {
        res
          .status(BAD_REQUEST)
          .send({ message: 'Неверный формат переданных данных' });
      } else if (error.name === NOT_FOUND) {
        res.status(NOT_FOUND).send({ message: 'Такого пользователя не существует' });
      } else {
        res.status(SERVER_ERROR).send({ message: error.message });
      }
    });
};

// обновить аватар
module.exports.patchAvatar = (req, res) => {
  const { avatar } = req.body; // получим из объекта запроса имя и описание пользовател
  // обновим имя найденного по _id пользователя
  const opts = { runValidators: true, new: true };
  User.findByIdAndUpdate(req.user._id, { avatar }, opts)
    .orFail(() => {
      const error = new Error();
      error.name = NOT_FOUND;
      throw error;
    })
    .then((cards) => res.send({ data: cards }))
    .catch((error) => {
      if (error.name === 'ValidationError') {
        res
          .status(BAD_REQUEST)
          .send({ message: 'Неверный формат переданных данных' });
      } else if (error.name === NOT_FOUND) {
        res.status(NOT_FOUND).send({ message: 'Такого пользователя нет' });
      } else {
        res.status(SERVER_ERROR).send({ message: error.message });
      }
    });
};
