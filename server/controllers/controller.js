const db = require('../models/model');

const controller = {};

// check if user exists in database, if he does then log him in, if not then create a new user
// responds with user id
controller.createUser = async (req, res, next) => {
  const { username } = req.body;
  const query = await db.query('SELECT id FROM users WHERE name=$1', [username]);
  if (query.rows.length) {
    res.locals.id = query.rows[0].id;
    return next();
  } else {
    const query2 = await db.query('INSERT INTO users (name) VALUES ($1) RETURNING id', [username]);
    res.locals.id = query2.rows[0].id;
    return next();
  }
}

// get all messages from the messages table with attached usernames from the user table from database in descending order by id
controller.getMessages = async (req, res, next) => {
  const query = await db.query('SELECT m.message, u.name FROM messages m LEFT OUTER JOIN users u ON m.user_id = u.id ORDER BY m.id DESC');
  res.locals.messages = query.rows;
  return next();
}

// create a new message in the database
controller.createMessage = async (req, res, next) => {
  const { message, userId } = req.body;
  const query = await db.query('INSERT INTO messages (message, user_id) VALUES ($1, $2)', [message, userId]);
  return next();
}

module.exports = controller;