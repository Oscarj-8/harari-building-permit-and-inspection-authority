import { useState, useEffect } from "react";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";

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

function NewLicenseDataTable() {
  const [data, setData] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // const response = await axios.get("/api/constructionReg-list");
      const response = await axios.get("api/constructionReg-list");
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

export default NewLicenseDataTable;
