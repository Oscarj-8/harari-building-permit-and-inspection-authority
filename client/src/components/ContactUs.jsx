import PropTypes from "prop-types";
import Button from "@mui/material/Button";

const ContactUs = ({ handleChange, formData, handleSend }) => (
  <div className="flex flex-col w-full p-4 items-center justify-between gap-4 md:flex-row max-w-[1500px] mx-auto mb-8">
    <div className="text-left">
      <h1 className="font-medium text-customBlue text-3xl lg:text-5xl">
        Contact Us
      </h1>
      <h3 className="italic font-light text-lg md:text-2xl">
        Do you have anything to share? Tell us? Ideas? Suggestions?
      </h3>
    </div>
    <div className="flex flex-col w-full max-w-[700px] bg-slate-200 rounded-md p-3 gap-4 shadow-lg md:p-4">
      <h2 className="text-xl md:text-3xl text-slate-700 font-medium">
        Get in touch
      </h2>
      <form className="flex flex-col gap-4 mb-2 justify-center">
        <input
          id="name"
          onChange={handleChange}
          value={formData.name}
          className="p-3 w-full border rounded-md border-slate-500"
          placeholder="Enter your name here"
          type="text"
        />
        <input
          id="number"
          onChange={handleChange}
          value={formData.number}
          className="p-3 border w-full border-slate-500 rounded-md"
          placeholder="Enter your number here"
          type="number"
        />
        <textarea
          name="message"
          id="message"
          onChange={handleChange}
          value={formData.message}
          className="w-full p-3 border h-[200px]  border-slate-500 rounded-md"
          placeholder="Write your message here"
        ></textarea>
        <Button
          onClick={handleSend}
          type="button"
          variant="contained"
          className="bg-blue-700 w-full shadow-none hover:shadow-lg"
        >
          Send
        </Button>
      </form>
    </div>
  </div>
);

export default ContactUs;

ContactUs.propTypes = {
  handleChange: PropTypes.func.isRequired,
  handleSend: PropTypes.func.isRequired,
  formData: PropTypes.shape({
    name: PropTypes.string.isRequired,
    number: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
  }).isRequired,
};
