import { useState, useEffect } from "react";
import { List, ListItem, Button } from "@mui/material";

const PlanConsentReqsList = () => {
  const [userFolders, setUserFolders] = useState([]);
  const [noFolder, setNoFolder] = useState(false);
  const [message, setMessage] = useState("");
  // useEffect(() => {
  //   // Fetch user folders from the server
  //   const fetchUserFolders = async () => {
  //     try {
  //       const response = await fetch("/api/user-folders");

  //       if (response.ok) {
  //         const { userFolders } = await response.json();
  //         setUserFolders(userFolders);
  //       } else {
  //         console.error("Error fetching user folders");
  //       }
  //     } catch (error) {
  //       console.error("An error occurred", error);
  //     }
  //   };

  //   fetchUserFolders();
  // }, []);

  useEffect(() => {
    // Fetch user folders from the server
    const fetchUserFolders = async () => {
      try {
        const response = await fetch("/api/user-folders");

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
    // Trigger the download for the specific folder
    const downloadLink = document.createElement("a");
    downloadLink.href = `/api/download/${folderName}`;
    downloadLink.download = `${folderName}.zip`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  const handleDeleteFolder = async (folderName) => {
    try {
      const response = await fetch(`/api/delete/${folderName}`, {
        method: "DELETE",
      });

      if (response.ok) {
        // Update the userFolders state after successful deletion
        setUserFolders((prevFolders) =>
          prevFolders.filter((folder) => folder !== folderName)
        );
        console.log("Folder deleted successfully");
      } else {
        console.error("Error deleting folder");
      }
    } catch (error) {
      console.error("An error occurred", error);
    }
  };

  return (
    <div className="flex flex-col p-1">
      <h1 className="text-lg underline">Plan Consent Requests List</h1>
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
                onClick={() => handleDeleteFolder(folder)}
              >
                {" "}
                Delete Folder
              </Button>
            </div>
          </ListItem>
        ))}
        {noFolder && <p>{message}</p>}
      </List>
    </div>
  );
};

export default PlanConsentReqsList;
