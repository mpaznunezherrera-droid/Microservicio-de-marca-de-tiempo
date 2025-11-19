// index.js

// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200})); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// your first API endpoint...
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

// ********** AQUI VA TU MICROSERVICIO **********
app.get('/api/:date?', (req, res) => {
  let dateString = req.params.date;

  if (!dateString) {
    // sin parámetro, fecha actual
    let now = new Date();
    return res.json({ unix: now.getTime(), utc: now.toUTCString() });
  }

  if (/^\d{5,}$/.test(dateString)) {
    // Si tiene 5 o más dígitos, es timestamp unix en ms
    let dateInt = parseInt(dateString);
    let date = new Date(dateInt);
    return res.json({ unix: dateInt, utc: date.toUTCString() });
  }

  let dateObject = new Date(dateString);

  if (dateObject.toString() === 'Invalid Date') {
    return res.json({ error: 'Invalid Date' });
  } else {
    return res.json({ unix: dateObject.valueOf(), utc: dateObject.toUTCString() });
  }
});

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
