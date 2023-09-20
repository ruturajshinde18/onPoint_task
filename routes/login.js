const express = require("express");

const router = express.Router();
const bcrypt = require("bcrypt");

const {db} = require("../database.js")



router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  // Check if the user exists
  const user = await db('users5').where({ username }).first();
  console.log(user)

  if (!user) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  // Compare the hashed password
  const passwordMatch = await bcrypt.compare(password, user.hash);

  if (!passwordMatch) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  // Successful login
  res.json({ message: 'Login successful' });
});

module.exports = router;