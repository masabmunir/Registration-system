const express = require('express');
const cors = require('cors');
const mongoose = require('./db/conn');
require('dotenv').config();
const port = process.env.PORT || process.env.API_PORT; 

const app = express();

//empDetails 
const empDetailsRoutes = require('./Routes/empdetails')

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: false }));

app.use(cors());


app.use('/empDetails', empDetailsRoutes);

app.listen(port, () => {
    console.log(`Server started at port ${port}`);
});
