/* =============== Require Files ================ */
const express = require('express');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const methodOverride = require('method-override');

const {truncateContent} = require('./helpers/hbs');

const app = express();

/* ============ Port ============= */
const PORT = process.env.PORT || 8080;

/* =============== Middleweare ================ */
app.use(cors());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname,'public')));

app.engine('.hbs',exphbs({defaultLayout:'main',extname: '.hbs',helpers:{truncateContent}}));
app.set('view engine', '.hbs')

/* ============ Route ============= */
const ideasRoute = require('./routes/ideas');
const indexRoute = require('./routes');

// ideas route
app.use('/ideas',ideasRoute);

// base route
app.use('/',indexRoute);

/* ============ Listen ============= */
app.listen(PORT,()=>{
  console.log(`${PORT} Server is Running...`)
});