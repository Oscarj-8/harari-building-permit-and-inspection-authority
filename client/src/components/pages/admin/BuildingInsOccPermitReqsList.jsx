import { useState, useEffect } from "react";
import { List, ListItem, Button } from "@mui/material";
import ReusableModal from "../../ReusableModal";
import Typography from "@mui/material/Typography";

const BuildingInsOccPermitReqsList = () => {
  const [userFolders, setUserFolders] = useState([]);
  const [noFolder, setNoFolder] = useState(false);
  const [message, setMessage] = useState("");
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedFolder, setSelectedFolder] = useState("");
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);
  const handleDeleteClose = () => {
    setDeleteOpen(false);
    setSelectedFolder("");
  };

  useEffect(() => {
    const fetchUserFolders = async () => {
      try {
        const response = await fetch("/api/user-buildingIns-folders");

        if (response.ok) {
          const data = await response.json();
          if (data.message) {
            setMessage(data.message);
            setNoFolder(true);
          } else {
            setUserFolders(data.userFolders);
          }
        } else {
          console.error("Error fetching user folders");
        }
      } catch (error) {
        console.error("An error occurred", error);
      }
    };

    fetchUserFolders();
  }, []);

  const handleDownloadFolder = (folderName) => {
    const downloadLink = document.createElement("a");
    downloadLink.href = `/api/download-buildingIns/${folderName}`;
    downloadLink.download = `${folderName}.zip`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  const handleDeleteFolder = async () => {
    try {
      const response = await fetch(
        `/api/delete-buildingIns/${selectedFolder}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        // Update the userFolders state after successful deletion
        setUserFolders((prevFolders) =>
          prevFolders.filter((folder) => folder !== selectedFolder)
        );
        handleDeleteClose();
        setDeleteConfirmation(true);
        setTimeout(() => {
          setDeleteConfirmation(false);
        }, 5000);
      } else {
        console.error("Error deleting folder");
      }
    } catch (error) {
      console.error("An error occurred", error);
    }
  };

  return (
    <div className="flex flex-col p-1">
      <h1 className="text-lg underline">
        Building Inspection and Occupancy Permit Requests List
      </h1>
      <List className="flex flex-wrap gap-3 items-stretch ">
        {userFolders.map((folder, index) => (
          <ListItem
            key={index}
            className="flex flex-col items-start border max-w-md p-2 rounded-lg shadow-sm hover:shadow-lg "
          >
            <>{folder}</>
            <div className="flex items-center py-2 gap-4 w-full">
              <Button
                variant="contained"
                className="bg-blue-700 hover:bg-blue-900"
                onClick={() => handleDownloadFolder(folder)}
              >
                Download Folder
              </Button>
              <Button
                variant="contained"
                className="bg-red-700 hover:bg-red-900"
                onClick={() => {
                  setDeleteOpen(true);
                  setSelectedFolder(folder);
                }}
              >
                Delete Folder
              </Button>
            </div>
          </ListItem>
        ))}
        {noFolder && <p className="text-slate-900 text-lg">{message}</p>}
      </List>
      <ReusableModal open={deleteOpen} onClose={handleDeleteClose}>
        <div className="min-w-[300px] max-w-[500px]">
          <Typography
            className="text-slate-900 text-xl text-center flex flex-col m-0"
            id="modal-modal-description"
            sx={{ mt: 2 }}
          >
            {`Are you sure you want to delete ${selectedFolder} folder?`}
            <span className="text-sm text-red-700">
              * Please note that deleting this folder is a permanent action and
              cannot be undone.
            </span>
          </Typography>
          <div className="flex flex-col md:flex-row md:gap-8">
            <Button
              variant="contained"
              className="w-full bg-red-700 mt-6 hover:bg-red-900"
              onClick={handleDeleteFolder}
            >
              DELETE
            </Button>
            <Button
              variant="contained"
              className="w-full bg-blue-700 mt-6"
              onClick={handleDeleteClose}
            >
              CANCEL
            </Button>
          </div>
        </div>
      </ReusableModal>
      {deleteConfirmation && (
        <p className="text-green-700 text-lg">
          User folder has been deleted successfully
        </p>
      )}
    </div>
  );
};

export default BuildingInsOccPermitReqsList;
