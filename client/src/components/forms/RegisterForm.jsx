import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import FormInput from "./FormInput";
import FormSelect from "./FormSelect";
import FormCheckbox from "./FormCheckbox";

const validationSchema = Yup.object({
  fullName: Yup.string()
    .min(2, "Your name must be between 2 and 120 characters long")
    .max(120, "Your name must be between 2 and 120 characters long")
    .required("Name is required"),
  email: Yup.string()
    .email("Please enter a valid email address. Example: john@xyzwidgets.com")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Your password must be 6 characters or longer.")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Please confirm your password"),
  role: Yup.string()
    .oneOf(["adopter", "shelter"], "Please select a valid role")
    .required("Role is required"),
  phone: Yup.string(),
  address: Yup.string(),
  terms: Yup.boolean()
    .oneOf([true], "Please accept our Terms of Service to create an account")
    .required("You must accept the terms and conditions"),
});

const initialValues = {
  fullName: "",
  email: "",
  password: "",
  confirmPassword: "",
  role: "",
  phone: "",
  address: "",
  terms: false,
};

const RegisterForm = () => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      validateOnBlur={true}
      validateOnChange={false}
      onSubmit={(values, { setSubmitting }) => {
        console.log("Submitted values:", values);
        setSubmitting(false);
      }}
    >
      {({ isSubmitting }) => (
        <Form className="bg-white max-w-lg w-full mx-auto shadow-lg rounded-md p-4 sm:p-10">
          <FormInput
            label="Full Name"
            name="fullName"
            type="text"
            placeholder="Enter your full name"
          />
          <FormInput
            label="Email Address"
            name="email"
            type="email"
            placeholder="Enter your email address"
          />
          <FormInput
            label="Password"
            name="password"
            type="password"
            placeholder="Enter your password"
          />
          <FormInput
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            placeholder="Confirm your password"
          />
          <FormSelect label="Role" name="role">
            <option value="">Select your role</option>
            <option value="adopter">Adopter</option>
            <option value="shelter">Shelter</option>
          </FormSelect>
          <FormInput
            label="Phone Number (Optional)"
            name="phone"
            type="text"
            placeholder="Enter your phone number"
          />
          <FormInput
            label="Address (Optional)"
            name="address"
            type="text"
            placeholder="Enter your address"
          />
          <FormCheckbox
            label={
              <>
                I agree to the{" "}
                <a href="/terms" className="underline ">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="/privacy" className="underline ">
                  Privacy Policy
                </a>
                .
              </>
            }
            name="terms"
          />
          <button
            type="submit"
            disabled={isSubmitting}
            className=" mx-auto block py-4 px-5 font-bold bg-amber-500 opacity-80 text-lg text-blue-950 rounded-md hover:opacity-100 focus:outline-none mt-4 cursor-pointer"
          >
            Let's get started
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default RegisterForm;
