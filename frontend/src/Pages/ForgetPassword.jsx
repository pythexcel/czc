import { Formik } from "formik";
import { useNavigate } from "react-router-dom";
import { PiCopyrightThin } from "react-icons/pi";
import axiosInstance from "../utils/axios";
import ForgetPasswordimage from "../assets/reset_cover.png";
import { useState } from "react";
import ForgetPasswordModal from "../Modal/ForgetPasswordModal";


function ForgetPassword() {
  const navigate = useNavigate();
  const [isforgetpasswordsuccess, setIsForgetpasswordSuccess] = useState(false);
  const [isloadingpassword, setIsLoadingPassword] = useState(false);

  const handleForgetPassword = async (values) => {
    try {
      setIsLoadingPassword(true);
      const response = await axiosInstance.post("api/forget-password/", {
        username: values.email,
      });
      setIsLoadingPassword(false);
      setIsForgetpasswordSuccess(true);
      console.log("forget successful:", response);
    } catch (error) {
      setIsLoadingPassword(false);
      console.error("Error during signup:", error);
    }
  };

  return (
    <div>
      <div
        className="bg-cover bg-no-repeat h-[50vh]"
        style={{ backgroundImage: `url(${ForgetPasswordimage})` }}
      >   <div className="w-full h-full 
      bg-blue-600/30 backdrop-brightness-75">
          <div className="pt-[6%]">
            <h2 className="text-slate-50 text-5xl font-bold flex justify-center">
              Reset Password
            </h2>
            <p className="text-slate-50 text-2xl flex justify-center mt-2">
              {" "}
              You will recieve an email in maximum 60 seconds
            </p>
          </div>
          <Formik
            initialValues={{ email: "" }}
            validate={(values) => {
              const errors = {};
              if (!values.email) {
                errors.email = "Required";
              }
            }}
            onSubmit={handleForgetPassword}
          >
            {({
              values,
              // errors,
              // touched,
              handleSubmit,
              handleChange,
              // isSubmitting,
            }) => (
              <section className="text-gray-600 body-font pt-[2%] ">
                <div className="container px-5 mx-auto items-center flex flex-col mt-[7%]">
                  <form
                    onSubmit={handleSubmit}
                    className="w-[100%] md:w-[400px] bg-white rounded-lg p-8 flex flex-col md:ml-auto mt-10 mx-auto md:mt-0 shadow-md"
                  >
                    <div className="mb-5">
                      <div>
                        <h2 className="text-gray-700 text-3xl font-bold title-font  mx-auto">
                          Can&rsquo;t log in ?
                        </h2>
                        <p>Restore Access to your Account</p>
                      </div>
                    </div>
                    <div className="relative mb-4">
                      <label className="text-sm font-bold text-black-700">
                        We will send a Recovery link to
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={values.email}
                        className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 mt-2 leading-8 transition-colors duration-200 ease-in-out"
                        placeholder="Your e-mail"
                        onChange={handleChange}
                        required
                      />
                    </div>
                    {isloadingpassword ? (
                      <button
                        type="button"
                        className="text-white flex justify-center items-center bg-blue-500 border-0 py-2 mt-3 px-8 focus:outline-none hover:bg-blue-400 rounded-md text-lg"
                        disabled
                      >
                        <span className="flex justify-center items-center">
                          {" "}
                          Signing In....{" "}
                        </span>
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
                      </button>
                    ) : (
                      <button
                        type="submit"
                        className="text-white bg-blue-500 border-0 py-2 mt-3 px-8 focus:outline-none hover:bg-blue-400 rounded-md text-lg"
                      >
                        Sign in
                      </button>
                    )}

                    <p className="text-sm font-medium text-gray-500 mt-3 mb-5 mx-auto">
                      Back to{" "}
                      <span
                        className="text-green-600 font-semibold cursor-pointer"
                        onClick={() => navigate("/")}
                      >
                        Sign In
                      </span>
                    </p>
                  </form>
                  <p className="text-md font-medium text-gray-500 mt-5 sm:mt-10 mx-auto">
                    Terms & Conditions
                  </p>
                  <p className="text-md font-medium text-gray-500 mt-8 mx-auto flex flex-col sm:flex items-center">
                    <p className="flex">
                      {" "}
                      Copyright <PiCopyrightThin className="mx-1" /> 2023
                    </p>{" "}
                    <p> ZappyChat</p>
                  </p>
                </div>
              </section>
            )}
          </Formik>
        </div>
      </div>
      {isforgetpasswordsuccess && (
        <ForgetPasswordModal
          heading="A request has been submitted and you will get an email if you have a valid account!"
          onClose={() => setIsForgetpasswordSuccess(false)}
        />
      )}
    </div>
  );
}

export default ForgetPassword;