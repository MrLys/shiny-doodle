import React, {useState} from "react";

import "./sign-in.styles.scss";
import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";
import {connect} from "react-redux";
import {emailSignInStart, googleSignInStart} from "../../redux/user/user.actions";

const SignIn = ({ emailSignInStart, googleSignInStart }) => {
  const [userCredentials, setCredentials] = useState({email: '', password: ''})

  const handleSubmit = async (event) => {
    event.preventDefault();
    emailSignInStart(userCredentials);
    setCredentials({email: '', password: ''})
  };
  const {email, password} = userCredentials;
  const handleChange = (event) => {
    const { name, value } = event.target;
    setCredentials({...userCredentials, [name]: value});
  }

  return (
      <div className="sign-in">
        <h2>I already have an account</h2>
        <span>Sign in with your email and password</span>
        <form onSubmit={handleSubmit}>
          <FormInput
              name="email"
              type="text"
              value={email}
              handleChange={handleChange}
              label="email"
              required
          />

          <FormInput
              name="password"
              type="password"
              value={password}
              handleChange={handleChange}
              label="password"
              required
          />
          <div className="buttons">
            <CustomButton type="submit"> Sign in </CustomButton>
            <CustomButton
                type="button"
                onClick={googleSignInStart}
                isGoogleSignIn
            >
              {" "}
              Sign in with google{" "}
            </CustomButton>
          </div>
        </form>
      </div>
  );
}
const mapDispatchToProps = dispatch => ({
  googleSignInStart: () => dispatch(googleSignInStart()),
  emailSignInStart: (emailAndPassword) => dispatch(emailSignInStart(emailAndPassword))
});
export default connect(null, mapDispatchToProps)(SignIn);