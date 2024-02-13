// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faPhone } from "@fortawesome/free-solid-svg-icons";
// function CommentMessagesForm() {
//   const phoneNumber = "+251913701596";

//   return (
//     <div id="commentDiv">
//       <a href={`tel:${phoneNumber}`}>
//         {" "}
//         <FontAwesomeIcon
//           icon={faPhone}
//           className="text-3xl p-4 bg-blue-700 text-white absolute right-4 rounded-full bottom-2 md:bottom-8 md:right-9 shadow-xl hover:shadow-2xl hover:p-[0.55em] hover:text-[2em] cursor-pointer transition-all duration-500 ease-in-out"
//         />
//       </a>
//     </div>
//   );
// }
// export default CommentMessagesForm;

import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone } from "@fortawesome/free-solid-svg-icons";

function CallUs() {
  const [shaking, setShaking] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setShaking(true);
      setTimeout(() => {
        setShaking(false);
      }, 500);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <a href="tel:+251913701596">
        <FontAwesomeIcon
          icon={faPhone}
          className={shaking ? "icon shake" : "icon"}
        />
      </a>
    </div>
  );
}

export default CallUs;
