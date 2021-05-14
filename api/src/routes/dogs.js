const { Router } = require('express');
const routesDogs = Router();
const axios = require('axios');
const {Dog,Temperament} = require('../db.js'); 
const { v4: uuidv4 } = require('uuid');
const { Op } = require('sequelize');

// Capitalize my input

String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

// Fill arrays with Data

let arrayResp = [];


async function refillData() 
{
    let resp = await axios.get('https://api.thedogapi.com/v1/breeds');
    let respDB = await Dog.findAll();
    let height1 = []
    for (let d = 0; d < resp.data.length; d++) {
        height1 = resp.data[d].height.metric.split(" -")
        arrayResp.push({
            id:resp.data[d].id,
            name:resp.data[d].name,
            weight:resp.data[d].weight.metric,
            height:resp.data[d].height.metric,
            years:resp.data[d].life_span,
            temperament:resp.data[d].temperament,
            image:resp.data[d].image.url,
            height1: height1[0]
        })
    }
    for (let ddb = 0; ddb < respDB.length; ddb++) {
        let dogdb = await Dog.findOne({
            where: {id: respDB[ddb].id,
        },
            include: [Temperament]
        })
            let dogTemps = []
            for (let index = 0; index < dogdb.dataValues.temperaments.length; index++) {
                dogTemps.push(dogdb.dataValues.temperaments[index].name)
            }
            let dogTemps1 = dogTemps.join(' ')
        let height1 = respDB[ddb].height      
        arrayResp.push({
            id:respDB[ddb].dataValues.id,
            name:respDB[ddb].dataValues.name,
            temperament:dogTemps1,
            weight:respDB[ddb].weight,
            height:respDB[ddb].height,
            years:respDB[ddb].years,
            height1: height1[0]
        })
    }
}



routesDogs.get('/', (req,res) =>{
    refillData();
    let arrayJson1 = []
    if (req.query.name) 
    {   
        for (let qd = 0; qd < arrayResp.length; qd++) 
        {

            let resp = arrayResp[qd].name.toLowerCase().indexOf(req.query.name.toLowerCase())
            if (resp !== -1) 
            {
                arrayJson1.push(arrayResp[qd])
            }
        }
        if (arrayJson1) 
        {
            res.status(200).json(arrayJson1)
            arrayJson1 = []
            arrayResp = [];
        }   
    }
    else
    {   
        let arrayJson = []
        for (let r = 0; r < arrayResp.length; r++) 
        {
            arrayJson.push({
                id:arrayResp[r].id,
                name:arrayResp[r].name,
                temperament:arrayResp[r].temperament,
                image:arrayResp[r].image,
                weight:arrayResp[r].weight,
                height:arrayResp[r].height,
                years:arrayResp[r].years,
                height1: arrayResp[r].height1
            })       
        }
        res.status(200).json(arrayJson)
        arrayJson = []
        arrayResp = [];
    }
})

routesDogs.get('/:idRaza', (req, res) => {
    let sendIt = false
    for (let qd = 0; qd < arrayResp.length; qd++) 
    {
        if (arrayResp[qd].id == req.params.idRaza) 
        {
            sendIt = true
            res.status(200).send(arrayResp[qd])
        }
    }
    if (!sendIt) {
        res.status(400).send("Id no valido")    
    }
})

routesDogs.post('/', async  (req,res) => {
    const{name,weight,height,years,temperament} = req.body.end; 
    let id = uuidv4()
    let dog = await Dog.create(
        {
            id,
            name,
            weight,
            height,
            years
        }
    )
    temperament.forEach(async temp => {
        const temps = await Temperament.findOne({
             where: { name: { [Op.iLike]: `%${temp}%` } }
         })
         dog.addTemperament(temps)
     })
     res.status(200).send("succes")
})



module.exports = routesDogs;