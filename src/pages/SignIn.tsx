import { faLock, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import Button from "components/UI-kit/Buttons/Button";
import Input from "components/UI-kit/Input/Input";
import ButtonLoader from "components/UI-kit/Loaders/ButtonLoader";
import { useAppDispatch, useAppSelector } from "hooks/redux";
import useValidation from "hooks/useValidation/useValidation";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { login } from "redux/slices/userSlice";
import s from "styles/authentication.module.scss";

const formInputs = [
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
];

function SignIn() {
  const dispatch = useAppDispatch();
  const messages = useAppSelector((state) => state.messages.showSnackbar);
  const loader = useAppSelector((state) => state.messages.showLoader);
  const [error, setError] = useState(false);
  const { runCheck, isCheckError, checkValidate, isNoError, formFields } =
    useValidation();

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    runCheck();
  };

  useEffect(() => {
    if (isNoError) {
      setIsLoading(true);
      dispatch(
        login({
          email: formFields.email,
          password: formFields.password,
        })
      );
    }

    if (error) setIsLoading(false);
  }, [isNoError, loader, error]);

  useEffect(() => {
    const foundError = messages.filter(
      (err) =>
        err.message.includes("User not found") ||
        err.message.includes("Invalid password")
    );
    !!foundError.length ? setError(true) : setError(false);
  }, [messages]);

  return (
    <div className={s.backdrop}>
      <div className={s.formWrapper}>
        <h2>Login</h2>

        <form onSubmit={handleSubmit}>
          {formInputs.map((input, index) => (
            <Input
              placeholder={input.placeholder}
              type={input.type}
              icon={input.icon}
              isCheckError={isCheckError}
              checkValidate={checkValidate}
              validation={input.validation}
              error={error}
              key={index}
            />
          ))}

          <Button error={error} variant="contained" size="medium" typeSubmit>
            {isLoading ? <ButtonLoader /> : "Sing in"}
          </Button>
        </form>
        <p>
          You don't have an account? <Link to="/sign-up">Register</Link>
        </p>
      </div>
    </div>
  );
}

export default SignIn;
