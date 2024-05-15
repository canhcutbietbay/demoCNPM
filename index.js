const express = require("express")
const morgan = require('morgan')
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const cookieParser = require('cookie-parser');
const { requireAuth, checkUser } = require('./middleware/authMiddleware');

const app = express()

// middleware
app.use(morgan('dev'))
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());

//view engine
app.set('view engine', 'ejs')

// database connection
const dbURI = 'mongodb://localhost:27017/demoCNPM';
mongoose.connect(dbURI)
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));

//routes

// app.get('*', function(req, res, next){ //check current user
//     res.locals.user = null;
//     next()
// });

app.get('*', checkUser);

app.get('/', (req, res) => res.render('homepage'));
app.get('/recipe', requireAuth, (req, res) => res.render('recipe'));
app.use(authRoutes);