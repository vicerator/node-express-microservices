const express = require("express");
const router = express.Router();
const pool = require('../database');

// RENDER REGISTRO
router.get("/register", (req, res) => {
    res.render("register.ejs");
});
//REGISTRAR
router.post("/register", async (req, res) => {
    const { email,password,user,fullname } = req.body;
    await pool.query('INSERT INTO users (username, password, fullname, email) VALUES ("'+user+'","'+password+'","'+fullname+'","'+email+'")');
    res.render("index.ejs", {error:false});
});

module.exports = router;