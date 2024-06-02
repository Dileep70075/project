const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const express = require('express');
const PORT = 3007;
const cors = require('cors');
const app = express();
app.use(cors());
app.use(bodyParser.json());
// connect database
mongoose.connect("mongodb://127.0.0.1:27017/studentForm")
.then(()=>{
    app.listen(PORT , ()=>{
        console.log(`server is running on port ${PORT}`);
    });
})
.catch((error) => {
console.error('database connection error',error)
});
//create model of Signup
const User = mongoose.model("User", {
    name: String,
    username: String,
    email: String,
    mobile: String,
    gender: String,
    dob: String,
    password: String,
    role: String,
  });
// signup api
app.post('/signup',async(req,res)=>{
    const { name, username, email, mobile, gender, dob, password,role } = req.body;
    try{
const userData = await User.findOne ({ username });
if(userData){
    res.status(500).json({ message:'user already exist' });
}
else{
    const newUser = new User({
        name,
        username,
        email,
        mobile,
        gender,
        dob,
        password,
        role, 
    });
    await newUser.save();
    res.json({message:'signup successfull'});
}
    }
    catch(error){
        console.error("error during Signup", error);
        res.status(500).json({ message: "internal server error" });
    }
})
// api Login
app.post('/login',async(req,res) => {
    const{ username,password,role } = req.body;
    try{
const user = await User.findOne({ username , role });
if(!user || user.password !== password) {
return res.status(500).json({ message:'invalid password' })
}
else{
    res.status(200).json({ message: "Login SuccessFull",user });
}
    }
    catch(error){
        console.error(error);
        res.status(500).json({ Message: "Error during login" });
    }
})