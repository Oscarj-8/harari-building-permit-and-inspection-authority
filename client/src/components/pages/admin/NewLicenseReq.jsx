import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { getNewLicenseReq } from "@services/service.js";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";

let c = console.log.bind(document);

const NewLicenseReq = () => {
  const [newRequest, setNewRequest] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchNewLicenseReq();
  }, []);

  const fetchNewLicenseReq = async () => {
    try {
      const data = await getNewLicenseReq();
      setNewRequest(data);
    } catch (error) {
      console.error("Error fetching new license request:", error.message);
      setError(error.message);
    }
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  c("This one, ", newRequest);

  return (
    <div>
      <h1>New License Requests</h1>
      <div className="w-full">
        <DataTable newRequest={newRequest} />
      </div>
    </div>
  );
};

export default NewLicenseReq;

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

function DataTable({ newRequest }) {
  const [selectedRows, setSelectedRows] = useState([]);

  c(selectedRows);

  const handleRowSelection = (selectionModel) => {
    const selectedRowData = selectionModel.map((id) =>
      newRequest.find((row) => row._id === id)
    );
    setSelectedRows(selectedRowData);
  };

  return (
    <DataGrid
      rows={newRequest}
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

DataTable.propTypes = {
  newRequest: PropTypes.arrayOf(
    PropTypes.shape({
      fullName: PropTypes.string.isRequired,
      gender: PropTypes.string.isRequired,
      woreda: PropTypes.string.isRequired,
      mobilePhone: PropTypes.string.isRequired,
      houseNumber: PropTypes.string.isRequired,
      kebele: PropTypes.string.isRequired,
      currentOrganization: PropTypes.string.number,
      workExperience: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
};
