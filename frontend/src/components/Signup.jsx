import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./Signup.css";

const Signup = () => {
  const [data, setData] = useState({
    name: "",
    username: "",
    email: "",
    mobile: "",
    gender: "",
    dob: "",
    password: "",
    role: "",
  });

  const register = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const Navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:3006/signup", data);
      if (response && response.data) {
        // console.log(response.data)

        Navigate("/Login");
      }
    } catch (error) {
      console.error("error durinng signnup", error);
      if (error.response && error.response.data) {
        console.error("Error details:", error.response.data);
      } else {
        console.log("Unexpecte error");
      }
    }
  };
  <br />;
  return (
    <div style={styles.container} className="signUp-container">
      <form onSubmit={handleSubmit} style={styles.form} className="signup-form">
      <label style={styles.label} htmlFor="name"> Name
      </label>
      <br />
      <input style={styles.input} type="text" name="name" value={data.name} onChange={register}
        
      />
      <br />
      <label style={styles.label} htmlFor="username"> UserName
      </label>
      <br />
      <input style={styles.input} type="text" name="username" value={data.username} onChange={register}
        
      />
      <br />
      <label style={styles.label} htmlFor="email"> Email
      </label>
      <br />
      <input style={styles.input} type="email" name="email" value={data.email} onChange={register}
        
      />
      <br />
      <label style={styles.label} htmlFor="mobile"> Mobile
      </label>
      <br />
      <input style={styles.input} type="number" name="mobile" value={data.mobile} onChange={register}
        
      />
      <br />
      <label style={styles.label} htmlFor="gender"> Gender
      </label>
      <br />
      <input style={styles.input} type="text" name="gender" value={data.gender} onChange={register}
        
      />
      <br />
      <label style={styles.label} htmlFor="dob"> DOB
      </label>
      <br />
      <input style={styles.input} type="date" name="dob" placeholder="DDMMYYYY" value={data.dob} onChange={register}
        
      />
      <br />
      <label style={styles.label} htmlFor="password"> Password
      </label>
      <br />
      <input style={styles.input} type="password" name="password" value={data.password} onChange={register}
        
      />
      <br />
      <label htmlFor="role" style={styles.label}> Role
      </label>
      <br />
      <select id="role" name="role" value={data.role} onChange={register} style={styles.input} required
      > <option value="role">Role</option> 
      <option value="teacher">Teacher</option> 
      <option value="principal">Principal</option> 
      <option value="student">Student</option>
      </select>
      <button type="submit" style={styles.button}> Submit
      </button>
      </form>
      <p className="p">
      Already have account ?{" "}
      <Link to="/login" className="span"> Login
      </Link>
      </p>
      {/* <p className="p">Already have account ? <Link to='/login' className="span"></Link></p> */}
    </div>
  );
};

const styles = {
  container: {
    // backgroundColor:"454343",
    fontFamily: "Arial, sans-serif",
    // backgroundColor: '#f4f4f4',
    // margin: '20px',
    //   outerHeight:'80vh'
  },
  form: {
    maxWidth: "500px",
    margin: "0px auto",
    background: "#fff",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  label: {
    // display: 'block',
    marginBottom: "8px",
  },
  input: {
    // border:'2px solid white',
    backgroundColor: "454343",
    width: "100%",
    padding: "8px",
    marginBottom: "5px",
    boxSizing: "border-box",
  },
  button: {
    backgroundColor: "#4caf50",
    color: "#fff",
    padding: "10px 15px",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
};

export default Signup;
