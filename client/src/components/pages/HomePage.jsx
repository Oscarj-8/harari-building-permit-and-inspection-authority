import background from "../../assets/images/Background.jpg";
import Modal from "../Modal";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
import Services from "../Services";
import About from "../About";
import Footer from "../Footer";
import { Element } from "react-scroll";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment } from "@fortawesome/free-solid-svg-icons";

export default function HomePage() {
  const textStyle = {
    fontFamily: "Montserrat, sans-serif",
  };
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCommentOpen, setIsCommentOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    number: "",
    message: "",
  });

  useEffect(() => {
    const handleClickOutside = (event) => {
      const commentDiv = document.getElementById("commentDiv");
      if (
        commentDiv &&
        !commentDiv.contains(event.target) &&
        !event.target.classList.contains("fa-comment")
      ) {
        setIsCommentOpen(false);
      }
    };

    document.body.addEventListener("click", handleClickOutside);

    return () => {
      document.body.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const handleComment = () => {
    setIsCommentOpen(!isCommentOpen);
    console.log(isCommentOpen);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleGetStarted = () => {
    if (!currentUser) {
      navigate("/user-sign-in");
    } else {
      openModal();
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSend = () => {};

  return (
    <div className="flex flex-col gap-16 bg-gray-100">
      <main
        className="flex items-center text-slate-700 p-5 "
        style={{
          backgroundImage: `url(${background})`,
          backgroundSize: "cover",
          height: "calc(100vh - 4rem)",
        }}
      >
        <div className="absolute inset-0 bg-blue-950 opacity-40 filter blur-lg"></div>
        <div className="z-0 flex flex-col items-center max-w-6xl mx-auto gap-5 mb-24">
          <span className="text-4xl text-center text-white " style={textStyle}>
            Build modern Harar keeping the values from the past
          </span>
          <Button
            variant="contained"
            onClick={handleGetStarted}
            className="p-3 bg-blue-700 text-white rounded-lg shadow-lg border
          border-blue-700 hover:shadow-none hover:border hover:border-blue-700
          hover:bg-white hover:text-blue-700 font-medium px-5 "
          >
            {currentUser ? "Let's get Started" : "Sign in"}
          </Button>

          <Modal isOpen={isModalOpen} onClose={closeModal}>
            <div
              className="flex items-end justify-between gap-4"
              style={{ fontFamily: "Roboto, sans-serif" }}
            >
              <h2 className="text-xl text-zinc-700">
                What service are you looking for?
              </h2>

              <CloseIcon
                className="bg-blue-600 text-white rounded cursor-pointer "
                onClick={closeModal}
                sx={{ fontSize: 32 }}
              />
            </div>
            <hr className="border-1 border-black" />
            <ul className="flex flex-col gap-2 ">
              <Link to="/service-one">
                <Button
                  className="w-full hover:bg-blue-700 hover:text-white"
                  variant="outlined"
                >
                  Plan consent
                </Button>
              </Link>
              <Link to="/service-two">
                <Button
                  className="w-full hover:bg-blue-700 hover:text-white"
                  variant="outlined"
                >
                  Design evaluation and building permit
                </Button>
              </Link>
              <Link to="/service-three">
                <Button
                  className="w-full hover:bg-blue-700 hover:text-white"
                  variant="outlined"
                >
                  Building inspection and occupancy permit
                </Button>
              </Link>
              <Link to="/service-four">
                <Button
                  className="w-full hover:bg-blue-700 hover:text-white"
                  variant="outlined"
                >
                  Construction regulatory
                </Button>
              </Link>
            </ul>
          </Modal>
        </div>
        <div id="commentDiv">
          <FontAwesomeIcon
            onClick={handleComment}
            icon={faComment}
            className="text-3xl p-4 bg-blue-700 text-white absolute right-2 rounded-full bottom-2 md:bottom-8 md:right-8 hover:shadow-2xl cursor-pointer"
          />
          <div
            className={`absolute bottom-24 w-[400px] z-40 ${
              isCommentOpen ? "visible right-8" : "hidden right-[50em]"
            } `}
          >
            <form className="flex flex-col gap-2 p-2 mb-2 justify-center items-center bg-white z-auto rounded-md">
              <span className="self-start p-1 text-xl">
                Have a Tip or Idea to Share?
              </span>
              <input
                id="name"
                onChange={handleChange}
                className="p-2 w-full border rounded-sm border-slate-500"
                placeholder="Enter your name here"
                type="text"
              />
              <input
                id="number"
                onChange={handleChange}
                className=" p-2 border w-full border-slate-500"
                placeholder="Enter your number here"
                type="number"
              />
              <textarea
                name="message"
                id="message"
                onChange={handleChange}
                className="w-full p-2 border border-slate-500"
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
      </main>
      <Element name="services" className="element">
        <Services />
      </Element>
      <Element name="about" className="element">
        <About />
      </Element>
      <Footer />
    </div>
  );
}
