const express=require('express');
const dotenv=require('dotenv');
const connectDB = require('./connectDB');
const fileUpload=require('express-fileupload');
const Products=require('./routes/Product');
const User=require('./routes/User');
const Order=require('./routes/Order');
const Payment=require('./routes/Payment');

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(fileUpload())

process.on('uncaughtException', err=>{
    console.log(err.stack)
    console.log('Server is sutting down due to uncaught exception')
    process.exit(1)
});

app.use('/api/v1',Products);
app.use('/api/v1',User);
app.use('/api/v1',Order);
app.use('/api/v1',Payment);

cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.API_KEY, 
    api_secret: process.env.API_SECRET, 
  });

connectDB();




app.listen(process.env.PORT ||5000,()=>console.log("server listening on port 5000"));

process.on('unhandledRejection',err=>{
    console.log(err)
    console.log('Server is sutting down due to unhandled rejection')
    server.close(()=>process.exit(1))
});