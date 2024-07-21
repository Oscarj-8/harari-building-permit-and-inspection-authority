import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Modal from "react-modal";

Modal.setAppElement("#root"); // Ensure this is set to your app's root element

function UserDetails() {
  const { id } = useParams();
  const [userData, setUserData] = useState(null);
  const [images, setImages] = useState({});
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`/api/users/${id}`);
        setUserData(response.data.user);
        setImages(response.data.images);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [id]);

  const openModal = (imagePath) => {
    setCurrentImage(imagePath);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setCurrentImage(null);
  };

  if (!userData) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">
        User Details for {userData.fullName}
      </h1>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Field
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Value
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            <tr>
              <td className="px-6 py-4 whitespace-nowrap">Full Name</td>
              <td className="px-6 py-4 whitespace-nowrap">
                {userData.fullName}
              </td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap">Gender</td>
              <td className="px-6 py-4 whitespace-nowrap">{userData.gender}</td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap">Woreda</td>
              <td className="px-6 py-4 whitespace-nowrap">{userData.woreda}</td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap">Mobile Phone</td>
              <td className="px-6 py-4 whitespace-nowrap">
                {userData.mobilePhone}
              </td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap">House Number</td>
              <td className="px-6 py-4 whitespace-nowrap">
                {userData.houseNumber}
              </td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap">Kebele</td>
              <td className="px-6 py-4 whitespace-nowrap">{userData.kebele}</td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap">
                Current Organization
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {userData.currentOrganization}
              </td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap">Work Experience</td>
              <td className="px-6 py-4 whitespace-nowrap">
                {userData.workExperience}
              </td>
            </tr>
            {[
              "idCard",
              "educationEvidence",
              "transcript",
              "COC",
              "applicantPhoto",
            ].map((field, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap">{field}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <img
                    src={`data:image/jpeg;base64,${images[field]}`}
                    alt={field}
                    className="w-32 h-32 object-cover cursor-pointer"
                    onClick={() =>
                      openModal(`data:image/jpeg;base64,${images[field]}`)
                    }
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Image Modal"
        className="flex justify-center items-center bg-black bg-opacity-75"
      >
        {currentImage && (
          <img
            src={currentImage}
            alt="Full size"
            className="max-w-full max-h-full"
          />
        )}
      </Modal>
    </div>
  );
}

export default UserDetails;
