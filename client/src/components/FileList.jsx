// FileList.jsx

import { useState, useEffect } from "react";
import { List, ListItem, ListItemText } from "@mui/material";

const FileList = () => {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/files");
        if (response.ok) {
          const data = await response.json();
          setFiles(data.files);
        } else {
          console.error(
            "Error fetching files:",
            response.status,
            response.statusText
          );
        }
      } catch (error) {
        console.error("An error occurred", error);
      }
    };

    fetchFiles();
  }, []);

  return (
    <List>
      {files.map((file) => (
        <ListItem key={file._id}>
          <ListItemText primary={file.name} />
        </ListItem>
      ))}
    </List>
  );
};

export default FileList;
