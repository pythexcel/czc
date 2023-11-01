import { Formik } from "formik";
import { useNavigate } from "react-router-dom";
import { PiCopyrightThin } from "react-icons/pi";
import axiosInstance from "../utils/axios";
import { useState } from "react";
import Modal from "../Component/Modal";

function ForgetPassword() {
  const [resetSuccess, setResetSuccess] = useState(false);
  const navigate = useNavigate();

  const handleForgetPassword = async (values) => {
    try {
      const response = await axiosInstance.post("forget-password/", {
        username: values.email,
      });
      setResetSuccess(true);
      console.log("forget successful:", response);
    } catch (error) {
      console.error("Error during signup:", error);
      setResetSuccess(false);
    }
  };
 
  return (
    <div className="bg-cover bg-no-repeat h-[65vh] bg-[#7A7B7E]">
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
                  <label className="text-sm font-bold text-black-700 font-bold">
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

                <button
                  type="submit"
                  className="text-white bg-blue-500 border-0 py-2 mt-3 px-8 focus:outline-none hover:bg-green-600 rounded-md text-lg"
                >
                  Send Link
                </button>

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
      {resetSuccess && (
        <Modal />
      )}
    </div>
  );
}

export default ForgetPassword;
