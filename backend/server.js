const express=require('express');
const dotenv=require('dotenv');
const connectDB = require('./connectDB');

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
connectDB();




app.listen(process.env.PORT ||5000,()=>console.log("server listening on port 5000"));
