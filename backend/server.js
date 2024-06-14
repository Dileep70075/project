const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const express = require("express");

const PORT = 3006;
const cors = require("cors");
const app = express();

app.use(cors());
app.use(bodyParser.json());

// let students = [];
// let recycleBin = [];

// database connection mongodb

mongoose
  .connect("mongodb://127.0.0.1:27017/studentForm")
  .then(() => {
    console.log("database is connected");
    app.listen(PORT, () => {
      console.log(`server is running on PORT, ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("database connection error", error);
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

//signup api
app.post("/signup", async (req, res) => {
  const { name, username, email, mobile, gender, dob, password,role } = req.body;
  try {
    const usersDta = await User.findOne({ username });
    if (usersDta) {
      res.status(500).json({ message: "User already exist" });
    } else {
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
      res.json({ message: "Signup successFull" });
    }
  } catch (error) {
    console.error("error during Signup", error);
    res.status(500).json({ message: "internal server error" });
  }
});

//login api
app.post("/login", async (req, res) => {
  const { username, password,role } = req.body;
  try {
    const user = await User.findOne({ username,role });
    // console.log(user)
    if (!user || user.password !== password) {
      return res.status(401).json({ message: "Invalid Password" });
    } else {
      res.status(200).json({ message: "Login SuccessFull",user });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ Message: "Error during login" });
  }
});

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











// student data get api

app.get("/studentData/:userId", async (req, res) => {
  const {role,email } = req.query
  const userId = req.params.userId;
  try {
    const studentAll = await Student.find()
    if (role==='teacher') {
      const students = await Student.find({ userId });
      res.json({ students }); 
    } else if(role==='principal') {
      res.json({studentAll});
    }
     else if(role==='student') {
      console.log("email",email)
      const student = await Student.find({email})
      res.json({student});
    }
     else {
      res.status(404).json({ message: "No student data found for the given user ID." });
    }
  } catch (error) {
    console.error("Error during student getting", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});







// Delete student and move to recycle bin
// app.delete('/students/:id', async (req, res) => {
//   const studentId = req.params.id;

//   try {
//     const deletedStudent = await Student.findOne({ _id: studentId });
//     console.log(deletedStudent)

//     if (deletedStudent) {
//       // Save the deleted student to the RecycleBinItem collection
//       const recycleBinItem = new RecycleBinItem(deletedStudent.toObject());
//       await recycleBinItem.save();

//       // Delete the student from the Student collection
//       await Student.deleteOne({ _id: studentId });

//       res.json(deletedStudent);
//     } else {
//       res.status(404).json({ error: 'Student not found' });
//     }
//   } catch (error) {
//     console.error("Error during student deletion", error);
//     res.status(500).json({ message: 'Internal Server Error' });
//   }
// });








// Delete recycle bin item permanently
// app.delete('/recycleBin/:id', async (req, res) => {
//   const recycleBinItemId = req.params.id;

//   try {
//     const deletedRecycleBinItem = await RecycleBinItem.findOne({ _id: recycleBinItemId });

//     if (deletedRecycleBinItem) {
//       // Delete the recycle bin item permanently
//       await RecycleBinItem.deleteOne({ _id: recycleBinItemId });

//       res.json({ message: 'Recycle bin item deleted permanently' });
//     } else {
//       res.status(404).json({ error: 'Recycle bin item not found' });
//     }
//   } catch (error) {
//     console.error("Error during recycle bin item deletion", error);
//     res.status(500).json({ message: 'Internal Server Error' });
//   }
// });








// Get recycle bin data
// app.get("/recycleBinData", async (req, res) => {
//   try {
//     const recycleBinData = await RecycleBinItem.find();
//     res.json({ recycleBinData });
//   } catch (error) {
//     console.error("Error during fetching recycle bin data", error);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// });
