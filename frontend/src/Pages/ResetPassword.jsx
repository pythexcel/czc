import { Formik } from "formik";
import { useLocation, useNavigate } from "react-router-dom";
import { PiCopyrightThin } from "react-icons/pi";
import axiosInstance from "../utils/axios";
import { useEffect, useState } from "react";

function ResetPassword() {
  const { search } = useLocation();
  const navigate = useNavigate();
  const [istoken, setIsToken] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(search);
    const myParam = params.get("token");
    setIsToken(myParam);
  }, [search]);
  const handleResetPassword= async (values) => {
    try {
      const response = await axiosInstance.post(
        `reset-password?token=${istoken}`,
        {
          new_password: values.enter_password,
          confirm_password: values.password,
        }
      );
      navigate("/");
      console.log("Signin successful:", response);
    } catch (error) {
      console.error("Error during signup:", error);
    }
  };

  return (
    <div className="bg-cover bg-no-repeat h-[65vh] bg-[#7A7B7E]">
      <Formik
        initialValues={{ enter_password: "", password: "" }}
        validate={(values) => {
          const errors = {};
          if (!values.enter_password) {
            errors.enter_password = "Required";
          }
          if (!values.password) {
            errors.password = "Required";
          }
          return errors;
        }}
        onSubmit={handleResetPassword}
      >
        {({
          values,
          // errors,
          // touched,
          handleSubmit,
          handleChange,
          // isSubmitting,
        }) => (
          <section className="text-gray-600 body-font pt-[8%]">
            <div className="container px-5 mx-auto items-center flex flex-col">
              <form
                onSubmit={handleSubmit}
                className="w-[100%] md:w-[400px] bg-white rounded-lg p-8 flex flex-col md:ml-auto mt-10 mx-auto md:mt-0 shadow-md"
              >
                <div className="mb-5">
                  <div>
                    <h2 className="text-gray-700 text-3xl font-bold title-font  mx-auto">
                      Enter New Password
                    </h2>
                    <p>Restore Access to your Account</p>
                  </div>
                </div>
                <div className="relative mb-4">
                  <label className="text-sm font-bold text-gray-700">
                    Enter Password
                  </label>
                  <input
                    className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 mt-2 leading-8 transition-colors duration-200 ease-in-out"
                    type="password"
                    id="enter_password"
                    name="enter_password"
                    value={values.email}
                    placeholder="Enter password here.."
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="relative mb-4">
                  <label className="text-sm font-bold text-gray-700">
                    Confirm Password
                  </label>
                  <div className="w-full bg-white rounded border border-gray-300 text-base outline-none text-gray-700 py-1 px-3 mt-2 leading-8 transition-colors duration-200 ease-in-out">
                    <input
                      type="password"
                      id="password"
                      autoComplete="true"
                      name="password"
                      value={values.password}
                      placeholder="Enter Confirm Password here "
                      className="outline-none"
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="text-white bg-blue-500 border-0 py-2 mt-3 px-8 focus:outline-none hover:bg-blue-400 rounded-md text-lg"
                >
                  Reset Password
                </button>
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
  );
}

export default ResetPassword;
