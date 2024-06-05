import React, { useState, useEffect } from "react";
import axios from "axios";

function RecycleBin() {
  const [recycleBinData, setRecycleBinData] = useState([]);

  const fetchRecycleBinData = () => {
    axios
      .get("http://localhost:3006/recycleBinData")
      .then((response) => setRecycleBinData(response.data.recycleBinData))
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    fetchRecycleBinData();
  }, []); // Fetch data when component mounts

  const deleteRecycleBinItem = (itemId) => {
    axios
      .delete(`http://localhost:3006/recycleBin/${itemId}`)
      .then((response) => {
        console.log(response.data.message);
        // Fetch updated data after deletion
        fetchRecycleBinData();
      })
      .catch((error) => console.error(error));
  };

  return (
    <div>
      <ul>
        <h1>Recycle Bin Data</h1>
        {recycleBinData.map((student) => (
          <div style={styles.submittedData} key={student.id}>
            <button
              style={styles.btn}
              onClick={() => deleteRecycleBinItem(student._id)}
            >
              Delete Permanently
            </button>
            <h2>Student Data</h2>
            <p>Name : {student.name}</p>
            <p>Email : {student.email}</p>
            <p>Date of Birth : {student.dob}</p>
            <p>Course : {student.course}</p>
          </div>
        ))}
      </ul>
    </div>
  );
}

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

export default RecycleBin;
