const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const morgan = require('morgan');
const connectDB = require('./config/db')
const path = require("path");


dotenv.config();
connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan('dev'))

// Serve static files (for downloading Excel)
app.use("/exports", express.static(path.join(__dirname, "exports")));

/**
 * Api Routes
 * @name Claims API
 * @description CRUD API for Policy Claims
 */

app.use("/api/v1/claims", require('./routes/claim.routes'))



const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=> console.log(`Server is running on PORT :- ${PORT}`))