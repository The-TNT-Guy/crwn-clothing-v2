import { AuthError, AuthErrorCodes } from "firebase/auth";
import { ChangeEvent, FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  signInAuthUserWithEmailAndPassword,
  signInWithGooglePopup,
} from "../../utils/firebase/firebase.utils";
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";
import FormInput from "../form-input/form-input.component";
import "./sign-in.styles.scss";

const defaultFormFields = {
  email: "",
  password: "",
};

const SignIn = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;
  const navigate = useNavigate();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await signInAuthUserWithEmailAndPassword(email, password);
      resetFormFields();
      navigate("/");
    } catch (error) {
      switch ((error as AuthError).code) {
        case AuthErrorCodes.INVALID_PASSWORD:
          alert(`Incorrect password for email: ${email}!`);
          break;
        case AuthErrorCodes.USER_DELETED:
          alert("No account with this email found!");
          break;
        default:
          console.log("Failed signing-in user!", error);
      }
    }
  };

  const signInWithGoogle = async () => {
    try {
      await signInWithGooglePopup();
      navigate("/");
    } catch (error) {
      switch ((error as AuthError).code) {
        case AuthErrorCodes.POPUP_CLOSED_BY_USER:
          alert(`Google Sign-in was aborted!`);
          break;
        default:
          console.log("Failed signing-in user!", error);
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
          <Button
            type="button"
            buttonType={BUTTON_TYPE_CLASSES.google}
            onClick={signInWithGoogle}
          >
            Continue with Google
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignIn;
