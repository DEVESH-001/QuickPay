import { useState } from "react";
import { BottomWarning } from "../components/BottomWarning";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Appbar2 from "../components/Appbar2";

export const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  return (
    <>
      <Appbar2 />
      <p className="text-sm font-light  flex items-center justify-center text-red-700 ">
        Get Radom Amount after SignUp, and try to transfer money{" "}
      </p>
      <div className="bg-slate-300 h-screen flex justify-center">
        <div className="flex flex-col justify-center">
          <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
            <Heading label={"Sign up"} />
            <SubHeading label={"Enter your information to create an account"} />
            <InputBox
              value={firstName} // Pass the value here
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="Devesh"
              label={"First Name"}
            />
            <InputBox
              value={lastName} // Pass the value here
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Yadav"
              label={"Last Name"}
            />
            <InputBox
              value={username} // Pass the value here
              onChange={(e) => setUsername(e.target.value)}
              placeholder="yourEmail@gmail.com"
              label={"Email"}
            />
            {/* <InputBox
            value={password} // Pass the value here
            onChange={(e) => setPassword(e.target.value)}
            placeholder="123456"
            label={"Password"}
          /> */}
            <h2 className="flex">Password</h2>
            <input
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              className="w-full px-2 py-1 border rounded border-slate-200"
              type="password"
              placeholder="Enter Your Password"
              label={"Password"}
            />
            <div className="pt-4">
              <Button
                onClick={async () => {
                  const response = await axios.post(
                    "http://localhost:3000/api/v1/user/signup",
                    {
                      username,
                      firstName,
                      lastName,
                      password,
                    }
                  );
                  localStorage.setItem("token", response.data.token);
                  navigate("/dashboard");
                  //localStorage.removeItem("token"); add this line later
                }}
                label={"Sign up"}
              />
            </div>
            <BottomWarning
              label={"Already have an account?"}
              buttonText={"Sign in"}
              to={"/signin"}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;