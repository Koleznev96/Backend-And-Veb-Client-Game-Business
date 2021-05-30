const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const bodyParser = require('body-parser');

const authRoute = require('./routes/auth');
const gameRoute = require('./routes/game');
const adminRoute = require('./routes/adminGame');
const userRoute = require('./routes/user');
const chatRoute = require('./routes/chat');
const newsRoute = require('./routes/news');
const ideasRoute = require('./routes/ideas');

const keys = require('./config/keys');
const app = express();

mongoose.connect(keys.mongoURI, { useUnifiedTopology: true, useNewUrlParser: true })
    .then(() => console.log('MongoDB connected.'))
    .catch(error => console.log(error));

app.use(passport.initialize());
require('./middleware/passport')(passport);

app.use(require('morgan')('dev'));
app.use('/uploads', express.static('uploads'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(require('cors')());

app.use('/api/auth', authRoute);
app.use('/api/game', gameRoute);
app.use('/api/admin', adminRoute);
app.use('/api/user', userRoute);
app.use('/api/chat', chatRoute);
app.use('/api/news', newsRoute);
app.use('/api/ideas', ideasRoute);


module.exports = app;