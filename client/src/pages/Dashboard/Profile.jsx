// src/pages/Dashboard/Profile.jsx
import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import FormInput from "../../components/forms/FormInput";
import { useAuth } from "../../hooks/useAuth";

const Profile = () => {
  const { user, updateProfile } = useAuth();

  const validationSchema = Yup.object({
    fullName: Yup.string()
      .min(2, "Your name must be between 2 and 120 characters long")
      .max(120, "Your name must be between 2 and 120 characters long")
      .required("Name is required"),
    email: Yup.string()
      .email("Please enter a valid email address.")
      .required("Email is required"),
    phone: Yup.string(),
    streetAddress: Yup.string(),
    city: Yup.string(),
    state: Yup.string(),
    zipCode: Yup.string(),
  });

  const initialValues = {
    fullName: user?.fullName || "",
    email: user?.email || "",
    phone: user?.phone || "",
    streetAddress: user?.streetAddress || "",
    city: user?.city || "",
    state: user?.state || "",
    zipCode: user?.zipCode || "",
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">Profile</h1>
      <Formik
        initialValues={initialValues}
        enableReinitialize={true}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting, setStatus }) => {
          setStatus({ error: null, success: null });
          updateProfile(values)
            .then(() => {
              console.log(values);
              setStatus({ success: "Profile updated successfully!" });
            })
            .catch((error) => {
              setStatus({ error: error.message });
            })
            .finally(() => {
              setSubmitting(false);
            });
        }}
      >
        {({ isSubmitting, status, setStatus }) => (
          <Form className="max-w-lg mx-auto bg-white p-6 shadow rounded">
            {status?.error && (
              <div className="mb-4 text-center text-red-600">
                {status.error}
              </div>
            )}
            {status?.success && (
              <div className="mb-4 text-center text-green-600">
                {status.success}
              </div>
            )}
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
              placeholder="Enter your email"
            />
            <FormInput
              label="Phone Number (Optional)"
              name="phone"
              type="text"
              placeholder="Enter your phone number"
            />
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
            <button
              type="submit"
              disabled={isSubmitting}
              onClick={() => setStatus({ submitted: true })}
              className="mt-4 block w-full py-3 bg-amber-500 text-blue-950 font-bold rounded-md hover:bg-amber-600 transition duration-200"
            >
              {isSubmitting ? "Updating..." : "Update Profile"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Profile;
