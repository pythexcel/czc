import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { PiCopyrightThin } from "react-icons/pi";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import shadowLogo from "../assets/shadow_logo.png";
import BackgroundSection from "../Component/BackgroundSection";
import axiosInstance from "../utils/axios";

function SignUp() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [issignup, setIsSignUp] = useState(false);
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post("api/signup/", {
        email: email,
        password: password,
      });
      setIsSignUp(true);
      navigate("/")
      console.log("Signup successful:", response);
    } catch (error) {
      setIsSignUp(false);
      console.error("Error during signup:", error);
    }
  };

  return (
    <BackgroundSection>
      <section className="text-gray-600 body-font pt-[13%]">
        <div className="container px-5 mx-auto items-center flex flex-col">
          <img src={shadowLogo} alt="brand" className="w-[450px] h-[150px]" />
          <form
            onSubmit={handleSignUp}
            className="w-[400px] bg-white rounded-lg p-8 flex flex-col md:ml-auto mt-10 mx-auto md:mt-0 shadow-md"
          >
            <h2 className="text-gray-700 text-3xl font-bold title-font mb-2 mx-auto">
              Welcome!
            </h2>
            <p className="text-gray-700 text-2xl font-semibold mx-auto mb-4">
              Register with us
            </p>
            {issignup && (
              <div>
                <h6 className="font-bold flex justify-center ">
                  SignUp Successful!{" "}
                  <span
                    className="text-blue-300 cursor-pointer"
                    onClick={() => navigate("/")}
                  >
                    Login here
                  </span>
                </h6>
              </div>
            )}
            <div className="relative mb-4">
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 mt-2 leading-8 transition-colors duration-200 ease-in-out"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="relative mb-4">
              <div className="w-full bg-white rounded border border-gray-300 text-base outline-none text-gray-700 py-1 px-3 mt-2 leading-8 transition-colors duration-200 ease-in-out">
                <input
                  type={passwordVisible ? "text" : "password"}
                  id="password"
                  name="password"
                  value={password}
                  placeholder="Password"
                  className="outline-none"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <span
                  className="cursor-pointer float-right mr-2 mt-2 z-40"
                  onClick={() => setPasswordVisible(!passwordVisible)}
                >
                  {passwordVisible ? (
                    <AiOutlineEye />
                  ) : (
                    <AiOutlineEyeInvisible />
                  )}
                </span>
              </div>
            </div>

            <div className="flex items-center">
              <input
                id="link-checkbox"
                type="checkbox"
                value=""
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <label className="ml-2 text-sm font-medium text-gray-700">
                I agree with the{" "}
                <a href="#" className="text-gray-800 font-bold">
                  Terms and Conditions
                </a>
                .
              </label>
            </div>

            <button
              type="submit"
              className="text-white bg-gray-500 border-0 py-2 mt-3 px-8 focus:outline-none hover:bg-blue-500 rounded-md text-lg"
            >
              Sign Up
            </button>
            <p className="text-sm font-medium text-gray-500 mt-5 large-text">
              Already have an account?
              <Link to="/" className="text-green-500 font-semibold">
                Sign in
              </Link>
            </p>
          </form>
          <p className="text-md font-medium text-gray-500 mt-10 mx-auto">
            Terms & Conditions
          </p>
          <p className="text-md font-medium text-gray-500 mt-8 mx-auto flex items-center">
            Copyright <PiCopyrightThin className="mx-1" /> 2023 ZappyChat
          </p>
        </div>
      </section>
    </BackgroundSection>
  );
}

export default SignUp;