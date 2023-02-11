import {
  faEye,
  faEyeSlash,
  IconDefinition,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";
import useInput from "hooks/useValidation/useInput";
import { useEffect, useState } from "react";
import s from "./Input.module.scss";

// input props types
interface iInput {
  placeholder: string;
  label?: string;
  type: "email" | "text" | "select" | "phone" | "password" | string;
  className?: string;
  initialValue?: string;
  required?: boolean;
  multiline?: boolean;
  validation?: { minLength?: number; maxLength?: number; isEmpty?: boolean };
  isCheckError?: boolean;
  checkValidate?: (key: string, error: string, value: string) => void;
  icon: IconDefinition;
  error?: boolean;
  errorText?: string;
}

// input field types
export interface inputValuesProps {
  label?: string;
  placeholder?: string;
  type: "email" | "text" | "select" | "phone" | "password";
  required?: boolean;
  items?: string[];
  initialValue?: string;
  multiline?: boolean;
  validation?: {
    minLength?: number;
    maxLength?: number;
    isEmpty?: boolean;
    isEmail?: boolean;
  };
  error?: boolean;
  errorText?: string;
}

function Input({
  placeholder,
  type,
  icon,
  initialValue,
  validation,
  checkValidate,
  isCheckError,
  error,
  errorText,
}: iInput) {
  //------------------- Name Formation ----------------------//

  const [formattedName, setFormattedName] = useState(placeholder);
  useEffect(() => {
    const name = formattedName.toLowerCase().split(" ");
    const correctName = name
      .map((name, index) =>
        index ? name[0].toUpperCase() + name.slice(1) : name
      )
      .join("");
    setFormattedName(correctName);
  }, []);

  //------------------- Validation ----------------------//

  const useValid = useInput(initialValue ?? "", {
    isEmail: type === "email",
    isEmpty: true,
    ...validation,
  });

  useEffect(() => {
    if (isCheckError && checkValidate) {
      useValid.onBlur();
      useValid.validateError
        ? checkValidate(
            formattedName,
            useValid.validateError,
            useValid.inputValue
          )
        : checkValidate(formattedName, "", useValid.inputValue);
    }
  }, [isCheckError]);

  //------------------- Password ----------------------//

  const [isShowPassword, setIsShowPassword] = useState(false);
  const showPasswordHandler = () => {
    setIsShowPassword(!isShowPassword);
  };

  return (
    <div
      className={clsx(
        useValid.isOutFocus && !!useValid.validateError && s.error,
        error && s.error,
        s.inputWrapper
      )}
    >
      <FontAwesomeIcon icon={icon} />
      <input
        placeholder={placeholder}
        name={formattedName}
        type={
          type === "password" ? (isShowPassword ? "text" : "password") : type
        }
        value={useValid.inputValue}
        onChange={useValid.onChange}
        onBlur={useValid.onBlur}
      />
      <div className={s.errorText}>
        {useValid.isOutFocus && useValid.validateError}
        {errorText && errorText}
      </div>
      {type === "password" && (
        <div className={s.showPasswordButton}>
          <FontAwesomeIcon
            onMouseDown={showPasswordHandler}
            onMouseUp={showPasswordHandler}
            icon={isShowPassword ? faEyeSlash : faEye}
          />
        </div>
      )}
    </div>
  );
}

export default Input;
