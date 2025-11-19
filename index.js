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

  let date;
  
  // Si no se proporciona fecha, usar la fecha actual
  if (!dateString) {
    date = new Date();
  } else {
    // Evalúa si es un timestamp en milisegundos (todos dígitos)
    if (/^\d+$/.test(dateString)) {
      // Convertir a número y crear fecha
      date = new Date(Number(dateString));
    } else {
      // Caso normal para string de fecha
      date = new Date(dateString);
    }
  }

  // Comprobar si la fecha es inválida
  if (date.toString() === 'Invalid Date') {
    return res.json({ error: 'Invalid Date' });
  }
  
  // Devolver JSON con formatos solicitados
  res.json({
    unix: date.getTime(),
    utc: date.toUTCString()
  });
});

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
