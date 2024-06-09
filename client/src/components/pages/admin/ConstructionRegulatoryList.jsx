import { useState, useEffect } from "react";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import { Link, Outlet } from "react-router-dom";

function ConstructionRegList() {
  return (
    <div className="flex flex-col items-center justify-center gap-6">
      <h1>Construction Reg Data</h1>
      <div className="w-full">
        <DataTable />
        <Outlet />
      </div>
    </div>
  );
}

export default ConstructionRegList;

const columns = [
  {
    field: "fullName",
    headerName: "Full name",
    width: 180,
    renderCell: (params) => (
      <Link
        className="hover:underline text-blue-500 hover:text-blue-700"
        to={`/user-details/${params.row._id}`}
      >
        {params.value}
      </Link>
    ),
  },
  {
    field: "gender",
    headerName: "Gender",
    type: "string",
    width: 180,
  },
  {
    field: "woreda",
    headerName: "Woreda",
    type: "string",
    width: 180,
  },
  {
    field: "mobilePhone",
    headerName: "Mobile Phone",
    type: "string",
    width: 180,
  },
  {
    field: "houseNumber",
    headerName: "House Number",
    type: "string",
    width: 180,
  },
  {
    field: "kebele",
    headerName: "Kebele",
    type: "string",
    width: 180,
  },
  {
    field: "currentOrganization",
    headerName: "Current Organization",
    type: "string",
    width: 180,
  },
  {
    field: "workExperience",
    headerName: "Work Experience",
    type: "string",
    width: 180,
  },
];

function DataTable() {
  const [data, setData] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // const response = await axios.get("/api/constructionReg-list");
      const response = await axios.get(
        "https://mocki.io/v1/770cdcaf-00f9-44cc-8d19-37dc29cd95d9"
      );
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleRowSelection = (selectionModel) => {
    const selectedRowData = selectionModel.map((id) =>
      data.find((row) => row._id === id)
    );
    setSelectedRows(selectedRowData);
  };

  return (
    <DataGrid
      rows={data}
      columns={columns}
      initialState={{
        pagination: {
          paginationModel: { page: 0, pageSize: 5 },
        },
      }}
      pageSizeOptions={[5, 10]}
      checkboxSelection
      getRowId={(row) => row._id}
      // onRowSelectionModelChange={(ids) => onRowsSelectionHandler(ids)}
      onRowSelectionModelChange={handleRowSelection}
    />
  );
}
