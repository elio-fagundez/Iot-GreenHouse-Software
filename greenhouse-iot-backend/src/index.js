const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();

// Middlewares
app.use(bodyParser.json());

// DB Config
const db = 'mongodb://localhost:27017/greenhouse'; // Cambia esta línea si tienes otra configuración de MongoDB

// Connect to MongoDB
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// Basic route
app.get('/', (req, res) => res.send('API Running'));

// Port Config
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
