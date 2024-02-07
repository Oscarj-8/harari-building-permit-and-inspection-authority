// import { Formik } from "formik";
// import PropTypes from "prop-types";

// const ContactForm = ({ step, nextStep, prevStep }) => {
//   const StepOne = ({ values, errors, touched, handleChange, handleBlur }) => {
//     return (
//       <div>
//         <input
//           className="border-2 rounded-md p-2"
//           placeholder="Enter email here"
//           type="email"
//           name="email"
//           onChange={handleChange}
//           onBlur={handleBlur}
//           value={values.email}
//         />

//         {errors.email && touched.email && <div>{errors.email}</div>}
//         <input
//           className="border-2 rounded-md p-2"
//           placeholder="Enter password here"
//           type="password"
//           name="password"
//           onChange={handleChange}
//           onBlur={handleBlur}
//           value={values.password}
//         />
//         {errors.password && touched.password && <div>{errors.password}</div>}
//         <button
//           className="bg-slate-700 text-white p-3 rounded-md mt-4"
//           onClick={nextStep}
//         >
//           Next
//         </button>
//       </div>
//     );
//   };

//   const StepTwo = ({ values, errors, touched, handleChange, handleBlur }) => {
//     return (
//       <div>
//         <input
//           className="border-2 rounded-md p-2"
//           placeholder="Enter first name here"
//           type="text"
//           name="firstName"
//           onChange={handleChange}
//           onBlur={handleBlur}
//           value={values.firstName}
//         />
//         <input
//           className="border-2 rounded-md p-2"
//           placeholder="Enter second here"
//           type="password"
//           name="password"
//           onChange={handleChange}
//           onBlur={handleBlur}
//           value={values.password}
//         />
//         {errors.password && touched.password && <div>{errors.password}</div>}
//         <button
//           className="bg-slate-700 text-white p-3 rounded-md mt-4"
//           onClick={prevStep}
//         >
//           Previous
//         </button>
//         <button
//           className="bg-slate-700 text-white p-3 rounded-md mt-4"
//           onClick={nextStep}
//         >
//           Next
//         </button>
//       </div>
//     );
//   };

//   const StepThree = ({
//     values,
//     errors,
//     touched,
//     handleChange,
//     handleBlur,
//     handleSubmit,
//   }) => {
//     return (
//       <div>
//         <input
//           className="border-2 rounded-md p-2"
//           placeholder="Enter form three here"
//           type="text"
//           name="lastName"
//           onChange={handleChange}
//           onBlur={handleBlur}
//           value={values.lastName}
//         />
//         <input
//           className="border-2 rounded-md p-2"
//           placeholder="Enter second here"
//           type="password"
//           name="password"
//           onChange={handleChange}
//           onBlur={handleBlur}
//           value={values.password}
//         />
//         {errors.password && touched.password && <div>{errors.password}</div>}
//         <button
//           className="bg-slate-700 text-white p-3 rounded-md mt-4"
//           onClick={prevStep}
//         >
//           Previous
//         </button>
//         <button
//           className="bg-slate-700 text-white p-3 rounded-md mt-4"
//           onClick={handleSubmit}
//           type="submit"
//         >
//           Submit
//         </button>
//       </div>
//     );
//   };

//   StepOne.propTypes = {
//     values: PropTypes.object.isRequired,
//     errors: PropTypes.object.isRequired,
//     touched: PropTypes.object.isRequired,
//     handleChange: PropTypes.func.isRequired,
//     handleBlur: PropTypes.func.isRequired,
//   };

//   StepTwo.propTypes = {
//     values: PropTypes.object.isRequired,
//     errors: PropTypes.object.isRequired,
//     touched: PropTypes.object.isRequired,
//     handleChange: PropTypes.func.isRequired,
//     handleBlur: PropTypes.func.isRequired,
//     prevStep: PropTypes.func.isRequired,
//     nextStep: PropTypes.func.isRequired,
//   };

//   StepThree.propTypes = {
//     values: PropTypes.object.isRequired,
//     errors: PropTypes.object.isRequired,
//     touched: PropTypes.object.isRequired,
//     handleChange: PropTypes.func.isRequired,
//     handleBlur: PropTypes.func.isRequired,
//     handleSubmit: PropTypes.func.isRequired,
//     prevStep: PropTypes.func.isRequired,
//   };

//   return (
//     <Formik
//       initialValues={{ email: "", password: "", firstName: "", lastName: "" }}
//       validate={(values) => {
//         const errors = {};
//         if (!values.email) {
//           errors.email = "Required";
//         } else if (
//           !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
//         ) {
//           errors.email = "Invalid email address";
//         }
//         return errors;
//       }}
//       onSubmit={(values, { setSubmitting }) => {
//         setTimeout(() => {
//           alert(JSON.stringify(values, null, 2));
//           setSubmitting(false);
//         }, 400);
//       }}
//     >
//       {({
//         values,
//         errors,
//         touched,
//         handleChange,
//         handleBlur,
//         handleSubmit,
//         isSubmitting,
//       }) => (
//         <form
//           className="flex flex-col max-w-[20em] mx-auto gap-2"
//           onSubmit={handleSubmit}
//         >
//           {step === 1 && (
//             <StepOne
//               values={values}
//               errors={errors}
//               touched={touched}
//               handleChange={handleChange}
//               handleBlur={handleBlur}
//             />
//           )}
//           {step === 2 && (
//             <StepTwo
//               values={values}
//               errors={errors}
//               touched={touched}
//               handleChange={handleChange}
//               handleBlur={handleBlur}
//               prevStep={prevStep}
//               nextStep={nextStep}
//             />
//           )}
//           {step === 3 && (
//             <StepThree
//               values={values}
//               errors={errors}
//               touched={touched}
//               handleChange={handleChange}
//               handleBlur={handleBlur}
//               handleSubmit={handleSubmit}
//               prevStep={prevStep}
//             />
//           )}
//         </form>
//       )}
//     </Formik>
//   );
// };

// ContactForm.propTypes = {
//   step: PropTypes.number.isRequired,
//   nextStep: PropTypes.func.isRequired,
//   prevStep: PropTypes.func.isRequired,
// };

// export default ContactForm;
