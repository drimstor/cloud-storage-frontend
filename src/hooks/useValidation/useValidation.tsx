import { useEffect, useReducer, useState } from "react";

export interface formFieldsTypes {
  [key: string]: any;
}

const checkListErrorsReducer = (state: any, action: formFieldsTypes) => {
  return {
    ...state,
    ...action,
  };
};

const setFormFieldsReducer = (state: any, action: formFieldsTypes) => {
  return {
    ...state,
    ...action,
  };
};

const useValidation = () => {
  const [listErrors, setListErrors] = useReducer(checkListErrorsReducer, null);
  const [formFields, setFormFields] = useReducer(setFormFieldsReducer, {});
  const [isCheckError, setIsCheckError] = useState(false);
  const [isNoError, setIsNoError] = useState(false);

  const runCheck = () => {
    setIsCheckError(true);
    setIsNoError(false);
  };

  const checkValidate = (key: string, error: string, value: any) => {
    setIsCheckError(false);
    setListErrors({ [key]: error });
    setFormFields({ [key]: value });
  };

  useEffect(() => {
    if (listErrors) {
      const errors = Object.values(listErrors).filter((error) => !!error);
      if (errors.length === 0) {
        setIsNoError(true);
      }
    }
  }, [listErrors]);

  return {
    runCheck,
    isCheckError,
    checkValidate,
    isNoError,
    formFields,
  };
};

export default useValidation;
