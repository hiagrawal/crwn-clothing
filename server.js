const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const compression = require('compression');
const enforce = require('express-sslify');

if (process.env.NODE_ENV !== 'production') require('dotenv').config();
//console.log('stripe secret key' + process.env.STRIPE_SECRET_KEY);

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


if (process.env.NODE_ENV === 'production') {
  app.use(compression());
  //compression algorithm does is gzip the files so they're smaller

  app.use(enforce.HTTPS({ trustProtoHeader : true}));
  //This is to make the application PWA complaint that is to enforce all requests through HTTPS only
  
  app.use(express.static(path.join(__dirname, 'client/build')));

  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

app.listen(port, error => {
  if (error) throw error;
  console.log('Server running on port ' + port);
});

app.get('/service-worker.js', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'build', 'service-worker.js'));
});
//This is to make PWA complaint to get service worker file

app.post('/payment', (req, res) => {
  const body = {
    source: req.body.token.id,
    amount: req.body.amount,
    currency: 'inr'
  };
  // console.log('req' + req.body.token.id);
  // console.log('req' + req.body.amount);
  

  stripe.charges.create(body, (stripeErr, stripeRes) => {
    console.log('inside');
    if (stripeErr) {
      console.log(stripeErr);
      res.status(500).send({ error: stripeErr });
    } else {
      res.status(200).send({ success: stripeRes });
    }
  });
});

