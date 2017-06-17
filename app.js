var accountSid = 'AC55e9353006f995d82afadd61a051d564';
var authToken = '6e221eeec32bd9ce676f12d4742d3e30';

var twilio = require('twilio');
var client = new twilio(accountSid, authToken);

// Require the module
var Forecast = require('forecast');

var WiFiControl = require('wifi-control');

//  Initialize wifi-control package with verbose output
WiFiControl.init({
  debug: true
});

// Initialize
var forecast = new Forecast({
  service: 'darksky',
  key: '324e054a7aaaa8d45f6c187abd023f59',
  units: 'fahrenheit',
  cache: true,      // Cache API requests
  ttl: {            // How long to cache requests. Uses syntax from moment.js: http://momentjs.com/docs/#/durations/creating/
    minutes: 27,
    seconds: 45
  }
});

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const server = app.listen(3000);

app.post('/send', (req, res) => {
  client.messages.create({
      body: req.body.message,
      to: '3102910594',
      from: '4242922857'
  })
  .then((message) => console.log(message.sid));
})

app.get('/weather', (req, res) => {
  forecast.get([33.7450464, -118.31345959999999], function(err, weather) {
  if(err) return console.dir(err);
    res.send(weather.currently)
  });
})

app.get('/wifi', (req, res) => {
  res.send(WiFiControl.getIfaceState())
})
