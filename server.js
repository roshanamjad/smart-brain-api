const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex')

const register = require('./controllers/registers');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
  client: 'pg',
  connection: {
    host : 'postgresql-colorful-0766',
    user : 'postgres',
    password : '',
    database : 'smartbrain'
  }
});


const app = express();

app.use(cors())
app.use(bodyParser.json());


app.get('/', (req, res)=> {
	res.send(database.users);
})

app.post('/signin', signin.handleSignin(db, bcrypt))

app.post('/register',(req, res) => { register.handleRegisters (req, res, db, bcrypt)})

app.get('/profile/:id', (req, res) => {profile.handleProfileGet(req, res, db)})

app.put('/image', (req, res) => {image.handleImage(req, res, db)});

app.post('/imageurl', (req, res) => {image.handleApiCall(req, res)});



// // Load hash from your password DB.


app.listen(process.env.PORT || 3000, ()=> {
	console.log(`app is running on ${process.env.PORT}`);
})
