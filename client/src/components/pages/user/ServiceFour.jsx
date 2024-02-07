import { Formik } from "formik";
import { useState } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

const ContactUs = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [step, setStep] = useState(1);

  const nextStep = () => setStep((step) => step + 1);
  const prevStep = () => setStep((step) => step - 1);

  const handleSubmit = (values) => {
    const valuesWithUsername = {
      ...values,
      username: currentUser.username,
    };
    fetch("/api/submit-construction-reg-form", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(valuesWithUsername),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .catch((error) => {
        console.error("Error submitting form data:", error);
        alert("Error submitting form data. Please try again later.");
      });
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
          className="border-2 rounded-md p-3
          "
          placeholder="Enter full name here"
          type="name"
          name="name"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.name}
        />
        <input
          className="border-2 rounded-md p-3
          "
          placeholder="Enter email here"
          type="email"
          name="email"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.email}
        />
        {errors.email && touched.email && errors.email}
        <button
          className="bg-slate-700 text-white p-3 rounded-md hover:bg-slate-600"
          onClick={next}
        >
          Next
        </button>
      </div>
    );
  };

  const StepTwo = ({ next, prevStep, values, handleChange, handleBlur }) => {
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
            className="bg-slate-700 text-white p-3 rounded-md hover:bg-slate-600"
            onClick={prevStep}
          >
            Previous
          </button>
          <button
            className="bg-slate-700 text-white p-3 rounded-md hover:bg-slate-600"
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
        initialValues={{ email: "", password: "", firstName: "", lastName: "" }}
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
    </div>
  );
};
export default ContactUs;
