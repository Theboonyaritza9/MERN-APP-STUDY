import express from 'express';
// import data from './data';
import config from './config';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import userRoute from './routes/userRoute';
import productRoute from './routes/productRoute';
import orderRoute from './routes/orderRoute';
import bodyParser from 'body-parser';

dotenv.config();

// mongodb+srv://admin:<password>@mongo3-crud-7dsrv.mongodb.net/test?retryWrites=true&w=majority
const mongodbUrl = config.MONGODB_URL;
const db1 = 'mongodb+srv://admin:1234@mongo3-crud-7dsrv.mongodb.net/amazona?retryWrites=true&w=majority'
mongoose.connect(mongodbUrl, {useNewUrlParser:true, useUnifiedTopology:true, useCreateIndex: true}, (err) => {
    if(!err) console.log('MongoDB started');
    else console.log(err.reason);
})
// .catch(error => console.log(error.reason));


const app = express();

app.use(bodyParser.json());
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/orders", orderRoute);
app.get("/api/config/paypal", (req, res) => {
    res.send(config.PAYPAL_CLIENT_ID);
})

// app.get("/api/orders/:id", (req, res) => {
//     const orderId = req.params.id;
//     const order = data.orders.find(x => Number(x._id) === Number(orderId));
//     if(order)
//         res.send(order);
//     else
//         res.status(404).send({msg: "order Not Found."});    
// });

// app.get("/api/orders", (req, res) => {
//     res.send(data.orders);
// });

app.listen(5000, () => console.log('Server started at http://localhost:5000'))