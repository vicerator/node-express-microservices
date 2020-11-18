const mysql = require("mysql");
const { promisify } = require("util")
const { database }  = require("./keys")

const pool = mysql.createPool(database);

pool.getConnection((err, connection) => {
    if(err){
        if(err.code === "PROTOCOL_CONECTION_LOST"){
            console.log("CERRADA CONEXION DATABASE");
        }
        if(err.code === "ER_CON_COUNT_ERROR"){
            console.log("MÁS DE UNA CONEXION ACTIVA")
        }
        if(err.code === "ECONREFUSED"){
            console.log("CONEXION A DATABASE RECHAZADA")
        }
    }
    if(connection) connection.release();
    return;
});

// Convirtiendo promesas a callback;
pool.query = promisify(pool.query);

module.exports = pool;