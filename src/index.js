require('dotenv').config();

const path = require('path');

const { engine } = require('express-handlebars');
const methodOverride = require('method-override');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

const route = require('./routes');

app.use(bodyParser.urlencoded({ extended: true }));

// DATABASE
const db = require('./config/db');

// CONNECT TO DATABASE
db.connect();

// HTTP LOGGER
// pp.use(morgan("combined"));

app.set('views', path.join(__dirname, 'resourses', 'views'));

// TEMPLATE ENGINE
app.engine(
  'hbs',
  engine({
    extname: 'hbs',
    helpers: {
      timeToString: (time) => {
        return time ? new Date(time).toLocaleString() : '';
      },
      getClassByStatus: (status) => (status ? 'status_on' : 'status_off'),
      getStatusName: (status) => (status ? 'Active' : 'Inactive'),
      json: (context) => JSON.stringify(context),
    },
  })
);
app.set('view engine', 'hbs');

// MIDDLEWARE
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));

// STATIC FILES
app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));

// ROUTING
route(app);
