import background from "../../assets/images/Background.jpg";
import Modal from "../Modal";
import { useState } from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";

export default function HomePage() {
  const textStyle = {
    fontFamily: "Montserrat, sans-serif",
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (
    <main
      className="flex items-center text-slate-700 p-5 "
      style={{
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
        height: "calc(100vh - 5rem)",
      }}
    >
      <div className="absolute inset-0 bg-blue-950 opacity-40 filter blur-lg"></div>
      <div className=" z-10 flex flex-col items-center max-w-6xl mx-auto gap-5 ">
        <span className="text-4xl text-center text-white " style={textStyle}>
          Build modern Harar keeping the values from the past
        </span>
        <Button
          variant="contained"
          onClick={openModal}
          className="p-3 bg-blue-700 text-white rounded-lg shadow-lg border
          border-blue-700 hover:shadow-none hover:border hover:border-blue-700
          hover:bg-white hover:text-blue-700 font-medium px-5 "
        >
          Lets get Started
        </Button>

        <Modal isOpen={isModalOpen}>
          <div
            className="flex items-center justify-center gap-4"
            style={{ fontFamily: "Roboto, sans-serif" }}
          >
            <h2 className="text-lg text-black">
              What service are you looking for?
            </h2>
            {/* <span className="font-bold" onClick={closeModal}>
              &times;
            </span> */}
            {/* <FontAwesomeIcon
              className="cursor-pointer"
              icon={faTimes}
              onClick={closeModal}
              // size="2x"
            /> */}
            <CloseIcon
              className="fa-plus-circle"
              onClick={closeModal}
              sx={{ fontSize: 32 }}
            />
          </div>

          <ul className="flex flex-col items-center gap-4">
            <Link to="/service-one">
              <li className="hover:underline">Plan consent</li>
            </Link>
            <Link to="/service-two">
              <li className="hover:underline">
                Design evaluation and building permit
              </li>
            </Link>
            <Link to="/service-three">
              <li className="hover:underline">
                Building inspection and occupancy permit
              </li>
            </Link>
            <Link to="/service-four">
              <li className="hover:underline">Construction regulatory</li>
            </Link>
          </ul>
        </Modal>
      </div>
    </main>
  );
}
