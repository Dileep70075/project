import axios from 'axios';
import React, {useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddStudentForm = () => {

const userDataString = localStorage.getItem('userData');

if (userDataString) {
    // Parse the JSON string to convert it back to a JavaScript object
    const userData = JSON.parse(userDataString); 
    

    // Now you can use the userData object in your component
    console.log(userData);
    var id=(userData.user._id)
    console.log(id)
} else {
    // Handle the case when there is no user data in localStorage
    console.log('User data not found in localStorage');
}

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    dob: '',
    course: 'math', // Default course
    userId: id, // Default course
  });
  // const [submittedData, setSubmittedData] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value});
   
  };

  const Navigate = useNavigate()
  const handleSubmit = async(e) => {
    e.preventDefault();
    const response = await axios.post('http://localhost:3006/addStudentForm',formData)
    if(response && response.data)
    Navigate('/admin')
    console.log('Form submitted:', response.data);
  };

  return (
    <div style={styles.container}>
      <form style={styles.form} onSubmit={handleSubmit}>
 <label htmlFor="name" style={styles.label}> Name:
 </label>
 <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} style={styles.input} required
 />

 <label htmlFor="email" style={styles.label}> Email:
 </label>
 <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} style={styles.input} required
 />

 <label htmlFor="dob" style={styles.label}> Date of Birth:
 </label>
 <input type="date" id="dob" name="dob" value={formData.dob} onChange={handleChange} style={styles.input} required
 />

 <label htmlFor="course" style={styles.label}> Course:
 </label>
 <select id="course" name="course" value={formData.course} onChange={handleChange} style={styles.input} required
 > <option value="math">Math</option> <option value="science">Science</option> <option value="history">History</option>
 </select>

 <button type="submit" style={styles.button}> Submit
 </button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    // backgroundColor:"454343",
    fontFamily: 'Arial, sans-serif',
    // backgroundColor: '#f4f4f4',
    margin: '20px',
  },
  form: {
    
    maxWidth: '400px',
    margin: '20px auto',
    background: '#fff',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  label: {
    display: 'block',
    marginBottom: '8px',
  },
  input: {
    // border:'2px solid white',
    backgroundColor:"454343",
    width: '100%',
    padding: '8px',
    marginBottom: '10px',
    boxSizing: 'border-box',
  },
  button: {
    backgroundColor: '#4caf50',
    color: '#fff',
    padding: '10px 15px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};

export default AddStudentForm;
