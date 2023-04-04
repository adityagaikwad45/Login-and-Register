const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();

// middlewares

app.use(express.json());
app.use(express.urlencoded());
app.use(cors());


// connection
mongoose.connect('mongodb://127.0.0.1:27017/loginDB')
.then(() => {

    console.log('connection is successful')

}).catch((err)=>{

    console.log(err);

})



// schema for document

const userSchema = new mongoose.Schema({

    name : String,
    email : String,
    password : String,
})

// module creation

const User = new mongoose.model("User", userSchema);





// Routes

app.post('/login', (req, res) => {

    const {email, password} = req.body;

    User.findOne({email : email}, (err, user) => {

        if(user){

            if(password === user.password){

                res.send({message : "Login Successful", user:user})
            }
            else{

                res.send({message : "password not matched"})
            }

        }else{

            res.send({message : "user Not Register"});
        }
    })
    
})

// registering the user 

app.post('/register', (req , res) => {
    
    const {name , email, password} = req.body;

    User.findOne({email:email}, (err, user) => {
        if(user){
            res.send({message : "User already Exist"})
        }
        else{

            const user = new User({
                name,
                email,
                password
            })
        
            user.save(err => {
                if(err){
                    res.send(err)
                }
                else{
        
                    res.send({message : "successfully registered"})
                }
            })
        }


    } )

    
})

app.listen(8000, () => {

    console.log(`server is started on http://127.0.0.1:8000`);
})





