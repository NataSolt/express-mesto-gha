const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const cors = require('cors');
// const userRouter = require('./routes/users');
// const cardRouter = require('./routes/cards');
const { login, createUser } = require('./controllers/users');
const auth = require('./middlewares/auth');
const { validateLogin, validateCreateUser } = require('./middlewares/validator');
const NotFound = require('./errors/notfound');
// const { NOT_FOUND } = require('./statusError');

// Слушаем 3000 порт
const { PORT = 3000 } = process.env;

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// подключаемся к серверу mongo
mongoose
  .connect('mongodb://localhost:27017/mestodb', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    family: 4,
  })
  // eslint-disable-next-line no-console
  .then(() => console.log('yes'))
  // eslint-disable-next-line no-console
  .catch((e) => console.log(e));

// app.use((req, res, next) => {
//   req.user = {
//     _id: '62e026d24585eacf315430db', // мой id
//   };

//   next();
// });
app.post('/signin', validateLogin, login);
app.post('/signup', validateCreateUser, createUser);

app.use('/users', auth, require('./routes/users'));
app.use('/cards', auth, require('./routes/cards'));

app.use((req, res, next) => {
  next(new NotFound({ message: 'Запрашиваемый ресурс не найден' }));
});

app.use(errors()); // обработчик ошибок celebrate

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({ message: statusCode === 500 ? 'На сервере произошла ошибка' : message });
  next();
});
app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT}`);
});
