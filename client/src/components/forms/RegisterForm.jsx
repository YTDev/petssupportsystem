import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import FormInput from "./FormInput";
import FormSelect from "./FormSelect";
import FormCheckbox from "./FormCheckbox";
import { useAuth } from "../../hooks/useAuth";
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

  streetAddress: Yup.string(),
  city: Yup.string(),
  state: Yup.string(),
  zipCode: Yup.string(),

  shelterName: Yup.string().when("role", {
    is: "shelter",
    then: (schema) => schema.required("Shelter name is required"),
    otherwise: (schema) => schema.notRequired(),
  }),
  shelterStreetAddress: Yup.string().when("role", {
    is: "shelter",
    then: (schema) => schema.required("Shelter street address is required"),
    otherwise: (schema) => schema.notRequired(),
  }),
  shelterCity: Yup.string().when("role", {
    is: "shelter",
    then: (schema) => schema.required("Shelter city is required"),
    otherwise: (schema) => schema.notRequired(),
  }),
  shelterState: Yup.string().when("role", {
    is: "shelter",
    then: (schema) => schema.required("Shelter state is required"),
    otherwise: (schema) => schema.notRequired(),
  }),
  shelterZipCode: Yup.string().when("role", {
    is: "shelter",
    then: (schema) => schema.required("Shelter zip code is required"),
    otherwise: (schema) => schema.notRequired(),
  }),
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
  streetAddress: "",
  city: "",
  state: "",
  zipCode: "",
  shelterName: "",
  shelterStreetAddress: "",
  shelterCity: "",
  shelterState: "",
  shelterZipCode: "",
  terms: false,
};

const RegisterForm = () => {
  const { register } = useAuth();
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      validateOnBlur={true}
      validateOnChange={false}
      onSubmit={(values, { setSubmitting, setStatus }) => {
        setStatus({ error: null });
        // Simulate an API call
        register(values)
          .then(() => {
            console.log("Registration successful:", values);

            navigate("/dashboard");
          })
          .catch((error) => {
            setStatus({ error: error.message });
          })
          .finally(() => {
            setSubmitting(false);
          });
      }}
    >
      {({ isSubmitting, values, status, setStatus }) => (
        <Form className="bg-white max-w-lg w-full mx-auto shadow-lg rounded-md p-4 sm:p-10">
          {status?.error && (
            <div className="mb-4 text-center text-red-600">{status.error}</div>
          )}
          <FormSelect label="Role" name="role">
            <option value="">Select your role</option>
            <option value="adopter">Adopter</option>
            <option value="shelter">Shelter</option>
          </FormSelect>

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

          {values.role === "adopter" && (
            <>
              <FormInput
                label="Street Address (Optional)"
                name="streetAddress"
                type="text"
                placeholder="Enter your street address"
              />
              <FormInput
                label="City (Optional)"
                name="city"
                type="text"
                placeholder="Enter your city"
              />
              <FormInput
                label="State (Optional)"
                name="state"
                type="text"
                placeholder="Enter your state"
              />
              <FormInput
                label="Zip Code (Optional)"
                name="zipCode"
                type="text"
                placeholder="Enter your zip code"
              />
            </>
          )}

          {values.role === "shelter" && (
            <>
              <FormInput
                label="Shelter Name"
                name="shelterName"
                type="text"
                placeholder="Enter your shelter's name"
              />
              <FormInput
                label="Shelter Street Address"
                name="shelterStreetAddress"
                type="text"
                placeholder="Enter your shelter's street address"
              />
              <FormInput
                label="Shelter City"
                name="shelterCity"
                type="text"
                placeholder="Enter your shelter's city"
              />
              <FormInput
                label="Shelter State"
                name="shelterState"
                type="text"
                placeholder="Enter your shelter's state"
              />
              <FormInput
                label="Shelter Zip Code"
                name="shelterZipCode"
                type="text"
                placeholder="Enter your shelter's zip code"
              />
            </>
          )}

          <FormInput
            label="Phone Number (Optional)"
            name="phone"
            type="text"
            placeholder="Enter your phone number"
          />

          <FormCheckbox
            label={
              <>
                I agree to the{" "}
                <a href="/terms" className="underline">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="/privacy" className="underline">
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
            className="mx-auto block py-4 px-5 font-bold bg-amber-500 opacity-80 text-lg text-blue-950 rounded-md hover:opacity-100 focus:outline-none mt-4 cursor-pointer"
          >
            {isSubmitting ? "Registering..." : "Let's get started"}
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default RegisterForm;
