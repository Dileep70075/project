

import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Admin = () => {
  // Retrieve user data from localStorage
  const userDataString = localStorage.getItem("userData");
  // State to store the fetched student data
  const [submittedData, setSubmittedData] = useState([]);
  // State to store the user ID
  const [user, setUser] = useState("");
  const userId = user._id;
  const role = user.role;
  const email = user.email;
  // const [recycleBin, setRecycleBin] = useState([]);

  // Check if userDataString is not null or undefined
  useEffect(() => {
    if (userDataString) {
      // Parse the JSON string to convert it back to a JavaScript object
      const userData = JSON.parse(userDataString);

      // Extract the user ID from userData and set it in the state
      setUser(userData.user);
    } else {
      // Handle the case when there is no user data in localStorage
      console.log("User data not found in localStorage");
    }
  }, [userDataString]); // Trigger the effect when userDataString changes

  // Fetch student data based on the user ID

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3007/studentData/${userId}`,
        {
          params: { role: role, email: email },
        }
      );
      console.log("student", response.data);

      if (response.data.students) {
        setSubmittedData(response.data.students);
      } else if (response.data.studentAll) {
        setSubmittedData(response.data.studentAll);
      } else {
        setSubmittedData(response.data.student);
      }
      // console.log('studentAll',response.data.studentAll);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Fetch data only if the user ID is available
  useEffect(() => {
    if (userId && role) {
      fetchData();
    }
  }, [userId, role]); // Trigger the effect when userId changes

  const deleteStudent = async (studentId) => {
    await axios
      .delete(`http://localhost:3007/students/${studentId}`)
      .then((response) => {
        fetchData();
        // console.log( "StudentId",response.data)
      })
      .catch((error) => console.error(error));
  };

  return (
    <div style={styles.container}>
      <Link to="/addStudentForm">
        <button  style={styles.button} type="submit">
          Add Student
        </button>
      </Link>

      <Link to="/recycleBin">
        <button style={styles.button} type="submit">
          RecycleBin
        </button>
      </Link>

      {submittedData &&
        submittedData.map((student) => (
          <div style={styles.submittedData} key={student.id}>
            <button style={styles.btn} onClick={() => deleteStudent(student._id)}>
              Move RecycleBin
            </button>
            <h2>Student Data</h2>
            <p>Name : {student.name}</p>
            <p>Email : {student.email}</p>
            <p>Date of Birth : {student.dob}</p>
            <p>Course : {student.course}</p>
          </div>
        ))}
    </div>
  );
};

const styles = {
  container: {
    fontFamily: "Arial, sans-serif",
    margin: "20px",
  },
  button: {
    backgroundColor: "#4caf50",
    color: "#fff",
    padding: "10px 15px",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    marginLeft: "5px",
  },
  submittedData: {
    marginTop: "20px",
    padding: "20px",
    background: "#fff",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  btn: {
    float: "right",
  },
};

export default Admin;
