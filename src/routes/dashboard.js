// REQUIRE MODULO NODE
const express = require("express");
const router = express.Router();
// POOL TO DATABASE
const pool = require('../database');

/**
 * CONTROL ALL DASHBOARD
 * 
 * @param {object} req Solicitud de la petición (REQUEST)
 * @param {object} res Respuesta de la petición (RESPONSE)
 * @param {object} next Control para avanzar a la siguiente coincidencia de ruta y acabar flujo de petición.
 */
router.all("/dashboard", (req, res, next) => {
    console.log(`Route Received: ${req.protocol}://${req.get('host')}${req.originalUrl}`);
    next();
});

/**
 * RENDER DASHBOARD
 * 
 * @async
 * @param {object} req Solicitud de la petición (REQUEST)
 * @param {object} res Respuesta de la petición (RESPONSE)
 */
router.get("/dashboard", async(req, res) => {
    let oParams = {
        allUsers : null,
        allGarbage : null
    };
    try {
        let allUsers =  await pool.query('SELECT * FROM users');
        let allGarbage =  await pool.query('SELECT * FROM garbage');
        if(allUsers) oParams.allUsers = allUsers;
        if(allGarbage) oParams.allGarbage = allGarbage;
    } catch (t) {
        console.log("[ERROR] - ", t)
    }
    res.render("tabla.ejs", {oParams: oParams})
});

/**
 * INSERT TO MASSIVE FORM USERS 
 * 
 * @async
 * @param {object} req Solicitud de la petición (REQUEST)
 * @param {object} res Respuesta de la petición (RESPONSE)
 */
router.post("/dashboard/addmasive", async(req, res) => {
    console.log("\n --> ROUTING FOR ADDMASSIVE <-- \n");
    for (let i = 0; i < 1000; i++) {
        var oPuntero = await pool.query('SELECT COUNT(*) FROM garbage');
        await pool.query('INSERT INTO garbage (description) VALUES ("Registro - '+Object.values(oPuntero[0])[0]+'")');    
    }
    res.redirect("/dashboard");
});

/**
 * DELETE IN GARBAGE SO EFFICIENT
 * 
 * @async
 * @param {object} req Solicitud de la petición (REQUEST)
 * @param {object} res Respuesta de la petición (RESPONSE)
 */
router.get("/dashboard/efidelete", async(req, res) => {
    console.log("\n --> ROUTING FOR EFFICIENT DELETE <-- \n");
    await pool.query('DELETE FROM garbage'); 
    res.redirect("/dashboard");
});

/**
 * DELETE IN GARBAGE SO INEFFICIENT
 * 
 * @async
 * @param {object} req Solicitud de la petición (REQUEST)
 * @param {object} res Respuesta de la petición (RESPONSE)
 */
router.get("/dashboard/inedelete", async(req, res) => {
    console.log("\n --> ROUTING FOR INEFFICIENT DELETE <-- \n");
    const allGarbage =  await pool.query('SELECT * FROM garbage');
    for (let i = 0; i < allGarbage.length; i++) {
        await pool.query('DELETE FROM garbage WHERE id="'+allGarbage[i].id+'"');   
    }
    res.redirect("/dashboard");
});

/**
 * FIRE TO LINEAL ERROR
 * 
 * @async
 * @param {object} req Solicitud de la petición (REQUEST)
 * @param {object} res Respuesta de la petición (RESPONSE)
 */
router.get("/dashboard/unicerror", async(req, res) => {
    try {
        console.log("\n --> ROUTING FOR UNIC ERROR <-- \n");    
        await pool.query('SELECT * FROM error');
    } catch (t) {
        console.log("[ERROR] - ", t)
    }
    res.redirect("/dashboard");    
});

/**
 * FIRE TO CICLE ERROR
 * 
 * @async
 * @param {object} req Solicitud de la petición (REQUEST)
 * @param {object} res Respuesta de la petición (RESPONSE)
 */
router.get("/dashboard/cicleerror", async(req, res) => {
    try {
        console.log("\n --> ROUTING FOR CICLE ERROR <-- \n");
        setInterval(() => {
            console.log("\n --> LANZADO NUEVO CICLO DE ERROR <-- \n");
            pool.query('SELECT * FROM error');
        }, 5000);
    } catch (t) {
        console.log("[ERROR] - ", t);
    }
    res.redirect("/dashboard");    
});


/**
 * DELETE ALL IN USERS 
 * 
 * @async
 * @param {object} req Solicitud de la petición (REQUEST)
 * @param {object} res Respuesta de la petición (RESPONSE)
 */
router.get("/dashboard/deleteuser", async(req, res) => {
    console.log("\n --> ROUTING FOR DELETEUSER ALL <-- \n");
    await pool.query('DELETE FROM users WHERE NOT id="1"');
    res.redirect("/dashboard");
});

/**
 * DELETE USER IN USERS DB FOR HIS ID
 * 
 * @async
 * @param {object} req Solicitud de la petición (REQUEST)
 * @param {object} res Respuesta de la petición (RESPONSE)
 */
router.post("/dashboard/deleteuser", async(req, res) => {
    console.log("\n --> ROUTING FOR DELETEUSER FOR ID <-- \n");
    let {iduser} = req.body;
    await pool.query('DELETE FROM users WHERE id="'+iduser+'" AND NOT id="1"');
    res.redirect("/dashboard");
});

module.exports = router;