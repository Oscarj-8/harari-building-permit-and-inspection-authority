import { useState, useEffect } from "react";
import { List, ListItem, ListItemText, Button } from "@mui/material";

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
    <List className="flex flex-wrap gap-3 items-center">
      {files.map((file) => (
        <ListItem
          key={file._id}
          className="flex flex-col items-start border mx-4 max-w-md p-4 w-1/3 rounded-lg shadow-sm hover:shadow-lg "
        >
          <ListItemText className="text-slate-900" primary={file.name} />
          <div className="flex gap-3">
            <Button variant="contained" className="bg-blue-700">
              <a
                href={"data:application/msword;base64," + file.content}
                target="_blank"
                rel="noreferrer"
                download={file.name}
              >
                Download File
              </a>
            </Button>
            <Button
              variant="contained"
              className="bg-red-700 hover:bg-red-700 "
            >
              Delete File
            </Button>
          </div>
        </ListItem>
      ))}
    </List>
  );
};

export default FileList;
