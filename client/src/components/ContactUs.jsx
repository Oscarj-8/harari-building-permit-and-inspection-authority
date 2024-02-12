import PropTypes from "prop-types";
import Button from "@mui/material/Button";

const ContactUs = ({ handleChange, formData, handleSend }) => (
  <div className="bg-white flex flex-col w-full justify-between mb-4 gap-2 md:flex-rowmax-w-[1500px] mx-auto">
    <div className="text-left p-4 ">
      <h1 className="font-medium text-customBlue text-3xl lg:text-4xl">
        Contact us
      </h1>
      <h3 className="italic font-light">
        Do you have anything to share? Tell us? Ideas? Suggestions?
      </h3>
      <p className="">Please do contact us</p>
    </div>
    <div className="flex flex-col bg-slate-200 z-auto rounded-md p-3 mx-4 gap-4 shadow-lg">
      <h2 className="text-xl text-slate-700 font-medium">Get in touch</h2>
      <form className="flex flex-col gap-2 mb-2 justify-center ">
        <input
          id="name"
          onChange={handleChange}
          value={formData.name}
          className="p-2 w-full border rounded-sm border-slate-500"
          placeholder="Enter your name here"
          type="text"
        />
        <input
          id="number"
          onChange={handleChange}
          value={formData.number}
          className=" p-2 border w-full border-slate-500"
          placeholder="Enter your number here"
          type="number"
        />
        <textarea
          name="message"
          id="message"
          onChange={handleChange}
          value={formData.message}
          className="w-full p-2 border h-[150px]  border-slate-500"
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
  handleComment: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSend: PropTypes.func.isRequired,
  formData: PropTypes.shape({
    name: PropTypes.string.isRequired,
    number: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
  }).isRequired,
};
