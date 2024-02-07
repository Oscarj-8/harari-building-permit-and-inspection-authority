import { Formik } from "formik";

const ContactUs = () => (
  <div>
    <h1 className="text-center font-bold text-2xl my-7">
      Welcome to Construction Regulatory
    </h1>
    <Formik
      initialValues={{ email: "", password: "" }}
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
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
        }, 400);
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
        /* and other goodies */
      }) => (
        <form
          className="flex flex-col max-w-[20em] mx-auto gap-2"
          onSubmit={handleSubmit}
        >
          <input
            className="border-2 rounded-md p-2
          "
            placeholder="Enter email here"
            type="email"
            name="email"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.email}
          />

          {errors.email && touched.email && errors.email}
          <input
            className="border-2 rounded-md p-2
          "
            placeholder="Enter password here"
            type="password"
            name="password"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.password}
          />
          {errors.password && touched.password && errors.password}
          <button
            className="bg-slate-700 text-white p-3 rounded-md mt-4"
            type="submit"
            disabled={isSubmitting}
          >
            Submit
          </button>
        </form>
      )}
    </Formik>
  </div>
);

export default ContactUs;
