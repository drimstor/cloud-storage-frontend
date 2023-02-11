import { useEffect, useState } from "react";

export type validationsList = {
  minLength?: number;
  maxLength?: number;
  isEmpty?: boolean;
  isEmail?: boolean;
};

const useCheckValidation = (
  value: string,
  validationsList: validationsList
) => {
  const [minLengthError, setMinLengthError] = useState("");
  const [maxLengthError, setMaxLengthError] = useState("");
  const [emptyFieldError, setEmptyFieldError] = useState("");
  const [incorrectEmailError, setIncorrectEmailError] = useState("");

  useEffect(() => {
    for (const validation in validationsList) {
      switch (validation) {
        case "minLength":
          value.length < validationsList[validation]!
            ? setMinLengthError(
                `Minimal length - ${validationsList[validation]}`
              )
            : setMinLengthError("");
          break;

        case "maxLength":
          value.length > validationsList[validation]!
            ? setMaxLengthError(
                `Maximum length - ${validationsList[validation]}`
              )
            : setMaxLengthError("");
          break;

        case "isEmpty":
          if (validationsList[validation]) {
            setEmptyFieldError(value ? "" : "Field is empty");
          }
          break;

        case "isEmail":
          if (validationsList[validation]) {
            value
              .toLowerCase()
              .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
              )
              ? setIncorrectEmailError("")
              : setIncorrectEmailError("Incorrect email");
            break;
          }
      }
    }
  }, [value]);

  return (
    emptyFieldError || minLengthError || maxLengthError || incorrectEmailError
  );
};

export default useCheckValidation;
