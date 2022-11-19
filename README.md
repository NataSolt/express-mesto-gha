[![Tests](https://github.com/NataSolt/express-mesto-gha/actions/workflows/tests-13-sprint.yml/badge.svg)](https://github.com/NataSolt/express-mesto-gha/actions/workflows/tests-13-sprint.yml) [![Tests](https://github.com/NataSolt/express-mesto-gha/actions/workflows/tests-14-sprint.yml/badge.svg)](https://github.com/NataSolt/express-mesto-gha/actions/workflows/tests-14-sprint.yml)
# Проект Mesto фронтенд + бэкенд

## О проекте:

Cервер для проекта [React-mesto](https://github.com/NataSolt/mesto-react).Продолжение работы над проектом Mesto.
Приложение на Express.js. Схемы и модели созданы через Mongoose. Все роуты, кроме `/signup` и `/signin`, защищены. Используется валидация Joi и celebrate.Реализована централизованная обработка ошибок. Настроено логирование запросов и ошибок.
Выполнен в рамках серии проектных работ в Яндекс.Практикуме по профессии «Веб-разработчик».


## Используемые технологии:

* [Express](https://img.shields.io/badge/-Express-000000?logo=express&logoColor=white)
* [MongoDB](https://img.shields.io/badge/-MongoDB-56a14b?logo=mongodb&logoColor=white)
* [Node](https://img.shields.io/badge/-Node.js-469837?logo=Node.js&logoColor=white)
* [JavaScript](https://img.shields.io/badge/-JavaScript-f3de35?logo=javaScript&logoColor=black)
* [API](https://img.shields.io/badge/-api-yellow)

## Директории:

`/routes` — папка с файлами роутера  
`/controllers` — папка с файлами контроллеров пользователя и карточки   
`/models` — папка с файлами описания схем пользователя и карточки  
Остальные директории вспомогательные.

## Запуск проекта:

Для запуска на локальной машине необходимо:</br>
1. Установить npm зависимости:</br>
```sh
npm install
```
2. Запустить MongoDB:
```sh
npm run mongod
```
3. Запустить в режиме разработки:</br>
```sh
npm run start — запускает сервер
npm run dev — запускает сервер с hot-reload
```
Если все прошло успешно, проект будет запущен на `http://localhost:3000`
