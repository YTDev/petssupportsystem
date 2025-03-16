// src/pages/Dashboard/Profile.jsx
import React, { useState, useEffect } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import FormInput from "../../components/forms/FormInput";
import { useAuth } from "../../hooks/useAuth";

const Profile = () => {
  const { user, updateProfile } = useAuth();
  const [userType, setUserType] = useState("adopter"); // Default to adopter

  // Determine user type when component mounts
  useEffect(() => {
    if (user) {
      // Check if user is a shelter by looking for shelter-specific fields
      setUserType(user.shelterName ? "shelter" : "adopter");
    }
  }, [user]);

  // Define validation schema based on user type
  const validationSchema = Yup.object({
    // Common fields
    email: Yup.string()
      .email("Please enter a valid email address.")
      .required("Email is required"),
    phoneNumber: Yup.string(),

    // User-specific fields
    name: userType === "adopter" ? Yup.string()
      .min(2, "Your name must be between 2 and 120 characters long")
      .max(120, "Your name must be between 2 and 120 characters long")
      .required("Name is required") : Yup.string(),
    
    // Shelter-specific fields
    shelterName: userType === "shelter" ? Yup.string()
      .min(2, "Shelter name must be between 2 and 120 characters long")
      .max(120, "Shelter name must be between 2 and 120 characters long")
      .required("Shelter name is required") : Yup.string(),
    
    // Common address field
    address: Yup.string(),
  });

  // Initialize form values based on user type and existing data
  const getInitialValues = () => {
    if (!user) return {};

    if (userType === "adopter") {
      return {
        name: user.name || "",
        email: user.email || "",
        phoneNumber: user.phoneNumber || "",
        address: user.address || ""
      };
    } else {
      return {
        shelterName: user.shelterName || "",
        email: user.email || "",
        phoneNumber: user.phoneNumber || "",
        address: user.address || ""
      };
    }
  };

  const initialValues = getInitialValues();

  // Prepare data for the API based on user type
  const prepareFormData = (values) => {
    // Remove any empty fields
    const formData = {};
    Object.keys(values).forEach(key => {
      if (values[key]) {
        formData[key] = values[key];
      }
    });
    
    return formData;
  };

  if (!user) {
    return <div className="p-4">Loading profile...</div>;
  }

  return (
    <div className="p-4 relative z-0">
      <h1 className="text-3xl font-bold mb-4">Profile</h1>
      <Formik
        initialValues={initialValues}
        enableReinitialize={true}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting, setStatus }) => {
          setStatus({ error: null, success: null });
          
          try {
            // Prepare data for the API
            const formData = prepareFormData(values);
            
            // Call the updateProfile function
            await updateProfile(formData);
            setStatus({ success: "Profile updated successfully!" });
          } catch (error) {
            console.error("Profile update error:", error);
            setStatus({ 
              error: error.message || "Failed to update profile. Please try again."
            });
          } finally {
            setSubmitting(false);
          }
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

            {/* User type indicator */}
            <div className="mb-4 pb-2 border-b border-gray-200">
              <p className="text-gray-600">
                Account type: <span className="font-semibold capitalize">{userType}</span>
              </p>
            </div>
            
            {/* Render different fields based on user type */}
            {userType === "adopter" ? (
              <FormInput
                label="Full Name"
                name="name"
                type="text"
                placeholder="Enter your full name"
              />
            ) : (
              <FormInput
                label="Shelter Name"
                name="shelterName"
                type="text"
                placeholder="Enter shelter name"
              />
            )}
            
            {/* Common fields */}
            <FormInput
              label="Email Address"
              name="email"
              type="email"
              placeholder="Enter your email"
            />
            
            <FormInput
              label="Phone Number"
              name="phoneNumber"
              type="text"
              placeholder="Enter your phone number"
            />
            
            <FormInput
              label="Address"
              name="address"
              type="text"
              placeholder="Enter your address"
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