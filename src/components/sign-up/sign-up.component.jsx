import React from "react";

import { auth, createUserProfileDocument } from "../../firebase/firebase.util";
import FormInput from "../form-input/form-input.component";

import "./sign-up.styles.scss";
import CustomButton from "../custom-button/custom-button.component";

class SignUp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      displayName: "",
      email: "",
      password: "",
      confirmPassword: "",
    };
  }
  handleSubmit = async (event) => {
    event.preventDefault();
    const { displayName, email, password, confirmPassword } = this.state;
    if (password !== confirmPassword) {
      alert("passwords don't match");
      return;
    }
    try {
      const { user } = await auth.createUserWithEmailAndPassword(
        email,
        password
      );
      await createUserProfileDocument(user, { displayName });
      this.setState({
        displayName: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
    } catch (error) {
      console.log(error);
    }
  };

  handleChange = (event) => {
    const { value, name } = event.target;
    this.setState({ [name]: value }, () => console.log(this.state));
  };

  render() {
    const {
      displayName,
      email,
      password,
      confirmPassword,
      username,
    } = this.state;
    return (
      <div className="sign-up">
        <h2 className="title">I do not have an account</h2>
        <span>Sign Up</span>
        <form onSubmit={this.handleSubmit}>
          <FormInput
            name="displayName"
            type="text"
            value={displayName}
            handleChange={this.handleChange}
            label="name"
            required
          />
          <FormInput
            name="email"
            type="email"
            value={email}
            handleChange={this.handleChange}
            label="email"
            required
          />
          <label style={{ display: "none" }}>username</label>
          <FormInput
            style={{ display: "none" }}
            name="username"
            value={username}
            handleChange={this.handleChange}
          />

          <FormInput
            name="password"
            type="password"
            value={password}
            handleChange={this.handleChange}
            label="password"
            required
          />
          <FormInput
            name="confirmPassword"
            type="confirmPassword"
            value={confirmPassword}
            handleChange={this.handleChange}
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
}

export default SignUp;
