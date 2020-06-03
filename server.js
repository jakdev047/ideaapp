/* =============== Require Files ================ */
const express = require('express');
require('dotenv').config({path:'./config/key.env'});
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
// const morgan = require('morgan');
const exphbs = require('express-handlebars');
const methodOverride = require('method-override');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

const {truncateContent,compareValues,comparePath} = require('./helpers/hbs');

const app = express();

/* ============ Port ============= */
const PORT = process.env.PORT || 8080;

/* ============ Connecting mongodb ============= */
const {connectDB,url} = require('./db/dbConnect');
const store = new MongoStore({url});
connectDB();

/* =============== Middleweare ================ */
app.use(cors());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname,'public')));
// app.use(morgan('dev'));

app.engine('.hbs',exphbs({defaultLayout:'main',extname: '.hbs',helpers:{truncateContent,compareValues,comparePath}}));
app.set('view engine', '.hbs');

app.use(session({
  secret: process.env.SECRET,
  resave: false,
  store: store,
  saveUninitialized: false,
  cookie:{
    maxAge: 3 * 60 * 100 * 1000,
    httpOnly: true,
    sameSite: 'lax'
  }
}));

// global login user data capture
app.use((req,res,next)=> {
  res.locals.user = req.session.user || null;
  next();
});

/* ============ Route ============= */
const authRoute = require('./routes/auth');
const ideasRoute = require('./routes/ideas');
const indexRoute = require('./routes');

// ideas route
app.use('/auth',authRoute);

// ideas route
app.use('/ideas',ideasRoute);

// base route
app.use(indexRoute);

app.use((err,req,res,next)=>{
  console.log('err', err.message);
  res.status(500).render('error',{title: 'Error'});
})

/* ============ Listen ============= */
app.listen(PORT,()=>{
  console.log(`${PORT} Server is Running...`)
});