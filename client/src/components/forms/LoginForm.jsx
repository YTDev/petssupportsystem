// LoginForm.jsx
import React from "react";
import { Formik, Form } from "formik";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import FormInput from "./FormInput";
import { useAuth } from "../../hooks/useAuth";

const initialValues = {
  email: "",
  password: "",
};

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Please enter a valid email address.")
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const LoginForm = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={async (values, { setSubmitting, setStatus }) => {
        setStatus({ error: null });
        
        try {
          // Call the login function from AuthContext that now uses real API
          await login(values.email, values.password);
          console.log("Logged in successfully");
          navigate("/dashboard");
        } catch (error) {
          console.error("Login error:", error);
          setStatus({ 
            error: error.message || "Login failed. Please check your credentials."
          });
        } finally {
          setSubmitting(false);
        }
      }}
    >
      {({ isSubmitting, status, setStatus }) => (
        <Form className="bg-white max-w-lg w-full mx-auto shadow-lg rounded-md p-4 sm:p-10">
          <h2 className="text-2xl font-bold text-center mb-6">Log In</h2>
          {status?.error && (
            <div className="mb-4 text-center text-red-600">{status.error}</div>
          )}
          <FormInput
            minimal={true}
            showValidation={status?.submitted}
            label="Email Address"
            name="email"
            type="email"
            placeholder="Enter your email"
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

          <button
            type="submit"
            onClick={() => setStatus({ submitted: true })}
            disabled={isSubmitting}
            className="mx-auto block py-4 px-12 font-bold bg-amber-500 opacity-80 text-lg text-blue-950 rounded-md hover:opacity-100 focus:outline-none mt-4 cursor-pointer"
          >
            {isSubmitting ? "Logging in..." : "Log In"}
          </button>
          <div className="mt-4 text-center text-sm">
            Don't have an account?{" "}
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