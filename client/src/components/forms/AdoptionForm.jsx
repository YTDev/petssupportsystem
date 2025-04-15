import React from "react";
import { Formik, Form } from "formik";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import * as Yup from "yup";
import FormInput from "./FormInput";
import FormSelect from "./FormSelect";
import FormCheckbox from "./FormCheckbox";
import { useAuth } from "../../hooks/useAuth";
//import { PetDetails } from "../components/pages/PetDetails";
import { AdoptionContext } from "../../context/AdoptionContext";
//import Adoption from "../../../../server/models/Adoption";

// Fetch user information from Auth Context
const { user } = useAuth();

// Fetch pet context from adoption

const { pet } = AdoptionContext();

const validationSchema = Yup.object({
  motive: Yup.string()
    .oneOf(
      ["question", "adoption"],
      "Por favor selecione um motivo para contacto"
    )
    .required("Motive is required"),

  userName: Yup.string(),
  animalName: Yup.string(),
  phone: Yup.string(),

  cc: Yup.string()
    .min(9, "O número de Cartão de Cidadão necessita de ter 9 digitos")
    .max(9, "O número de cartão de cidadão necessita de ter 9 dígitos"),
  streetAddress: Yup.string().when("motive", {
    is: "adoption",
    then: (schema) =>
      schema.required("Para adoção é necessário um endereço válido"),
    otherwise: (schema) => schema.notRequired(),
  }),
  city: Yup.string().when("motive", {
    is: "adoption",
    then: (schema) =>
      schema.required("Para adoção é necessário uma cidade válida"),
    otherwise: (schema) => schema.notRequired(),
  }),
  zipCode: Yup.string().when("motive", {
    is: "adoption",
    then: (schema) =>
      schema.required("Para adoção é necessário um código-postal válido"),
    otherwise: (schema) => schema.notRequired(),
  }),
  message: Yup.string()
    .min(
      100,
      "Por favor insira uma breve mensagem a referir o que predende comunicar ao abrigo (Motivo)"
    )
    .max(1200, "A sua mensagem tem um limite máximo de 1200 caratéres"),
  email: Yup.string(),
});

const initialValues = {
  motivo: "",
  email: user.email || "",
  userName: user.name || "",
  userID: user.id || "",
  phoneNumber: user.phone || "",
  animalName: "",
  cc: "",
  streetAddress: user.address || "",
  city: "",
  zipCode: "",
  message: "",
};

const AdoptionForm = () => {
  const navigate = useNavigate();

  const prepareAdotpionFormData = (values) => {
    if (values.motivo === "adoption") {
      return {
        motivo: values.motivo,
        userNome: values.userNome,
        phoneNumber: values.phoneNumber,
        streetAddress: values.streetAddress,
        cc: values.cc,
        city: values.city,
        zipCode: values.zipCode,
        message: values.message,
      };
    } else {
      return {
        motivo: values.motivo,
        userNome: values.userNome,
        phoneNumber: values.phoneNumber,
        message: values.message,
      };
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      validateOnBlur={true}
      validateOnChange={false}
      onSubmit={async (values, { setSubmitting, setStatus }) => {
        setStatus({ error: null });

        try {
          // Prepare the data for API based on role
          const formData = prepareFormData(values);

          //-----------------------Up to here ---------------------------//

          // Call the appropriate registration endpoint
          await register(formData, values.motivo);
          console.log("Registration successful");
          navigate("/dashboard");
        } catch (error) {
          console.error("Registration error:", error);
          setStatus({
            error: error.message || "Registration failed. Please try again.",
          });
        } finally {
          setSubmitting(false);
        }
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
            {/* <option value="shelter">Shelter</option> */}
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
                label="Street Address (Required)"
                name="streetAddress"
                type="text"
                placeholder="Enter your street address"
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
            </>
          )}

          <FormInput
            label="Phone Number (Required)"
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

export default AdoptionForm;
