const express = require('express');
const mongoose = require('mongoose');
// const path = require('path');
const config = require('config');

const items = require('./routes/api/items');
const User = require('./routes/api/users');
const auth = require('./routes/api/auth');

const app = express();

// Bodyparser Middleware
app.use(express.json());

// DB config
const db = 'mongodb://localhost:27017/MERNSTACK';
// const db2 = config.get('mongoURI');

// Connect to MongoDB
mongoose.connect(db, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true})
    .then(() => console.log('MongoDB connected..'))
    .catch(err => console.log(err));

// use Routes
app.use('/api/items', items);
app.use('/api/users', User);
app.use('/api/auth', auth);

// Upload on Server
// Serve static assets if in production
// if(process.env.NODE_ENV === 'production'){
//     // Set static folder
//     app.use(express.static('client/build'));

//     app.get('*', (req, res) => {
//         res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
//     });
// }
// dont forget add code in json at 08.00 min of video

const port = process.env.PORT || 5000;
app.listen(port, () => console.log('server started on port 5000'))

