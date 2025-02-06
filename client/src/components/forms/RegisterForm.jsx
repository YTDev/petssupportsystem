import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import TextInput from "./TextInput";

const validationSchema = Yup.object({
  fullName: Yup.string()
    .min(3, "Full name must be at least 3 characters")
    .required("Full name is required"),
});

function RegisterForm() {
  return (
    <Formik
      initialValues={{ fullName: "" }}
      validationSchema={validationSchema}
      onSubmit={(values) => console.log("Form submitted:", values)}
    >
      {({ handleSubmit }) => (
        <Form
          onSubmit={handleSubmit}
          className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg"
        >
          <h2 className="text-xl font-bold mb-4">Test Form</h2>

          <TextInput />

          <button
            type="submit"
            className="mt-4 bg-blue-500 text-white py-2 px-4 rounded"
          >
            Submit
          </button>
        </Form>
      )}
    </Formik>
  );
}

export default RegisterForm;
