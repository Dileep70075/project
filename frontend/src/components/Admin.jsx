import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Admin = () => {
  const userDataString = localStorage.getItem("userData");
  const [submittedData, setSubmittedData] = useState([]);
  const [user, setUser] = useState("");
  const userId = user._id;
  const role = user.role;
  const email = user.email;
  useEffect(() => {
    if (userDataString) {
      const userData = JSON.parse(userDataString);
      setUser(userData.user);
    } else {
      console.log("User data not found in localStorage");
    }
  }, [userDataString]); 

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3006/studentData/${userId}`,
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
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    if (userId && role) {
      fetchData();
    }
  }, [userId, role]);

  const deleteStudent = async (studentId) => {
    await axios
      .delete(`http://localhost:3006/students/${studentId}`)
      .then((response) => {
        fetchData();
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
