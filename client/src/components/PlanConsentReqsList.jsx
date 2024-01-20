import { useState, useEffect } from "react";
import { List, ListItem, Button } from "@mui/material";

const PlanConsentReqsList = () => {
  const [userFolders, setUserFolders] = useState([]);

  useEffect(() => {
    // Fetch user folders from the server
    const fetchUserFolders = async () => {
      try {
        const response = await fetch("/api/user-folders");

        if (response.ok) {
          const { userFolders } = await response.json();
          setUserFolders(userFolders);
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
    // Trigger the download for the specific folder
    const downloadLink = document.createElement("a");
    downloadLink.href = `/api/download/${folderName}`;
    downloadLink.download = `${folderName}.zip`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  return (
    <div className="flex flex-col p-2">
      <h1 className="text-lg underline p-1">Plan Consent Requests List</h1>
      <List className="flex flex-wrap gap-3 items-stretch">
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
                onClick={() => handleDownloadFolder(folder)}
              >
                Delete Folder
              </Button>
            </div>
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default PlanConsentReqsList;
