import { useState, useEffect } from "react";
import { List, ListItem, Button } from "@mui/material";

const UserFoldersList = () => {
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
    <List className="flex flex-wrap gap-3 items-stretch">
      {userFolders.map((folder, index) => (
        <ListItem
          key={index}
          className="flex flex-col items-start border mx-4 max-w-md p-4 w-1/3 rounded-lg shadow-sm hover:shadow-lg "
        >
          <p>{folder}</p>
          <Button
            variant="contained"
            className="bg-blue-700 mt-2"
            onClick={() => handleDownloadFolder(folder)}
          >
            Download Folder
          </Button>
        </ListItem>
      ))}
    </List>
  );
};

export default UserFoldersList;
