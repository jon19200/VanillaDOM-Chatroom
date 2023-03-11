const path = require('path');
const express = require('express');
// const apiRouter = require('./routes/api');

const PORT = 5000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.resolve(__dirname, '../dist')));

// app.use('/api', apiRouter);

app.use((_, res) => res.status(404).send('Page Not Found'));

app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = { ...defaultErr, ...err };
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message).redirect('/');
});

app.listen(PORT, () => console.log(`start listening on port : ${PORT}`));

module.exports = app;