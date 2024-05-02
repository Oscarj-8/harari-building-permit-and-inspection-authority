import { useState, useEffect } from "react";
import axios from "axios";

function ConstructionRegList() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("/api/constructionReg-list");
      console.log("API response:", response.data.data);
      setData(response.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div>
      <h1>Construction Reg Data</h1>
      {data.map((item) => (
        <div key={item._id}>
          <h2>{item.fullName}</h2>
          <p>Gender: {item.gender}</p>
          <img
            src={`data:image/png;base64,${item.idCard.base64}`}
            alt="ID Card"
          />
        </div>
      ))}
    </div>
  );
}

export default ConstructionRegList;
