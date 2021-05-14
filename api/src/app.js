const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const axios = require('axios')
const index = require('./routes/index.js');
const {Temperament} = require('../src/db'); 

require('./db.js');

async function fillTemperaments(){
  try {
    let total=[]
      const resp = await axios.get('https://api.thedogapi.com/v1/breeds');
      for (let i = 0; i < resp.data.length; i++) {
          if(resp.data[i].temperament){
            let split=resp.data[i].temperament.split(', '||',') 
            for (let j = 0; j < split.length; j++){
              if(!total.includes(split[j])){
                total.push(split[j])
              }
            }
          }
        }
        for (let i = 0; i < total.length; i++) {
          Temperament.findOrCreate({
            where:{
              name:total[i]
            }
          })

        }
  }catch (err) {
      console.error(err);
  }
}
fillTemperaments()

const server = express();

server.name = 'API';

server.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
server.use(bodyParser.json({ limit: '50mb' }));
server.use(cookieParser());
server.use(morgan('dev'));
server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // update to match the domain you will make the request from
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});


server.use('/', index);

// Error catching endware.
server.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

module.exports = server;
