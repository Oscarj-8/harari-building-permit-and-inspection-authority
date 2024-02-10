import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment } from "@fortawesome/free-solid-svg-icons";
import Button from "@mui/material/Button";

function CommentMessagesForm({
  handleComment,
  isCommentOpen,
  handleChange,
  formData,
  handleSend,
}) {
  return (
    <div id="commentDiv">
      <FontAwesomeIcon
        onClick={handleComment}
        icon={faComment}
        className="text-3xl p-4 bg-blue-700 text-white fixed right-4 rounded-full bottom-2 md:bottom-8 md:right-9 shadow-xl hover:shadow-2xl hover:p-[0.55em] hover:text-[2em] cursor-pointer transition-all duration-500 ease-in-out"
      />
      <div
        className={`absolute bottom-24  min-w-[340px] z-40 ${
          isCommentOpen ? "visible right-8" : "hidden right-[50em]"
        } `}
        style={{
          right: isCommentOpen
            ? window.innerWidth > 768
              ? "right-8"
              : "calc(50% - 340px)"
            : "",
          transform: isCommentOpen
            ? window.innerWidth > 768
              ? "none"
              : "translateX(-50%)"
            : "none",
          minWidth: "340px",
        }}
      >
        <form className="flex flex-col gap-2 p-2 mb-2 justify-center  items-center bg-white z-auto rounded-md">
          <span className="self-start p-1 text-xl">
            Have a Tip or Idea to Share?
          </span>
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
}
export default CommentMessagesForm;

CommentMessagesForm.propTypes = {
  handleComment: PropTypes.func.isRequired,
  isCommentOpen: PropTypes.bool.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSend: PropTypes.func.isRequired,
  formData: PropTypes.shape({
    name: PropTypes.string.isRequired,
    number: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
  }).isRequired,
};
