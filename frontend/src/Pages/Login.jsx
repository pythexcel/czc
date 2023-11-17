import logo from "../assets/shadow_logo.png";
import { Formik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { PiCopyrightThin } from "react-icons/pi";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useState } from "react";
import BackgroundSection from "../Component/BackgroundSection";
import axiosInstance from "../utils/axios";
import Name from '../Common-Component/Name';
import Head from "../Common-Component/Head";
import AlterText from "../Common-Component/AlterText";

function Login() {
  const navigate = useNavigate();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isloading, setIsLoading] = useState(false);
  const [islogin, setIsLogin] = useState(false)
  const handleSignIn = async (values) => {
    try {
      setIsLoading(true);
      const response = await axiosInstance.post("api/signin/", {
        username: values.email,
        password: values.password,
      });
      localStorage.setItem("auth_token", response.data.access);
      navigate("/dashboard/bots");
      console.log("Signin successful:", response);
    } catch (error) {
      setIsLoading(false);
      setIsLogin(true)
      console.error("Error during signup:", error);
    }
  };


  return (
    <BackgroundSection>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validate={(values) => {
          const errors = {};
          if (!values.email) {
            errors.email = "Required";
          }
          if (!values.password) {
            errors.password = "Required";
          }
          return errors;
        }}
        onSubmit={handleSignIn}
      >
        {({
          values,
          // errors,
          // touched,
          handleSubmit,
          handleChange,
          // isSubmitting,
        }) => (
          <section className="text-gray-600 body-font pt-[10%]">
            <div className="container px-5 mx-auto items-center flex flex-col">
              <img src={logo} alt="brand" className="w-[450px] h-[150px]" />
              <form
                onSubmit={handleSubmit}
                className="w-[100%] md:w-[400px] bg-white rounded-lg p-8 flex flex-col md:ml-auto mt-10 mx-auto md:mt-0 shadow-md"
              >
                <Head>
                  Welcome back
                </Head>
                {islogin &&
                  <div>
                    <AlterText>Please enter Valid Login details</AlterText>
                  </div>
                }
                <div className="relative mb-4">
                  <Name>
                    Email
                  </Name>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={values.email}
                    className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 mt-2 leading-8 transition-colors duration-200 ease-in-out"
                    placeholder="Email"
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="relative mb-4">
                  <Name>
                    Password
                  </Name>
                  <div className="w-full bg-white rounded border border-gray-300 text-base outline-none text-gray-700 py-1 px-3 mt-2 leading-8 transition-colors duration-200 ease-in-out">
                    <input
                      type={passwordVisible ? "text" : "password"}
                      id="password"
                      autoComplete="true"
                      name="password"
                      value={values.password}
                      placeholder="Password"
                      className="outline-none"
                      onChange={handleChange}
                      required
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

                <label className="relative inline-flex items-center cursor-pointer mb-5">
                  <input type="checkbox" value="" className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-400 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                  <span className="ml-3 text-sm font-medium text-gray-500">
                    Remember me
                  </span>
                </label>
                {isloading ? (
                  <button
                    type="button"
                    className="text-white flex justify-center items-center bg-blue-500 border-0 py-2 mt-3 px-8 focus:outline-none hover:bg-blue-400 rounded-md text-lg"
                    disabled
                  >
                    <svg
                      className="mr-3 h-5 w-5 animate-spin text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    <span className="flex justify-center items-center">
                      {" "}
                      Signing In....{" "}
                    </span>
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="text-white bg-blue-500 border-0 py-2 mt-3 px-8 focus:outline-none hover:bg-blue-400 rounded-md text-lg"
                  >
                    Sign in
                  </button>
                )}
                <p className="text-sm font-medium text-gray-500 mt-5 mx-auto large-text">
                  Don&rsquo;t have an account?{" "}
                  <Link to="/signUp" className="text-green-500 font-semibold">
                    Sign Up
                  </Link>
                </p>
                <p
                  className="text-sm font-medium text-gray-500 mt-3 mb-5 mx-auto cursor-pointer"
                  onClick={() => navigate("/forgetpassword")}
                >
                  Forgot your password?
                  <span className="text-green-500"> Reset</span>
                </p>
              </form>
              <p className="text-md font-medium text-gray-500 mt-5 sm:mt-10 mx-auto">
                Terms & Conditions
              </p>
              <p className="text-md font-medium text-gray-500 mt-8 mx-auto flex flex-col sm:flex items-center">
                <p className="flex items-center">
                  {" "}
                  Copyright <PiCopyrightThin className="mx-1" /> 2023
                </p>{" "}
                <p> ZappyChat</p>
              </p>
            </div>
          </section>
        )}
      </Formik>

    </BackgroundSection>
  );
}

export default Login;