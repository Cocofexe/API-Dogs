const { Router } = require('express');
const routesTemperaments = Router();
const axios = require('axios');
const {Temperament} = require('../db.js'); 


routesTemperaments.get('/', async (req,res) => {
    let arrayResp = [];
    let Temps = await Temperament.findAll();
    for (let tem = 0; tem < Temps.length; tem++) {
        arrayResp.push({
            id:Temps[tem].id,
            name:Temps[tem].name,
        })
    }
    res.json(arrayResp)
}) 

module.exports = routesTemperaments