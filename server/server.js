/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const cron = require('node-cron');
const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');

const NODE_ENV = process.env.NODE_ENV || 'DEV';
const app = express();

const {
  updateCustomerDetails, filterSearch, settings,
  customerId, insertCustomer, customerSearch, displayalert, getloglocation, getlogreason, scheduleCron, scheduleStopCron,
  loginApi, loginEmailApi,
} = require('./server-apis');

const { AlertLogSchema } = require('./schema');

app.use('/static', express.static(path.join(`${__dirname}/../client/build/static`)));
app.use(
  '/images',
  express.static(path.join(__dirname, '/../client/build/images')),
);
app.use(bodyParser.json());
app.use(cors({ origin: 'http://localhost:3000' }));
// DB Connect
mongoose.connect('mongodb+srv://viruteam:437t1Ko6SW05F2TE@kaavian-systems-blr-db-6a06161d.mongo.ondigitalocean.com/hackathonDB?tls=true&authSource=admin&replicaSet=kaavian-systems-blr-db', (err) => {
  if (!err) {
    // eslint-disable-next-line no-console
    console.log('db connected');
  } else {
    // eslint-disable-next-line no-console
    console.log('db error', err);
  }
});

// CRONS
app.get('/api/cron', scheduleCron);

// Stop cron
app.get('/api/cronstop', scheduleStopCron);

// Add Customer
app.post('/api/insertCustomer', insertCustomer);

// Dropdown in CustomerID
app.get('/api/customerId', customerId);

// Cutomer search
app.post('/api/customerSearch', customerSearch);

// The code that able to update code into the database that already exists
app.put('/api/customerupdate', updateCustomerDetails);

// login
app.post('/api/login', loginApi);
// to login with email
app.post('/api/login/gamil', loginEmailApi);

// to display all logs
app.get('/api/alertdisplay', displayalert);
// to get the distinct location
app.get('/api/location', getloglocation);
// to get all the distinct reason
app.get('/api/reason', getlogreason);
// to display the filtered details
app.post('/api/search', filterSearch);

app.post('/api/setting', settings);

if (NODE_ENV === 'DIT') {
  const indexHTMLContent = fs.readFileSync(path.join(`${__dirname}/../client/build/index.html`), 'utf-8');
  app.all('*', (req, res) => {
    res.send(indexHTMLContent);
  });
}

app.listen(3001, () => {
  // eslint-disable-next-line no-console
  console.log('Server Running at http://localhost:3001/');
});
