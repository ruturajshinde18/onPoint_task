const express = require("express");

const router = express.Router();
const bcrypt = require("bcrypt");

const {db} = require("../database.js")

const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

router.post('/register',async (req,res) =>{
	const {username,email,password} =req.body


    if (!username || !email || !password) {
      return res
        .status(400)
        .json({ status: "failed", message: "All Fields required " });
    }
    
    if (password.length < 6) {
      return res
        .status(400)
        .json({ status: "failed", message: "Password must be 6 characters" });
    }

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/;
    if (!password.match(passwordRegex)) {
      return res.status(400).json({
        status: "failed",
        message:
          "Password must contain atleast 1 upppercase, 1 lowercase, 1 numerical, 1 spescial character",
      });
    }

    if (!validateEmail(email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }




    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

   
	
	db('users5').insert({
		username:username,
		email:email,
		hash:hashedPassword
	}).then(res.json("sucess"))
	.catch(err => res.status(400).json("user exists"))
   }

);

module.exports = router;