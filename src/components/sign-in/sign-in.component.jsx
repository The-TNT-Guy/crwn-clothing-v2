import { useState } from "react";
import {
  signInAuthUserWithEmailAndPassword,
  signInWithGooglePopup,
} from "../../utils/firebase/firebase.utils";
import Button from "../button/button.component";
import FormInput from "../form-input/form-input.component";
import "./sign-in.styles.scss";

const defaultFormFields = {
  email: "",
  password: "",
};

const SignIn = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await signInAuthUserWithEmailAndPassword(
        email,
        password
      );
      resetFormFields();
    } catch (error) {
      switch (error.code) {
        case "auth/wrong-password":
          alert(`Incorrect password for email: ${email}!`);
          break;
        case "auth/user-not-found":
          alert("No account with this email found!");
          break;
        default:
          console.log("Failed signing-in user!", error.message);
      }
    }
  };

  const signInWithGoogle = async () => {
    try {
      signInWithGooglePopup();
    } catch (error) {
      switch (error.code) {
        case "auth/popup-closed-by-user":
          alert(`Google Sign-in was aborted!`);
          break;
        default:
          console.log("Failed signing-in user!", error.message);
      }
    }
  };

  const resetFormFields = () => setFormFields(defaultFormFields);

  return (
    <div className="sign-in-container">
      <h2>I already have an account</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Email"
          type="email"
          required
          onChange={handleChange}
          name="email"
          value={email}
        />

        <FormInput
          label="Password"
          type="password"
          required
          onChange={handleChange}
          name="password"
          value={password}
        />
        <div className="row">
          <Button type="submit">Sign In</Button>
          <Button type="button" buttonType="google" onClick={signInWithGoogle}>
            Continue with Google
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignIn;
