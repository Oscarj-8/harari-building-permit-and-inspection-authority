import { useState, useEffect } from "react";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";

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
    <div className="flex flex-col items-center justify-center">
      <h1>Construction Reg Data</h1>
      {/* {data.map((item, index) => (
        <div
          className="border border-gray-200 w-fit p-3 flex flex-col gap-4"
          key={item._id}
        >
          <h2>{item.fullName}</h2>
          <p>Gender: {item.gender}</p>
          <p>Woreda: {item.woreda}</p>
          <p>mobile phone: {item.mobilePhone}</p>
          <p>House number: {item.houseNumber}</p>
          <p>Kebele: {item.kebele}</p>
          <p>Current organization: {item.currentOrganization}</p>
          <p>Work Experience: {item.workExperience}</p>
         
          <img
            src={`data:image/jpg;base64,${item.idCard}`} // Assuming JPEG images
            alt={`Image ${index}`}
          />
        </div>
      ))} */}
      <div className="w-3/5">
        <DataTable />
      </div>
    </div>
  );
}

export default ConstructionRegList;

const columns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "firstName", headerName: "First name", width: 200 },
  { field: "lastName", headerName: "Last name", width: 200 },
  {
    field: "age",
    headerName: "Age",
    type: "number",
    width: 200,
  },
  {
    field: "fullName",
    headerName: "Full name",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 200,
    valueGetter: (value, row) => `${row.firstName || ""} ${row.lastName || ""}`,
  },
];

const rows = [
  { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
  { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
  { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
  { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
  { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
  { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
  { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
  { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
  { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
];

function DataTable() {
  return (
    <div className="">
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
      />
    </div>
  );
}
