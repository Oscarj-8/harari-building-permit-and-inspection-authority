import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function UserDetails() {
  const { id } = useParams();
  const [userData, setUserData] = useState(null);
  const [images, setImages] = useState({});
  const [open, setOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(null);

  const handleOpen = (image) => {
    setCurrentImage(image);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setCurrentImage(null);
  };
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "calc(100vw - 8em)",
    maxWidth: "calc(100vw - 8em)",
    height: "auto",
    maxHeight: "calc(100vh - 8em)",
    bgcolor: "transparent",
    p: 0, // Remove padding to avoid overflow issues
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden", // Ensure content does not overflow
  };

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
                      handleOpen(`data:image/jpeg;base64,${images[field]}`)
                    }
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {currentImage && (
            <img
              src={currentImage}
              alt="Full size"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          )}
        </Box>
      </Modal>
    </div>
  );
}

export default UserDetails;
