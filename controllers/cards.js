const Card = require('../models/card');

const {
  CREATED,
  BAD_REQUEST,
  NOT_FOUND,
  SERVER_ERROR,
} = require('../statusError');

// возвращаем карточки
module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch((error) => res.status(SERVER_ERROR).send({ message: error.message }));
};

// создаем карточку
module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({
    name,
    link,
    owner,
  })
    .then((card) => res.status(CREATED).send(card))
    .catch((error) => {
      if (error.name === 'ValidationError') {
        res.status(BAD_REQUEST).send({ message: 'Ошибка валидации' });
      } else {
        res
          .status(SERVER_ERROR)
          .send({ message: 'Не получилось обработать запрос' });
      }
    });
};

// ставим лайк
module.exports.likeCard = (req, res) => {
  const owner = req.user._id;
  const { cardId } = req.params;

  Card.findByIdAndUpdate(cardId, { $addToSet: { likes: owner } }, { new: true })
    .orFail(() => {
      const error = new Error();

      error.name = NOT_FOUND;
      throw error; // throw создает ошибку
    })
    .then((card) => res.send(card))
    .catch((error) => {
      if (error.name === 'CastError') {
        res
          .status(BAD_REQUEST)
          .send({ message: 'Неверный формат переданных данных' });
      } else if (error.name === NOT_FOUND) {
        res.status(NOT_FOUND).send({ message: 'Такой карточки нет' });
      } else {
        res.status(SERVER_ERROR).send({ message: error.message });
      }
    });
};

// удаляем лайк
module.exports.dislikeCard = (req, res) => {
  const owner = req.user._id;
  const { cardId } = req.params;

  Card.findByIdAndUpdate(cardId, { $pull: { likes: owner } }, { new: true })
    .orFail(() => {
      const error = new Error();

      error.name = NOT_FOUND;
      throw error; // throw создает ошибку
    })
    .then((card) => res.send(card))
    .catch((error) => {
      if (error.name === 'CastError') {
        res
          .status(BAD_REQUEST)
          .send({ message: 'Неверный формат переданных данных' });
      } else if (error.name === NOT_FOUND) {
        res.status(NOT_FOUND).send({ message: 'Карточка не существует.' });
      } else {
        res.status(SERVER_ERROR).send({ message: error.message });
      }
    });
};

// удаляем карточки по id
module.exports.deleteCard = (req, res) => {
  const { cardId } = req.params;
  Card.findByIdAndRemove(cardId)
    .orFail(() => {
      const error = new Error();
      error.name = NOT_FOUND;
      throw error; // throw создает ошибку
    })
    .then((cards) => res.send({ data: cards }))
    .catch((error) => {
      if (error.name === 'CastError') {
        res
          .status(BAD_REQUEST)
          .send({ message: 'Неверный формат переданных данных' });
      } else if (error.name === NOT_FOUND) {
        res.status(NOT_FOUND).send({ message: 'Такой карточки нет' });
      } else {
        res.status(SERVER_ERROR).send({ message: error.message });
      }
    });
};
