const express = require('express');
const bodyParser = require('body-parser');
const config = require('config');
const { APP_PORT } = require('./config/config');
const cors = require('cors');
const userRoute = require('./routes/eventOrg');
const mongoose = require('mongoose');
const app = express();

app.use(cors({
    origin(origin, callback) {
        const even = ['http://localhost:3000', 'http://localhost:3001'].some(element => element === origin);
        callback(null, even);
    },
    preflightContinue: true,
    optionsSuccessStatus: 200,
}));
app.use(express.json());
app.use(bodyParser.urlencoded());

//use config module to get the privatekey, if no private key set, end the application
if(!config.get('myprivatekey')){
    console.error('FATAL ERROR: myprivatekey is not defined.');
    process.exit(1);
}

mongoose
    .connect('mongodb://localhost:27017/nodejsauth', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error(('Could not connect to MongoDB...')));

app.use('/api', userRoute);

const port = process.env.PORT || APP_PORT;

app.listen(port, () => console.log(`App listening on port ${port}...`));
