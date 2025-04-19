import React, { useState, useEffect, useContext } from "react";
import { Formik, Form } from "formik";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import * as Yup from "yup";
import FormInput from "./FormInput";
import FormSelect from "./FormSelect";
import FormCheckbox from "./FormCheckbox";
import { useAuth } from "../../hooks/useAuth";
import { AdoptionContext } from "../../context/AdoptionContext";

//import { PetDetails } from "../components/pages/PetDetails";
//import { useAdoptions } from "../../context/AdoptionContext";
//import Adoption from "../../../../server/models/Adoption";

const validationSchema = Yup.object({
  motive: Yup.string()
    .oneOf(["adoption"], "Por favor seleciosne um motivo para contacto")
    .required("Motive is required"),

  userName: Yup.string(),
  animalName: Yup.string(),
  shelterName: Yup.string(),
  phone: Yup.string(),

  streetAddress: Yup.string().when("motive", {
    is: "adoption",
    then: (schema) =>
      schema.required("Para adoção é necessário um endereço válido"),
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

const AdoptionForm = ({ pet }) => {
  const navigate = useNavigate();

  // Fetch user information from Auth Context
  const { user } = useAuth();

  const initialValues = {
    motivo: "",
    userId: user?.id || "",
    animalId: pet?.id || "",
    shelterId: pet?.shelterId || "",
    email: user?.email || "",
    userName: user?.name || "",
    animalName: pet?.name || "",
    shelterName: pet?.shelter || "",
    phone: user?.phone || "",
    message: "",
  };

  const prepareAdoptionFormData = (values) => {
    if (values.motivo === "adoption") {
      return {
        motivo: values.motivo,
        userName: values.userName,
        animalName: values.animalName,
        shelterName: values.shelterName,
        phoneNumber: values.phoneNumber,
        streetAddress: values.streetAddress,
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
          const formData = prepareAdoptionFormData(values);

          //-----------------------Up to here ---------------------------//

          // Call the appropriate registration endpoint
          await registerAdoption(formData, values.motivo);
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
          <FormSelect label="Purpose" name="motivo">
            <option value="">Selecione o seu motivo:</option>
            <option value="adoption">Adoção</option>
            {/* <option value="shelter">Shelter</option> */}
          </FormSelect>

          <FormInput
            label="Nome Completo"
            name="userName"
            type="text"
            placeholder="Insira o seu nome"
          />
          <FormInput
            label="Email"
            name="email"
            type="email"
            placeholder="Insira o seu email"
          />
          <FormInput
            label="Nome do animal:"
            name="animalName"
            type="text"
            placeholder="Nome do animal:"
          />
          <FormInput
            label="Abrigo"
            name="shelterName"
            type="text"
            placeholder="Nome do abrigo"
          />

          <FormInput
            label="Endereço"
            name="streetAddress"
            type="text"
            placeholder="Digite o seu endereço"
          />

          <FormInput
            label="Contacto Telefónico"
            name="phone"
            type="text"
            placeholder="Insira o seu contacto"
          />

          <FormInput
            label="Mensagem"
            name="mensagem"
            type="text"
            placeholder="Insira o corpo do seu pedido"
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
            {isSubmitting ? "A enviar..." : "Enviar pedido!"}
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default AdoptionForm;
