const { Router } = require('express');
const dogs = require('./dogs.js');
const temperaments = require('./temperaments')

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const routesManager = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

routesManager.use('/dogs', dogs)
routesManager.use('/temperaments', temperaments)

module.exports = routesManager;