import Appbar2 from "../components/Appbar2";
import { BottomWarning } from "../components/BottomWarning";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Signin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSignin = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/v1/user/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token); // Store JWT in localStorage
        navigate("/dashboard"); // Redirect to dashboard or another protected page
      } else {
        setErrorMessage(data.message || "Sign-in failed. Please try again.");
      }
    } catch (error) {
      console.error("Error during sign-in:", error);
      setErrorMessage("An error occurred during sign-in. Please try again.");
    }
  };

  return (
    <>
    <Appbar2/>
      <div className="bg-slate-300 h-screen flex justify-center">
        <div className="flex flex-col justify-center">
          <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
            <Heading label={"Sign in"} />
            <SubHeading
              label={"Enter your credentials to access your account"}
            />
            <InputBox
              placeholder="youremail@gmail.com"
              label={"Email"}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <InputBox
              placeholder="Enter your password"
              label={"Password"}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {errorMessage && <p className="text-red-500">{errorMessage}</p>}
            <div className="pt-4">
              <Button label={"Sign in"} onClick={handleSignin} />
            </div>
            <BottomWarning
              label={"Don't have an account?"}
              buttonText={"Sign up"}
              to={"/signup"}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Signin;
