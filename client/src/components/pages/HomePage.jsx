import background from "../../assets/images/Background.jpg";
import Modal from "../Modal";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Button from "@mui/material/Button";
import CommentMessagesForm from "../CommentMessagesForm";
import CloseIcon from "@mui/icons-material/Close";
import Services from "../Services";
import About from "../About";
import Footer from "../Footer";
import { Element } from "react-scroll";
import ReusableModal from "../ReusableModal";

export default function HomePage() {
  const textStyle = {
    fontFamily: "Bebas Neue, sans-serif",
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
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);

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

  useEffect(() => {
    const body = document.body;
    if (isModalOpen) {
      body.style.overflow = "hidden";
    } else {
      body.style.overflow = "unset";
    }

    return () => {
      body.style.overflow = "unset";
    };
  }, [isModalOpen]);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const handleComment = () => {
    setIsCommentOpen(!isCommentOpen);
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

  const handleSend = async () => {
    if (!formData.message) {
      alert("Please fill in at least the message field");
      return;
    }

    try {
      const res = await fetch("/api/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setOpen(true);
        setFormData({
          name: "",
          number: "",
          message: "",
        });
        handleComment();
      } else {
        console.error("Failed to send message");
      }
    } catch (error) {
      console.error("An error occurred while sending", error);
    }
  };

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
          <span
            className="text-4xl text-center text-white font-serif font-semibold md:text-5xl tracking-wide"
            style={textStyle}
          >
            Build modern harar keeping the values from the past
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
              className="flex items-center justify-between gap-4"
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
              <Link to="/plan-consent">
                <Button
                  className="w-full hover:bg-blue-700 hover:text-white"
                  variant="outlined"
                >
                  Plan consent
                </Button>
              </Link>
              <Link to="/design-eval">
                <Button
                  className="w-full hover:bg-blue-700 hover:text-white"
                  variant="outlined"
                >
                  Design evaluation and building permit
                </Button>
              </Link>
              <Link to="/building-ins">
                <Button
                  className="w-full hover:bg-blue-700 hover:text-white"
                  variant="outlined"
                >
                  Building inspection and occupancy permit
                </Button>
              </Link>
              <Link to="/construction-reg">
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
        <CommentMessagesForm
          handleComment={handleComment}
          isCommentOpen={isCommentOpen}
          handleChange={handleChange}
          handleSend={handleSend}
          formData={formData}
        />
      </main>
      <Element name="services" className="element">
        <Services />
      </Element>
      <Element name="about" className="element">
        <About />
      </Element>
      <Footer />
      {open && (
        <ReusableModal open={open} onClose={handleClose}>
          <div className="flex flex-col items-center min-w-[300px] max-w-[500px]">
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Confirmation
            </Typography>
            <Typography
              className="text-green-700 text-center"
              id="modal-modal-description"
              sx={{ mt: 2 }}
            >
              Your message has been successfully sent. Thank you for reaching
              out. We will get in touch with you{" "}
              <span className="text-md">😊</span> .
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
      )}
    </div>
  );
}
