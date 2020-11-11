// ------------ Servidor con Express ------------
// Require
const express = require("express");
const morgan = require('morgan');
const mysql = require('mysql');
const cors = require('cors');

// **** ----- INITIALIZATIONS ----- **** 
const app = express();

// **** ----- MIDDLEWARES ----- **** 
app.use(express.json());
app.use(cors())
// app.use(morgan('dev'));
// Para poder recibir fomularios.
app.use(express.urlencoded({extended: false}))

// **** ----- SETTINGS ----- **** 
app.set("port", process.env.PORT || 4000);
app.set("view engine", "ejs");

// **** ----- GLOBAL ----- **** 
app.set("appName", "Express Server MYSQL");

app.use((req, res, next) => {
    next();
});

// **** ----- ROUTES ----- **** 
app.use(require("./routes"));
app.use(require("./routes/register"));
app.use(require("./routes/dashboard"));

// **** ----- PUBLIC ----- **** 
app.use(express.static(__dirname + '/public'));

// **** ----- STARTING SERVER ----- **** 
app.listen(app.get("port"), () => {
    console.log(app.get("appName"));
    console.log(`Server on port`, app.get("port"));
})


