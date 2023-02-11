import {
  faEnvelope,
  faLock,
  faLockOpen,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import Button from "components/UI-kit/Buttons/Button";
import FileInput from "components/UI-kit/Input/FileInput";
import Input from "components/UI-kit/Input/Input";
import { useAppDispatch, useAppSelector } from "hooks/redux";
import useValidation from "hooks/useValidation/useValidation";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { setShowSnackbar } from "redux/slices/messageSlice";
import { registration, uploadAvatar } from "redux/slices/userSlice";
import s from "styles/authentication.module.scss";

const formInputs = [
  {
    placeholder: "Name",
    type: "text",
    icon: faUser,
  },
  {
    placeholder: "Email",
    type: "email",
    icon: faEnvelope,
  },
  {
    placeholder: "Password",
    type: "password",
    icon: faLock,
    validation: {
      minLength: 4,
    },
  },
  {
    placeholder: "Confirm password",
    type: "password",
    icon: faLockOpen,
    validation: {
      minLength: 4,
    },
  },
  {
    placeholder: "avatar",
    type: "file",
    icon: faLockOpen,
  },
];

function SignUp() {
  const dispatch = useAppDispatch();
  const messages = useAppSelector((state) => state.messages.showSnackbar);

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    runCheck();

    const target = e.target as typeof e.target & {
      name: { value: string };
      email: { value: string };
      password: { value: string };
      confirmPassword: { value: string };
      file: { files: any };
    };

    const name = target.name.value.toLowerCase();
    const email = target.email.value;
    const password = target.password.value;
    const confirmPassword = target.confirmPassword.value;

    switch (false) {
      case !!name:
        dispatch(
          setShowSnackbar({
            variant: "fail",
            message: "Please enter name",
          })
        );
        break;

      case !!email:
        dispatch(
          setShowSnackbar({
            variant: "fail",
            message: "Please enter email",
          })
        );
        break;

      case !!password:
        dispatch(
          setShowSnackbar({
            variant: "fail",
            message: "Please enter password",
          })
        );
        break;

      case !!confirmPassword:
        dispatch(
          setShowSnackbar({
            variant: "fail",
            message: "Please enter a confirm to password",
          })
        );
        break;

      case password === confirmPassword:
        dispatch(
          setShowSnackbar({
            variant: "fail",
            message: "Passwords mismatch",
          })
        );
        break;
    }
  };

  const { runCheck, isCheckError, checkValidate, isNoError, formFields } =
    useValidation();

  useEffect(() => {
    async function signUp() {
      await dispatch(registration(formFields));
      await dispatch(uploadAvatar(formFields.file));
    }

    if (isNoError && formFields.password === formFields.confirmPassword) {
      signUp();
    }
  }, [isNoError]);

  const [error, setError] = useState(false);
  useEffect(() => {
    const foundError = messages.filter(
      (err) =>
        err.message.includes("User with email") ||
        err.message.includes("Please enter")
    );
    !!foundError.length ? setError(true) : setError(false);
  }, [messages]);

  return (
    <div className={s.backdrop}>
      <div className={s.formWrapper}>
        <h2>Registration</h2>
        <form onSubmit={handleSubmit}>
          {formInputs.map((input, index) => (
            <>
              {input.type === "file" ? (
                <FileInput
                  isCheckError={isCheckError}
                  checkValidate={checkValidate}
                  key={input.type}
                />
              ) : (
                <Input
                  placeholder={input.placeholder}
                  type={input.type}
                  icon={input.icon}
                  validation={input.validation}
                  isCheckError={isCheckError}
                  checkValidate={checkValidate}
                  error={error}
                  key={index}
                />
              )}
            </>
          ))}

          <Button error={error} variant="contained" size="medium" typeSubmit>
            Register
          </Button>
        </form>
        <p>
          You do have an account? <Link to="/sign-in">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default SignUp;
