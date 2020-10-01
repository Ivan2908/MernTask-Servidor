const express = require('express');
const connectDB = require('./db');
const cors = require('cors');

//create server
const app = express();

//connect to the DB
connectDB();

//Habilite cors
app.use(cors());

//Enable express.js
app.use( express.json( {extended: true }));

const PORT = process.env.PORT || 4000;

//import routes
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/proyectos', require('./routes/proyectos'));
app.use('/api/tareas', require('./routes/tareas'));


//start app
app.listen(PORT, () => {
    console.log(`The server is working in the port ${PORT}`);
});