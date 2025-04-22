import React, { useState, useEffect, useContext } from "react";
import { Formik, Form } from "formik";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import FormInput from "./FormInput";
import FormSelect from "./FormSelect";
import FormCheckbox from "./FormCheckbox";
import { useAuth } from "../../hooks/useAuth";
import { useAdoptions } from "../../context/AdoptionContext";

const validationSchema = Yup.object({
  motive: Yup.string().oneOf(
    ["adoption"],
    "Por favor selecione um motivo para contacto"
  ),
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
      "Por favor insira uma breve mensagem a referir o que pretende comunicar ao abrigo (Motivo)"
    )
    .max(1200, "A sua mensagem tem um limite máximo de 1200 caracteres"),
  email: Yup.string(),
  terms: Yup.boolean().oneOf([true], "Deve aceitar os termos e condições"),
});

const AdoptionForm = ({ pet }) => {
  const navigate = useNavigate();
  const { registerAdoption } = useAdoptions();
  // Fetch user information from Auth Context
  const { user } = useAuth();

  const initialValues = {
    motivo: "",
    userId: user?.userID || "",
    animalId: pet?.id || "",
    shelterId: pet?.shelter || "",
    email: user?.email || "",
    userName: user?.name || "",
    animalName: pet?.name || "",
    shelterName: pet?.shelter || "",
    streetAddress: user.address || "",
    phone: user?.phoneNumber || "",
    message: "",
    terms: false,
  };

  const prepareAdoptionFormData = (values) => {
    if (values.motivo === "adoption") {
      return {
        userID: user.userID,
        animalID: pet.id,
        shelterID: 1,
        userName: values.userName,
        animalName: values.animalName,
        shelterName: values.shelterName,
        email: user.email,
        phoneNumber: values.phone,
        address: values.streetAddress,
        message: values.message,
      };
      console.log("Values data:", user.email);
    } else {
      return {
        motivo: values.motivo,
        userName: values.userName,
        phoneNumber: values.phone,
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
        console.log("Form submitted!", values);
        setStatus({ error: null });
        try {
          console.log("Entered the first function!");
          const formData = prepareAdoptionFormData(values);
          console.log("Prepared formData:", formData);
          await registerAdoption(formData, values.motivo);
          console.log("Registration successful");
          navigate("/dashboard");
        } catch (error) {
          console.error("Error during registration:", error);
          setStatus({ error: error.message || "Registration failed" });
        } finally {
          setSubmitting(false);
        }
      }}
    >
      {({ isSubmitting, status, setStatus }) => (
        <Form className="bg-white max-w-lg w-full mx-auto shadow-lg rounded-md p-4 sm:p-10">
          {status?.error && (
            <div className="mb-4 text-center text-red-600">{status.error}</div>
          )}
          <h2 className="text-2xl font-bold text-center mb-6">
            Registo de Interesse
          </h2>
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
            name="message"
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
