import React, { useContext, useState } from "react";
import "../css/signup.css";
import "../css/login.css";
import Input from "./Input.jsx";
import { loginFields } from "../data/loginFields.js";
import axios from "axios";
import { validateFormData } from "../data/loginValidation.js";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./Authentication.jsx";

function Login() {
  //! STATES

  let [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });
  let [formErrors, setformErrors] = useState({});
  let [successMsg, setSuccessMsg] = useState("");
  let navigateToHome = useNavigate();
  let { login } = useContext(AuthContext);

  //! FUCTION TO GET INPUT DATA

  let getData = ({ target: { value, name } }) => {
    setLoginData({ ...loginData, [name]: value });
  };

  //! FUNCTION TO POST DATA
  let postLoginData = async (e) => {
    e.preventDefault();

    setformErrors(validateFormData(loginData));
    console.log(formErrors);
    let fdataLength = Object.keys(validateFormData(loginData)).length;
    console.log(fdataLength);
    if (fdataLength === 0) {
      try {
        let { data } = await axios.get("http://localhost:3000/api/userdata");
        console.log(data);
        let existingUser = data.data.find((user) => {
          return (
            (user.email === loginData.username ||
              user.mobile === loginData.username) &&
            user.password === loginData.password
          );
        });
        if (existingUser) {
          let { data } = await axios.post(
            `http://localhost:3000/api/data/login`,
            loginData
          );
          setLoginData(data);
          login(loginData);
          setSuccessMsg(data.message);
          setTimeout(() => {
            navigateToHome("/expenses");
          }, 3000);
        } else {
          alert("User not found");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  //! JSX
  return (
    <>
      {successMsg && <p className="popup">{successMsg}</p>}
      <div className="formdiv">
        <h1>Login Form</h1>
        <form>
          {loginFields.map(({ id, type, value, placeholder, name }) => {
            return (
              <Input
                key={id}
                type={type}
                value={value}
                name={name}
                placeholder={placeholder}
                onchange={getData}
                errMsg={formErrors[name]}
              />
            );
          })}
          <button className="btn" onClick={postLoginData}>
            Login
          </button>
        </form>
        <a href="./signup">Don't have account? Signup</a>
      </div>
    </>
  );
}

export default Login;
