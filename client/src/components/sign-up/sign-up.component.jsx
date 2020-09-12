import React, {useState} from "react";

import FormInput from "../form-input/form-input.component";

import "./sign-up.styles.scss";
import CustomButton from "../custom-button/custom-button.component";
import {connect} from "react-redux";
import {signUpStart} from "../../redux/user/user.actions";

const SignUp = ({ signUpStart }) => {
  const [userCredentials, setCredentials] = useState({email: '', password: '', confirmPassword: '', displayName:''})
  const [username, setUsername] = useState('');

  const {displayName, email, password, confirmPassword} = userCredentials;

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords don't match");
      return;
    }
    signUpStart({ displayName , email, password });
  };
  const handleChange = (event) => {
    const { name, value } = event.target;
    setCredentials({ ...userCredentials, [name]: value});
  }

  return (
      <div className="sign-up">
        <h2 className="title">I do not have an account</h2>
        <span>Sign Up</span>
        <form onSubmit={handleSubmit}>
          <FormInput
              name="displayName"
              type="text"
              value={userCredentials.displayName}
              handleChange={handleChange}
              label="name"
              required
          />
          <FormInput
              name="email"
              type="email"
              value={userCredentials.email}
              handleChange={handleChange}
              label="email"
              required
          />
          <label style={{ display: "none" }}>username</label>
          <FormInput
              style={{ display: "none" }}
              name="username"
              value={username}
              handleChange={({target: { value } }) => {setUsername(value); console.log("error")}}
          />

          <FormInput
              name="password"
              type="password"
              value={userCredentials.password}
              handleChange={handleChange}
              label="password"
              required
          />
          <FormInput
              name="confirmPassword"
              type="password"
              value={userCredentials.confirmPassword}
              handleChange={handleChange}
              label="confirm Password"
              required
          />
          <div className="buttons">
            <CustomButton type="submit"> SIGN UP </CustomButton>
          </div>
        </form>
      </div>
  );
}
const mapDispatchToProps = dispatch => ({
  signUpStart: (userData) => dispatch(signUpStart(userData))
});
export default connect(null, mapDispatchToProps)(SignUp);
