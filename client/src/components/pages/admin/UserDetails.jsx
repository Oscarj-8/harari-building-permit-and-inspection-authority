import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function UserDetails() {
  const { id } = useParams();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`https://api.example.com/users/${id}`);
        setUserData(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [id]);

  if (!userData) return <div>Loading...</div>;

  return (
    <div>
      <h1>User Details for ID: {id}</h1>
      <p>Full Name: {userData.fullName}</p>
      <p>Gender: {userData.gender}</p>
      <p>Woreda: {userData.woreda}</p>
      <p>Mobile Phone: {userData.mobilePhone}</p>
      <p>House Number: {userData.houseNumber}</p>
      <p>Kebele: {userData.kebele}</p>
      <p>Current Organization: {userData.currentOrganization}</p>
      <p>Work Experience: {userData.workExperience}</p>
    </div>
  );
}

export default UserDetails;
