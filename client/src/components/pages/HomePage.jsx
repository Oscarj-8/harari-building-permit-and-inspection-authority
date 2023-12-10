import background from "../../assets/images/Background.jpg";
import Modal from "../Modal";
import { useState } from "react";
import { Link } from "react-router-dom";
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
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe
          consequatur molestias, tenetur unde repudiandae fugiat id cum deserunt
          ut q
        </span>
        <button
          onClick={openModal}
          className="p-3 bg-blue-700 text-white rounded-lg shadow-lg border border-blue-700 hover:shadow-none hover:border hover:border-blue-700 hover:bg-white hover:text-blue-700 font-medium px-5 "
        >
          Lets get Started
        </button>

        <Modal isOpen={isModalOpen} onClose={closeModal}>
          <h2 className="text-xl font-bold mb-4">
            What service are you looking for?
          </h2>
          <ul className="flex flex-col items-center gap-4">
            <Link to="/service-one">
              <li className="hover:underline">ServiceOne</li>
            </Link>
            <Link to="/service-two">
              <li className="hover:underline">ServiceTwo</li>
            </Link>
            <Link to="/service-three">
              <li className="hover:underline">ServiceThree</li>
            </Link>
            <Link to="/service-four">
              <li className="hover:underline">ServiceFour</li>
            </Link>
          </ul>
        </Modal>
      </div>
    </main>
  );
}
