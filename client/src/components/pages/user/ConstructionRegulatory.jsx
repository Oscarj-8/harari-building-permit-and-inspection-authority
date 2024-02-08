// import { useState } from "react";
// import PropTypes from "prop-types";

// const StepOne = ({ formData, handleChange, nextStep }) => {
//   const [emailError, setEmailError] = useState("");

//   const validateEmail = (email) => {
//     const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     return regex.test(email);
//   };

//   const handleEmailChange = (e) => {
//     handleChange(e);
//     const email = e.target.value;
//     if (validateEmail(email)) {
//       setEmailError("");
//     } else {
//       setEmailError("Invalid email format");
//     }
//   };

//   return (
//     <div className="w-full flex items-start flex-col">
//       <h2 className="text-xl font-semibold mb-4">
//         Step 1: Personal Information
//       </h2>
//       <input
//         type="text"
//         name="fullName"
//         placeholder="Full Name"
//         value={formData.fullName}
//         onChange={handleChange}
//         className="border border-gray-300 rounded-md p-2 mb-4 w-full"
//       />
//       <input
//         type="email"
//         name="email"
//         placeholder="Email"
//         value={formData.email}
//         onChange={handleEmailChange}
//         className={`border border-gray-300 rounded-md p-2 mb-4 w-full ${
//           emailError && "border-red-500"
//         }`}
//       />
//       {emailError && <p className="text-red-500 mb-2 text-sm">{emailError}</p>}
//       <div className="flex justify-between">
//         <button
//           disabled={!formData.fullName || !formData.email || emailError}
//           onClick={nextStep}
//           className={`bg-slate-700 text-white p-2 rounded-md w-full ${
//             (!formData.fullName || !formData.email || emailError) &&
//             "opacity-50 cursor-not-allowed"
//           }`}
//         >
//           Next
//         </button>
//       </div>
//     </div>
//   );
// };

// StepOne.propTypes = {
//   formData: PropTypes.object.isRequired,
//   handleChange: PropTypes.func.isRequired,
//   nextStep: PropTypes.func.isRequired,
// };

// const StepTwo = ({ formData, handleChange, prevStep, handleSubmit }) => {
//   return (
//     <div>
//       <h2 className="text-xl font-semibold mb-4">Step 2: Password</h2>
//       <input
//         type="password"
//         name="password"
//         placeholder="Password"
//         value={formData.password}
//         onChange={handleChange}
//         className="border border-gray-300 rounded-md p-2 mb-4 w-full"
//       />
//       <div className="flex justify-between">
//         <button
//           onClick={prevStep}
//           className="bg-gray-500 text-white py-2 px-4 rounded-md mr-4"
//         >
//           Previous
//         </button>
//         <button
//           type="submit"
//           disabled={!formData.password}
//           onClick={handleSubmit}
//           className={`bg-blue-500 text-white py-2 px-4 rounded-md ${
//             !formData.password && "opacity-50 cursor-not-allowed"
//           }`}
//         >
//           Submit
//         </button>
//       </div>
//     </div>
//   );
// };

// StepTwo.propTypes = {
//   formData: PropTypes.object.isRequired,
//   handleChange: PropTypes.func.isRequired,
//   handleSubmit: PropTypes.func.isRequired,
//   prevStep: PropTypes.func.isRequired,
// };

// const MultiStepForm = () => {
//   const [formData, setFormData] = useState({
//     fullName: "",
//     email: "",
//     password: "",
//   });
//   const [step, setStep] = useState(1);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//   };

//   const nextStep = () => {
//     setStep((prevStep) => prevStep + 1);
//   };

//   const prevStep = () => {
//     setStep((prevStep) => prevStep - 1);
//   };

//   return (
//     <div className="flex justify-center items-center">
//       <form
//         onSubmit={handleSubmit}
//         className="bg-gray-100 p-6 rounded-lg shadow-lg mt-12"
//       >
//         {step === 1 && (
//           <StepOne
//             formData={formData}
//             handleChange={handleChange}
//             nextStep={nextStep}
//           />
//         )}
//         {step === 2 && (
//           <StepTwo
//             formData={formData}
//             handleChange={handleChange}
//             prevStep={prevStep}
//             handleSubmit={handleSubmit}
//           />
//         )}
//       </form>
//     </div>
//   );
// };

// export default MultiStepForm;

import { Formik } from "formik";
import { useState } from "react";
import PropTypes from "prop-types";
import Typography from "@mui/material/Typography";
import { useSelector } from "react-redux";
import ReusableModal from "../../Modal";
import { Button } from "@mui/material";

const ContactUs = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [step, setStep] = useState(1);
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const nextStep = () => setStep((step) => step + 1);
  const prevStep = () => setStep((step) => step - 1);

  const handleSubmit = async (values, { resetForm }) => {
    const valuesWithUsername = {
      ...values,
      username: currentUser.username,
    };

    try {
      const response = await fetch("/api/submit-construction-reg-form", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(valuesWithUsername),
      });

      if (response.ok) {
        setOpen(true);
        resetForm();
      }
    } catch (error) {
      console.error("Error submitting form data:", error);
      alert("Error submitting form data. Please try again later.");
    }
  };

  const StepOne = ({
    next,
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
  }) => {
    return (
      <div className="flex flex-col gap-4">
        <input
          className={`border-2 rounded-md p-3  ${
            errors.name && "border-rose-500"
          } `}
          placeholder="Enter full name here"
          type="name"
          name="name"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.name}
        />
        <input
          className={`border-2 rounded-md p-3 ${
            errors.email && "border-rose-500"
          }`}
          placeholder="Enter email here"
          type="email"
          name="email"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.email}
        />
        <p className="text-red-500">
          {errors.email && touched.email && errors.email}
        </p>
        <button
          className={`bg-blue-700 text-white p-3 rounded-md hover:bg-blue-600 ${
            (!values.name || !values.email || errors.email) &&
            "opacity-50 cursor-not-allowed"
          } `}
          onClick={next}
          disabled={!values.name || !values.email}
        >
          Next
        </button>
      </div>
    );
  };

  const StepTwo = ({
    next,
    prevStep,
    values,
    handleChange,
    errors,
    handleBlur,
  }) => {
    return (
      <div className="flex flex-col gap-4">
        <input
          className="border-2 rounded-md p-3
          "
          placeholder="Enter first name here"
          type="text"
          name="firstName"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.firstName}
        />
        <input
          className="border-2 rounded-md p-3
          "
          placeholder="Enter last name here"
          type="text"
          name="lastName"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.lastName}
        />
        <div className="flex flex-col gap-2">
          <button
            className="bg-blue-700 text-white p-3 rounded-md hover:bg-blue-600"
            onClick={prevStep}
          >
            Previous
          </button>
          <button
            className={`bg-blue-700 text-white p-3 rounded-md hover:bg-blue-600 ${
              (!values.lastName || !values.firstName) &&
              "opacity-50 cursor-not-allowed"
            } `}
            onClick={next}
          >
            Next
          </button>
        </div>
      </div>
    );
  };

  const StepThree = ({
    prevStep,
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
  }) => {
    return (
      <div className="flex flex-col gap-4">
        <input
          className="border-2 rounded-md p-3
          "
          placeholder="Enter form other info here"
          type="text"
          name="otherinfo"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.lastName}
        />
        <input
          className="border-2 rounded-md p-3
          "
          placeholder="Enter password here"
          type="password"
          name="password"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.password}
        />
        {errors.password && touched.password && errors.password}
        <div className="flex flex-col gap-2">
          <button
            className="bg-slate-700 text-white p-3 rounded-md hover:"
            onClick={prevStep}
          >
            Previous
          </button>
          <button
            className="bg-green-700 text-white p-3 rounded-md hover:bg-green-600"
            onClick={handleSubmit}
            type="submit"
          >
            Submit
          </button>
        </div>
      </div>
    );
  };

  StepOne.propTypes = {
    next: PropTypes.func.isRequired,
    values: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    touched: PropTypes.object.isRequired,
    handleChange: PropTypes.func.isRequired,
    handleBlur: PropTypes.func.isRequired,
  };

  StepTwo.propTypes = {
    next: PropTypes.func.isRequired,
    prevStep: PropTypes.func.isRequired,
    values: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    touched: PropTypes.object.isRequired,
    handleChange: PropTypes.func.isRequired,
    handleBlur: PropTypes.func.isRequired,
  };

  StepThree.propTypes = {
    next: PropTypes.func.isRequired,
    prevStep: PropTypes.func.isRequired,
    values: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    touched: PropTypes.object.isRequired,
    handleChange: PropTypes.func.isRequired,
    handleBlur: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
  };

  return (
    <div>
      <h1 className="text-center font-bold text-2xl my-7">
        Welcome to Construction Regulatory
      </h1>
      <Formik
        initialValues={{
          name: "",
          email: "",
          password: "",
          firstName: "",
          lastName: "",
        }}
        validate={(values) => {
          const errors = {};
          if (!values.email) {
            errors.email = "Required";
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = "Invalid email address";
          }
          return errors;
        }}
        onSubmit={handleSubmit}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
        }) => (
          <form
            className="flex flex-col max-w-[20em] mx-auto"
            onSubmit={handleSubmit}
          >
            {step === 1 && (
              <StepOne
                next={nextStep}
                values={values}
                errors={errors}
                touched={touched}
                handleChange={handleChange}
                handleBlur={handleBlur}
              />
            )}
            {step === 2 && (
              <StepTwo
                next={nextStep}
                prevStep={prevStep}
                values={values}
                errors={errors}
                touched={touched}
                handleChange={handleChange}
                handleBlur={handleBlur}
              />
            )}
            {step === 3 && (
              <StepThree
                next={nextStep}
                prevStep={prevStep}
                values={values}
                errors={errors}
                touched={touched}
                handleChange={handleChange}
                handleBlur={handleBlur}
                handleSubmit={handleSubmit}
              />
            )}
          </form>
        )}
      </Formik>
      <ReusableModal isOpen={open} onClose={handleClose}>
        <div className="flex flex-col items-center min-w-[300px] max-w-[500px]">
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Confirmation
          </Typography>
          <Typography
            className="text-green-700 text-center"
            id="modal-modal-description"
            sx={{ mt: 2 }}
          >
            You have successfully uploaded and sent the request, we will get in
            touch with in a few days
          </Typography>
          <Button
            variant="contained"
            className="w-[100px] bg-blue-700 mt-6"
            onClick={handleClose}
          >
            Ok
          </Button>
        </div>
      </ReusableModal>
    </div>
  );
};
export default ContactUs;
