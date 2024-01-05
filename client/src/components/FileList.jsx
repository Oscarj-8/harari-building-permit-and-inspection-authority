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
    <List className="flex flex-col gap-3">
      {files.map((file) => (
        <ListItem key={file._id} className="border mx-4 p-4 rounded-lg">
          <ListItemText className="text-slate-900" primary={file.name} />
          <div className="flex flex-col gap-3">
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
            <Button className="bg-red-700 text-white hover:text-red-900 ">
              Delete File
            </Button>
          </div>
        </ListItem>
      ))}
    </List>
  );
};

export default FileList;
