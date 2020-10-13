import express from 'express';
import User from '../models/userModel';
import { getToken, isAuth } from '../util';

const router = express.Router();


router.put('/:id',isAuth ,async (req, res) => {
    const userID = req.params.id;
    const user = await User.findById(userID);
    // console.log(user)
    if(user){
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        user.password = req.body.password || user.password;
        const updateUser = await user.save();
        res.send({
            _id: updateUser.id,
            name: updateUser.name,
            email: updateUser.email,
            password: updateUser.password,
            isAdmin: updateUser.isAdmin,
            token: getToken(updateUser)
            
        });
    }
    else{
        res.status(404).send({msg: 'User Not Found'});
    }
})

router.post('/signin', async (req, res) => {
    const signinUser = await User.findOne({
        email: req.body.email,
        password: req.body.password
    });
    if(signinUser){
        res.send({
            _id: signinUser.id,
            name: signinUser.name,
            email: signinUser.email,
            // password: signinUser.password,
            isAdmin: signinUser.isAdmin,
            token: getToken(signinUser)
            
        })
    } else{
        res.status(401).send({msg: 'Invalid Email or Password'});
    }
})

router.post('/register', async (req, res) => {
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });
    const newUser =  await user.save();
    if(newUser){
        res.send({
            _id: newUser.id,
            name: newUser.name,
            email: newUser.email,
            isAdmin: newUser.isAdmin,
            token: getToken(newUser)
            
        })
    }
    else{
        res.status(401).send({msg: 'Invalid User data'});
    }
})

router.get("/createadmin", async (req, res) => {
    try {
        const user = new User({
            name: 'Hachiman',
            email: 'test@hotmail.com',
            password: '1234',
            isAdmin: true
        });

        const newUser = await user.save();
        res.send(user);
    } catch (error) {
        res.send({ msg: error.message })
    }

})

export default router;