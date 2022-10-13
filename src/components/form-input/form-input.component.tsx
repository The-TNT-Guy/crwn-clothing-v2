import { InputHTMLAttributes } from "react";
import "./form-input.styles.scss";

type FormInputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
};

const FormInput = ({ label, ...otherProps }: FormInputProps) => {
  return (
    <div className="group">
      <input className="form-input" {...otherProps} />
      {label && (
        <label
          className={`${
            Boolean(
              otherProps.value &&
                typeof otherProps.value === "string" &&
                otherProps.value.length
            )
              ? "shrink"
              : ""
          } form-input-label`}
        >
          {label}
        </label>
      )}
    </div>
  );
};

export default FormInput;
