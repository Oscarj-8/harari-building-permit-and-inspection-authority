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
            className="flex items-end justify-between gap-4"
            style={{ fontFamily: "Roboto, sans-serif" }}
          >
            <h2 className="text-2xl text-zinc-700">
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
                Building inspection and occupancy permit
              </Button>
            </Link>
          </ul>
        </Modal>
      </div>
    </main>
  );
}
