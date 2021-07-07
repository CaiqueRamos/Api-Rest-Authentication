const express = require('express')
const bcrypt = require('bcryptjs')
const Users = require("../model/User")
const jwt = require("jsonwebtoken")

const authConfig = require("../../config/auth.json");

const router = express.Router();

function generatedToken(params = {}) {
   return jwt.sign(params, authConfig.secret, {
      expiresIn: 86400,
   });
}

router.post("/register", async (req, res) => {
   const { email } = req.body;

   try {

      if (await Users.findOne({ email })) {
         return res.status(400).send({ error: "User already exists" });
      }

      const user = await Users.create(req.body)

      user.password = undefined;

      return res.send({ 
         user, 
         token: generatedToken({ id: user.id }) 
      })

   } catch (error) {
      return res.status(400).send({ error: "Registration failed" });
   }

})

router.post("/authenticate", async (req, res) => {
   const { email, password } = req.body;

   const user = await User.findOne({ email }).select("+password");

   if (!user)
      return res.status(400).send({ error: "User not found" })

   if (!await bcrypt.compare(password, user.password))
      return res.status(400).send({ error: "Invalid Password" })

   user.password = undefined;

   return res.send({ 
      user, 
      token: generatedToken({ id: user.id }) 
   })

})

module.exports = app => app.use("/auth", router);