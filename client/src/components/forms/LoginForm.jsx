// LoginForm.jsx
import React from "react";
import { Formik, Form } from "formik";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import FormInput from "./FormInput";
import FormCheckbox from "./FormCheckbox";

// Define initial values for the form.
const initialValues = {
  username: "",
  password: "",
  remember: false,
};

// Define the validation schema.
const validationSchema = Yup.object({
  username: Yup.string().required("Username is required"),
  password: Yup.string().required("Password is required"),
  remember: Yup.boolean(),
});

const LoginForm = () => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting }) => {
        console.log("Logging in with:", values);
        setSubmitting(false);
      }}
    >
      {({ isSubmitting, status, setStatus }) => (
        <Form className="bg-white max-w-lg w-full mx-auto shadow-lg rounded-md p-4 sm:p-10">
          <h2 className="text-2xl font-bold text-center mb-6">Log In</h2>
          <FormInput
            minimal={true}
            showValidation={status?.submitted}
            label="Username"
            name="username"
            type="text"
            placeholder="Enter your username"
          />
          <FormInput
            minimal={true}
            showValidation={status?.submitted}
            label="Password"
            name="password"
            type="password"
            placeholder="Enter your password"
          />
          <div className="text-right mb-4">
            <Link to="/forgot" className="text-sm text-blue-600 underline">
              Forgot your username or password?
            </Link>
          </div>
          <FormCheckbox label="Remember me for 2 weeks" name="remember" />
          <button
            type="submit"
            onClick={() => setStatus({ submitted: true })}
            disabled={isSubmitting}
            className=" mx-auto block py-4 px-12 font-bold bg-amber-500 opacity-80 text-lg text-blue-950 rounded-md hover:opacity-100 focus:outline-none mt-4 cursor-pointer"
          >
            Log In
          </button>
          <div className="mt-4 text-center text-sm">
            Don’t have an account?{" "}
            <Link to="/sign_up" className="text-blue-600 underline">
              Sign up
            </Link>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;
