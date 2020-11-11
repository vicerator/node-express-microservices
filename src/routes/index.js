const express = require("express");
const router = express.Router();
// Conexion con base de datos
const pool = require('../database');

// RENDER LOGGIN
router.get("/", (req, res) => {
    res.render("index.ejs", {error: false});
});

//LOGGIN
router.post("/", async (req, res) => {
    const allUsers =  await pool.query('SELECT * FROM users');
    const { email, password } = req.body;
    const currentUser = {email,password};
    var resultado = false;
    if(allUsers && allUsers.length > 0){
        resultado = allUsers.find( user => (user.email === currentUser.email && user.password === currentUser.password));
    }
    if(resultado){
        res.redirect('/dashboard')
    } else{
        res.render("index.ejs", {error: true});
    }
});

module.exports = router;