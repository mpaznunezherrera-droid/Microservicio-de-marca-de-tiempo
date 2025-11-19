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
  const dateParam = req.params.date;

  let date;

  // 1) Si no viene parámetro -> fecha actual
  if (!dateParam) {
    date = new Date();
  } else {
    // 2) Ver si el parámetro es solo números -> tratamos como unix en ms
    if (/^\d+$/.test(dateParam)) {
      // parseInt para convertir string a número
      const timestamp = parseInt(dateParam);
      date = new Date(timestamp);
    } else {
      // 3) Si no son solo números, lo tratamos como string de fecha
      date = new Date(dateParam);
    }
  }

  // 4) Validar si la fecha es válida
  if (date.toString() === 'Invalid Date') {
    return res.json({ error: 'Invalid Date' });
  }

  // 5) Responder con unix y utc
  res.json({
    unix: date.getTime(),
    utc: date.toUTCString()
  });
});

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
