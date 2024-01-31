import { Form, FormInput } from "../../components/Form";
import { useEffect, useState } from "react";
import {
  isAllFieldFilled,
  isFormFieldEmpty,
} from "../../utils/formFieldValidation";
import Button from "../../components/Button";
import NavLinkStyled from "../../styles/NavLinkStyled";
import { H1 } from "../../components/Heading";

import { isNameValid } from "../../utils/isNameValid";
import { isEmailValid } from "../../utils/isEmailValid";
import { isPasswordValid } from "../../utils/isPasswordValid";
import { useNavigate } from "react-router-dom";
import { LoadingText } from "../../components/Loading/LoadingText";
import { useFetch } from "../../hooks/useFetch";
import { API_URL } from "../../config";
import { generateToken } from "../../utils/generateToken";
import { IUserDataResponse } from "../../types/api";
import { toast } from "sonner";

const SignUp = () => {
  const navigatePage = useNavigate();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { isLoading: postIsLoading, fetchData: postData } =
    useFetch<RequestInit>();
  const [registeredUser, setRegisteredUser] = useState<IUserDataResponse>();
  const {
    data: userData,
    isLoading: getIsLoading,
    fetchData: getData,
  } = useFetch<IUserDataResponse[]>();

  const [isTogglePasswordClicked, setIsTogglePasswordClicked] = useState(false);
  const [isToggleConfirmPasswordClicked, setIsToggleConfirmPasswordClicked] =
    useState(false);
  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const [isButtonFirstClicked, setIsButtonFirstClicked] = useState(false);

  const isConfirmPasswordDoesNotMatch = confirmPassword !== password;

  const handleErrorMessages = (
    inputType: "email" | "fullname" | "password" | "confirmPassword"
  ) => {
    switch (inputType) {
      case "email":
        if (isFormFieldEmpty(email)) {
          return "Please input email";
        }
        if (!isEmailValid(email)) {
          return "Wrong email format (ex: example@domain.com)";
        }
        if (registeredUser !== undefined) {
          return "Account with same email is already registered";
        }
        break;
      case "fullname":
        if (isFormFieldEmpty(fullName)) {
          return "Please enter your name";
        }
        if (!isNameValid(fullName)) {
          return "Name cannot contain any symbol or number";
        }
        break;
      case "password":
        if (isFormFieldEmpty(password)) {
          return "Please input password";
        }
        if (!isPasswordValid(password))
          return "Password must be 8 characters long or more";
        break;

      case "confirmPassword":
        if (
          (isConfirmPasswordDoesNotMatch &&
            !isFormFieldEmpty(confirmPassword)) ||
          (isFormFieldEmpty(confirmPassword) && isButtonClicked)
        ) {
          return "Password does not match";
        }
        break;
    }

    return "This error is not shown";
  };

  const isAllFieldValid =
    isAllFieldFilled([fullName, email, password, confirmPassword]) &&
    isNameValid(fullName) &&
    isEmailValid(email) &&
    isPasswordValid(password) &&
    !isConfirmPasswordDoesNotMatch;

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isAllFieldValid) {
      const url = `${API_URL}/users`;
      const options = {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      };
      getData(url, options);
      return;
    }
  };

  useEffect(() => {
    setRegisteredUser(userData?.find((item) => item.email === email));
  }, [userData]);

  useEffect(() => {
    if (registeredUser === undefined && isButtonClicked && isAllFieldValid) {
      const url = `${API_URL}/users`;
      const options = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: fullName,
          email: email,
          password: password,
          token: generateToken(),
          createdAt: new Date().toString(),
        }),
      };
      postData(url, options);
      toast.loading("Loading ...", {
        duration: 1000,
        onAutoClose: () => {
          toast.success(
            "Sign up successful. Please log in with the registered email.",
            {
              duration: 2000,
            }
          );
        },
      });
      setTimeout(() => {
        navigatePage("/auth/login");
      }, 1200);
      return;
    }
  }, [registeredUser]);

  useEffect(() => {
    //to set off the error "Invalid email or password" after the user changes the email or password
    setIsButtonFirstClicked(false);
  }, [email, password]);

  return (
    <>
      <Form onSubmit={handleFormSubmit} formnovalidate>
        <H1>Sign Up</H1>
        <FormInput
          type="text"
          placeholder="Your full name here.."
          titleText="Full Name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          errorText={handleErrorMessages("fullname")}
          isError={
            (isFormFieldEmpty(fullName) && isButtonClicked) ||
            !isNameValid(fullName)
          }
        />
        <FormInput
          type="email"
          placeholder="Your email here.."
          titleText="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          errorText={handleErrorMessages("email")}
          isError={
            (isFormFieldEmpty(email) && isButtonClicked) ||
            (!isEmailValid(email) && !isFormFieldEmpty(email)) ||
            (registeredUser !== undefined &&
              !getIsLoading &&
              isButtonFirstClicked) ||
            (registeredUser !== undefined && registeredUser.email === email)
          }
        />
        <FormInput
          type={isTogglePasswordClicked ? "text" : "password"}
          placeholder="Your password here.."
          titleText="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          errorText={handleErrorMessages("password")}
          isError={
            (isFormFieldEmpty(password) && isButtonClicked) ||
            (!isPasswordValid(password) && !isFormFieldEmpty(password))
          }
          iconURL="/src/assets/img/invisibletoggle.svg"
          iconOnClick={() => setIsTogglePasswordClicked(true)}
          iconNotClicked={() => setIsTogglePasswordClicked(false)}
        />
        <FormInput
          type={isToggleConfirmPasswordClicked ? "text" : "password"}
          placeholder="Confirmation password.."
          titleText="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          errorText={handleErrorMessages("confirmPassword")}
          isError={
            (isConfirmPasswordDoesNotMatch &&
              !isFormFieldEmpty(confirmPassword)) ||
            (isFormFieldEmpty(confirmPassword) && isButtonClicked)
          }
          iconURL="/src/assets/img/invisibletoggle.svg"
          iconOnClick={() => setIsToggleConfirmPasswordClicked(true)}
          iconNotClicked={() => setIsToggleConfirmPasswordClicked(false)}
        />
        <div style={{ marginTop: "1rem" }}>
          <Button
            buttonText="Sign Up"
            type="submit"
            onClick={() => {
              setIsButtonClicked(true);
              setIsButtonFirstClicked(true);
            }}
          />
          {
            <LoadingText $isError={getIsLoading || postIsLoading}>
              Loading ...
            </LoadingText>
          }
        </div>
      </Form>
      <p>
        Have an account?{" "}
        <NavLinkStyled to="/auth/login">Log In here</NavLinkStyled>
      </p>
    </>
  );
};

export default SignUp;
