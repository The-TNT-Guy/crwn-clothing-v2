import React, { ButtonHTMLAttributes } from "react";
import "./button.styles.scss";

export enum BUTTON_TYPE_CLASSES {
  google = "google-sign-in",
  inverted = "inverted",
}

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children?: React.ReactNode;
  buttonType?: BUTTON_TYPE_CLASSES;
};

const Button = ({ children, buttonType, ...otherProps }: ButtonProps) => {
  return (
    <button
      className={`button-container ${buttonType && buttonType}`}
      {...otherProps}
    >
      {children}
    </button>
  );
};

export default Button;
