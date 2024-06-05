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
  //create model of addStudentForm
const Student = mongoose.model("Student", {
    name: String,
    email: String,
    dob: String,
    course: String,
    userId: String,
  });
  // Create a model for recycle bin items
const RecycleBinItem = mongoose.model("RecycleBinItem", {
    name: String,
    email: String,
    dob: String,
    course: String,
    userId: String,
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
// addStudentForm api
app.post("/addStudentForm", async (req, res) => {
    const { name, email, dob, course,userId } = req.body;
    try {
      const newStudent = new Student({ name, email, dob, course,userId});
      await newStudent.save();
      res.json({ message: "Student Data Save successFull" });
    } catch (error) {
      console.error("error during Student Data Save ", error);
      res.status(500).json({ message: "internal server error" });
    }
  });
//   student data get api
  app.get('/studentData/:userId',async (req,res) => {
    const {role,email} = req.query
    const userId = req.params.userId;
try{
const studentAll = await Student.find()
if(role==='teacher'){
const students = await Student.find({ userId });
res.json({ students });
}
else if(role==='principal'){
    res.json({studentAll});
}
else if(role==='student'){
    console.log('email',email);
    const student = await Student.find({ email })
    res.json({student})
}
else{
    res.status(404).json({ message: "No student data found for the given user ID." }); 
}
}
catch(error){
    console.error("Error during student getting", error);
    res.status(500).json({ message: "Internal Server Error" });
}
  });
//   delete student and move recylcle bin
app.delete('/students/:id',async(req,res) => {
    const studentId = req.params.id;
    try{
const deleteStudent = await Student.findOne({ _id:studentId})
console.log(deleteStudent)
if(deleteStudent){
    const recycleBinItem = new RecycleBinItem(deletedStudent.toObject());
    await Student.deleteOne({ _id:studentId});
    res.json(deleteStudent)
}
else{
    res.status(404).json({ error: 'Student not found' });
}
    }
    catch(error){
        console.error("Error during student deletion", error);
        res.status(500).json({ message: 'Internal Server Error' }); 
    }
})

// Delete recycle bin item permanently
app.delete('/recycleBin/:id', async (req, res) => {
    const recycleBinItemId = req.params.id;
  
    try {
      const deletedRecycleBinItem = await RecycleBinItem.findOne({ _id: recycleBinItemId });
  
      if (deletedRecycleBinItem) {
        // Delete the recycle bin item permanently
        await RecycleBinItem.deleteOne({ _id: recycleBinItemId });
  
        res.json({ message: 'Recycle bin item deleted permanently' });
      } else {
        res.status(404).json({ error: 'Recycle bin item not found' });
      }
    } catch (error) {
      console.error("Error during recycle bin item deletion", error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });
  
  
  // Get recycle bin data
  app.get("/recycleBinData", async (req, res) => {
    try {
      const recycleBinData = await RecycleBinItem.find();
      res.json({ recycleBinData });
    } catch (error) {
      console.error("Error during fetching recycle bin data", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  });
  