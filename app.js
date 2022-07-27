const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// Слушаем 3000 порт
const { PORT = 3000 } = process.env;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// подключаемся к серверу mongo
mongoose
  .connect('mongodb://localhost:27017/mestodb', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    family: 4,
  })
  .then(() => console.log('yes'))
  .catch((e) => console.log(e));

app.use((req, res, next) => {
  req.user = {
    _id: '62e026d24585eacf315430db', // мой id
  };

  next();
});

app.use('/users', require('./routes/users'));
app.use('/cards', require('./routes/cards'));

app.use((req, res) => {
  res.status(404).send({ message: 'Запрашиваемый ресурс не найден' });
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
