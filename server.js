const express = require('express');
const cors = require('cors');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const hubspot = require('@hubspot/api-client');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const app = express();
const hubspotClient = new hubspot.Client({ accessToken: process.env.HUBSPOT_ACCESS_TOKEN });
app.use(express.urlencoded());
app.use(cookieParser());
app.use(cors());
app.use((req, res, next) => {
    if (req.originalUrl === '/webhook') {
      next();
    } else {
      bodyParser.json()(req, res, next);
    }
  });
  app.get('/', (req, res) => {
    res.send({
      publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
    });
  });

if (
    !process.env.STRIPE_SECRET_KEY ||
    !process.env.STRIPE_PUBLISHABLE_KEY ||
    !process.env.HUBSPOT_ACCESS_TOKEN
  ) {
    console.log(
      'The .env file is not configured.'
    );
    console.log('');
    process.env.STRIPE_SECRET_KEY
      ? ''
      : console.log('Add STRIPE_SECRET_KEY to your .env file.');
  
    process.env.STRIPE_PUBLISHABLE_KEY
      ? ''
      : console.log('Add STRIPE_PUBLISHABLE_KEY to your .env file.');
    
      process.env.HUBSPOT_ACCESS_TOKEN
      ? ''
      : console.log('Add HUBSPOT_ACCESS_TOKEN to your .env file.');
  
    process.exit();
  }