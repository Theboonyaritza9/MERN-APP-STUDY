import express from 'express';
import { isAuth, isAdmin } from '../util';
import Order from '../models/orderModal'


const router = express.Router();

router.get('/mine',isAuth ,async(req, res) => {
    const orders = await Order.find({user: req.user._id})
    res.send(orders);
})

router.get("/",  async(req, res) => {
    // const orders = await Order.find({}).populate('User');
    const orders = await Order.find({}).populate('user');
    // const orders = await Order.find({ });
    // console.log('check', orders);
    res.send(orders);
})

router.get("/:id", isAuth, async (req, res) => {
    const order = await Order.findOne({ _id: req.params.id });
    if (order) {
        res.send(order);
    } else {
        res.status(404).send('Order Not found');
    }
});




router.post("/", isAuth, async (req, res) => {
    
    const newOrder = new Order({
        orderItems: req.body.orderItems,
        user: req.user._id,
        shipping: req.body.shipping,
        payment: req.body.payment,
        itemsPrice: req.body.itemsPrice,
        taxPrice: req.body.taxPrice,
        shippingPrice: req.body.shippingPrice,
        totalPrice: req.body.totalPrice
    })

    const newOrderCreated = await newOrder.save();
    res.status(201).send({ message: "New Order Created", data: newOrderCreated });
})



router.put("/:id/pay", isAuth, async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (order) {
        order.isPaid = true;
        order.paidAt = Date.now();
        order.payment = {
            paymentMethod: 'paypal',
            paymentResult: {
                payerID: req.body.payerID,
                orderID: req.body.orderID,
                paymentID: req.body.paymentID
            }
        }
        const updatedOrder = await order.save();
        res.send({ message: 'Order Paid.', order: updatedOrder })
    } else {
        res.status(404).send({message: 'Order Not found'})
    }
})


router.delete('/:id', isAuth, isAdmin, async(req, res) => {
    const id = req.params.id;
    const order = await Order.findById(id);
    if(order){
        const deleteOrder = await order.remove();
        console.log(deleteOrder);
        res.send({message: 'Order remove'});
    }
    else{
        res.send({message: 'Order can not remove'});
    }
});



export default router;