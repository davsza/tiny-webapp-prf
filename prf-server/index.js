const express = require('express');

const cors = require('cors');

const cookieParser = require('cookie-parser');

const bodyParser = require('body-parser');

const mongoose = require('mongoose');

const passport = require('passport');

const localStrategy = require('passport-local').Strategy;

const expressSession = require('express-session');

const app = express();

const port = process.env.PORT || 3000;
const dbUrl = 'YOUR_DB_URL_GOES_HERE';

mongoose.connect(dbUrl);

mongoose.connection.on('connected', () => {
    console.log('db connected');
});

mongoose.connection.on('error', (err) => {
    console.log('error occured', err);
});

require('./db/user.model');
require('./db/termek.model');

const userModel= mongoose.model('user');

require('./db/bootstrapAdmin')();
require('./db/bootstrapTermekek')();

app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

const whiteList = ['http://localhost:4200'];

app.use(cors());

passport.use('local', new localStrategy(function(username, password, done) {
    userModel.findOne({username: username}, function(err, user) {
        console.log('findone');
        if(err) return done('error durint the query', null);
        if(!user) return done('no such username', null);
        user.comparePasswords(password, function(error, isMatch) {
            console.log("matchpw")
            if(error) return done(error, false);
            if(!isMatch) return done('wrong password', false);
            return done(null, user);
        });
    });
}));

passport.serializeUser(function(user, done) {
    if(!user) return done('no such user', null);
    return done(null, user);
});

passport.deserializeUser(function(user, done) {
    if(!user) return done('no such user to log out', null);
    return done(null, user);
});

app.use(expressSession({secret: 'prf-2023', resave: true}));
app.use(passport.initialize());
app.use(passport.session());

app.use('/users', require('./routes'));

app.use((req, res, next) => {
    console.log("error handling example");
    res.status(404).send('the resource is not found');
});

app.listen(port, () => {
    console.log('the server is running');
})