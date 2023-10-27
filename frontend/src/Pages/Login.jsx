import logo from "../assets/shadow_logo.png";
import { Link } from "react-router-dom";
import { PiCopyrightThin } from "react-icons/pi";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useState } from "react";
import BackgroundSection from '../Component/BackgroundSection';

function Login() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailalert, setEmailalert] = useState(false);
  const [passalert, setPassalert] = useState(false);

  const handleSubmit = () => {
    alert("this is nothing about say here as well")
    console.log(email, password)
    if (email.trim.length == 0) {
      setEmailalert(true)
    }
    else if (password.trim.length == 0) {
      setPassalert(true);
    }
  }


return (
  <BackgroundSection>
    <section className="text-gray-600 body-font pt-[10%]">
      <div className="container px-5 mx-auto items-center flex flex-col">
        <img src={logo} alt="brand" className="w-[450px] h-[150px]" />
        <form className="w-[400px] bg-white rounded-lg p-8 flex flex-col md:ml-auto mt-10 mx-auto md:mt-0 shadow-md">
          <h2 className="text-gray-700 text-3xl font-bold title-font mb-5 mx-auto"
          >
            Welcome back
          </h2>
          <div className="relative mb-4">
            <label className="text-sm font-bold text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 mt-2 leading-8 transition-colors duration-200 ease-in-out"
              placeholder={emailalert == true ? <span className="text-red-500">Please Fill email</span> : "Email"}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="relative mb-4">
            <label className="text-sm font-bold text-gray-700">
              Password
            </label>
            <div className="w-full bg-white rounded border border-gray-300 text-base outline-none text-gray-700 py-1 px-3 mt-2 leading-8 transition-colors duration-200 ease-in-out">
              <input
                type={passwordVisible ? "text" : "password"}
                id="password"
                name="password"
                value={password}
                placeholder={passalert == true ? <span className="text-red-500">Please Fill email</span> : "Password"}
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

          <label className="relative inline-flex items-center cursor-pointer mb-5">
            <input type="checkbox" value="" className="sr-only peer" />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-400 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            <span className="ml-3 text-sm font-medium text-gray-500">
              Remember me
            </span>
          </label>

          <button onSubmit={handleSubmit} className="text-white bg-blue-500 border-0 py-2 mt-3 px-8 focus:outline-none hover:bg-blue-400 rounded-md text-lg">
            Sign in
          </button>
          <p className="text-sm font-medium text-gray-500 mt-5 mx-auto large-text">
            Don't have an account? <Link to="/signUp" className="text-green-500 font-semibold">Sign Up</Link>
          </p>
          <p className="text-sm font-medium text-gray-500 mt-3 mb-5 mx-auto">
            Forgot your password? Reset
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

export default Login;
