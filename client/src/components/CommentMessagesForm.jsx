import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment } from "@fortawesome/free-solid-svg-icons";
function CommentMessagesForm() {
  const phoneNumber = "+251913701596";

  return (
    <div id="commentDiv">
      <a href={`tel:${phoneNumber}`}>
        {" "}
        <FontAwesomeIcon
          icon={faComment}
          className="text-3xl p-4 bg-blue-700 text-white absolute right-4 rounded-full bottom-2 md:bottom-8 md:right-9 shadow-xl hover:shadow-2xl hover:p-[0.55em] hover:text-[2em] cursor-pointer transition-all duration-500 ease-in-out"
        />
      </a>
    </div>
  );
}
export default CommentMessagesForm;
