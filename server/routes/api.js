const express = require('express');
const controller = require('../controllers/controller');
const router = express.Router();

// Check if user exists in database, if he does then log him in, if not then create a new user
// Responds with user id

router.post('/users', controller.createUser, (req, res) => {
  res.status(200).json(res.locals.id);
});

// Get all messages from database

router.get('/messages', controller.getMessages, (req, res) => {
  res.status(200).json(res.locals.messages);
});

// Create a new message in the database

router.post('/messages', controller.createMessage, (req, res) => {
  res.sendStatus(200);
});

module.exports = router;