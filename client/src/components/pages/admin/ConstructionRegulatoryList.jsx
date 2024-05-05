// import { useState, useEffect } from "react";
// import axios from "axios";

// function ConstructionRegList() {
//   const [data, setData] = useState([]);

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const fetchData = async () => {
//     try {
//       const response = await axios.get("/api/constructionReg-list");
//       console.log("API response:", response.data.data);
//       setData(response.data.data);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }
//   };

//   return (
//     <div>
//       <h1>Construction Reg Data</h1>
//       {data.map((item, index) => (
//         <div
//           className="border border-gray-200 w-fit p-3 flex gap-4"
//           key={item._id}
//         >
//           <h2>{item.fullName}</h2>
//           <hr />
//           <p>Gender: {item.gender}</p>

//           <img
//             src={`data:image/jpg;base64,${item.idCard.base64}`} // Assuming JPEG images
//             alt={`Image ${index}`}
//           />
//         </div>
//       ))}
//     </div>
//   );
// }

// export default ConstructionRegList;

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
      {data.map((item, index) => (
        <div
          className="border border-gray-200 w-fit p-3 flex gap-4"
          key={item._id}
        >
          <h2>{item.fullName}</h2>
          <hr />
          <p>Gender: {item.gender}</p>

          {/* Accessing base64 data directly from the image object */}
          <img
            src={`data:image/jpg;base64,${item.idCard}`} // Assuming JPEG images
            alt={`Image ${index}`}
          />
        </div>
      ))}
    </div>
  );
}

export default ConstructionRegList;
