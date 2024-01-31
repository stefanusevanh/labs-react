import { useEffect, useState } from "react";
import {
  isAllFieldFilled,
  isFormFieldEmpty,
} from "../../utils/formFieldValidation";
import { isEmailValid } from "../../utils/isEmailValid";
import { H1 } from "../../components/Heading";
import { Form, FormInput } from "../../components/Form";
import { isPasswordValid } from "../../utils/isPasswordValid";
import Button from "../../components/Button";
import NavLinkStyled from "../../styles/NavLinkStyled";
import { setCookie } from "../../utils/cookies";
import { LoadingText } from "../../components/Loading/LoadingText";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../config";
import { useFetch } from "../../hooks/useFetch";
import { IUserDataResponse } from "../../types/api";
import { toast } from "sonner";

const LogIn = () => {
  const navigatePage = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [registeredUser, setRegisteredUser] = useState<IUserDataResponse>();
  const {
    data: userData,
    isLoading,
    fetchData,
  } = useFetch<IUserDataResponse[]>();

  const [isTogglePasswordClicked, setIsTogglePasswordClicked] = useState(false);
  useState(false);
  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const [isButtonFirstClicked, setIsButtonFirstClicked] = useState(false);

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
        break;
      case "password":
        if (isFormFieldEmpty(password)) {
          return "Please input password";
        }
        if (!isPasswordValid(password))
          return "Password must be 8 characters long or more";
        break;
    }
    if (registeredUser === undefined) {
      return "Invalid email or password";
    }

    return "This error is not shown";
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      isAllFieldFilled([email, password]) &&
      isEmailValid(email) &&
      isPasswordValid(password)
    ) {
      const url = `${API_URL}/users`;
      const options = {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      };
      fetchData(url, options);
      return;
    }
  };

  useEffect(() => {
    setRegisteredUser(
      userData?.find(
        (item) => item.email === email && item.password === password
      )
    );
  }, [userData, isLoading]);

  useEffect(() => {
    if (!isLoading && registeredUser !== undefined) {
      setCookie("token", registeredUser.token, 1);
      toast.loading("Loading ...", {
        duration: 1000,
        onAutoClose: () => {
          toast.success(`Log in successful. Welome, ${registeredUser.name}! `, {
            duration: 2000,
          });
        },
      });
      setTimeout(() => {
        navigatePage("/product");
      }, 1200);
      return;
    }
  }, [registeredUser, isLoading]);

  useEffect(() => {
    //to set off the error "Invalid email or password" after the user changes the email or password
    setIsButtonFirstClicked(false);
  }, [email, password]);

  return (
    <>
      <Form onSubmit={handleFormSubmit} formnovalidate>
        <H1>Log In</H1>
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
            (registeredUser === undefined && !isLoading && isButtonFirstClicked)
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
            (!isPasswordValid(password) && !isFormFieldEmpty(password)) ||
            (registeredUser === undefined && !isLoading && isButtonFirstClicked)
          }
          iconURL="/src/assets/img/invisibletoggle.svg"
          iconOnClick={() => setIsTogglePasswordClicked(true)}
          iconNotClicked={() => setIsTogglePasswordClicked(false)}
        />

        <div style={{ marginTop: "1rem" }}>
          <Button
            buttonText="Log In"
            type="submit"
            onClick={() => {
              setIsButtonClicked(true);
              setIsButtonFirstClicked(true);
            }}
          />
          {<LoadingText $isError={isLoading}>Loading ...</LoadingText>}
        </div>
      </Form>
      <p>
        Don't have an account?{" "}
        <NavLinkStyled to="/auth/signup">Sign Up here</NavLinkStyled>
      </p>
    </>
  );
};

export default LogIn;
