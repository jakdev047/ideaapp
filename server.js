/* =============== Require Files ================ */
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

/* ============ Port ============= */
const PORT = process.env.PORT || 8080;

/* =============== Middleweare ================ */
app.use(cors());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

/* ============ Route ============= */
const indexRoute = require('./routes');

// base route
app.use('/',indexRoute);

/* ============ Listen ============= */
app.listen(PORT,()=>{
  console.log(`${PORT} Server is Running...`)
});