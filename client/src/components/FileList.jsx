// // FileList.jsx

// import { useState, useEffect } from "react";
// import { List, ListItem, ListItemText } from "@mui/material";

// const FileList = () => {
//   const [files, setFiles] = useState([]);

//   useEffect(() => {
//     const fetchFiles = async () => {
//       try {
//         const response = await fetch("http://localhost:3000/api/files");
//         if (response.ok) {
//           const data = await response.json();
//           setFiles(data.files);
//         } else {
//           console.error(
//             "Error fetching files:",
//             response.status,
//             response.statusText
//           );
//         }
//       } catch (error) {
//         console.error("An error occurred", error);
//       }
//     };

//     fetchFiles();
//   }, []);

//   return (
//     <List>
//       {files.map((file) => (
//         <ListItem key={file._id}>
//           <ListItemText primary={file.name} />
//         </ListItem>
//       ))}
//     </List>
//   );
// };

// export default FileList;

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

  // const handleDownload = (fileContent, fileName) => {
  //   const blob = new Blob([fileContent], { type: "application/msword" });
  //   const link = document.createElement("a");
  //   link.href = URL.createObjectURL(blob);
  //   link.download = fileName;
  //   link.click();
  // };

  return (
    <List>
      {files.map((file) => (
        <ListItem key={file._id}>
          <ListItemText primary={file.name} />
          {/* <button
            onClick={() => {
              console.log("Downloading file:", file.name);
              handleDownload(atob(file.content), file.name);
            }}
          >
            Download
          </button> */}
          <a
            href={"data:application/msword;base64," + file.content}
            target="_blank"
            rel="noreferrer"
            download={file.name}
          >
            Download Link
          </a>
        </ListItem>
      ))}
    </List>
  );
};

export default FileList;
