// // import { useState, useEffect } from "react";
// // import { List, ListItem, ListItemText, Button } from "@mui/material";

// // const FileList = () => {
// //   const [files, setFiles] = useState([]);

// //   useEffect(() => {
// //     const fetchFiles = async () => {
// //       try {
// //         const response = await fetch("/api/files");
// //         if (response.ok) {
// //           const data = await response.json();
// //           setFiles(data.files);
// //         } else {
// //           console.error(
// //             "Error fetching files:",
// //             response.status,
// //             response.statusText
// //           );
// //         }
// //       } catch (error) {
// //         console.error("An error occurred", error);
// //       }
// //     };

// //     fetchFiles();
// //   }, []);

// //   return (
// //     <List className="flex flex-wrap gap-3 items-strech">
// //       {files.map((file) => (
// //         <ListItem
// //           key={file._id}
// //           className="flex flex-col items-start border mx-4 max-w-md p-4 w-1/3 rounded-lg shadow-sm hover:shadow-lg "
// //         >
// //           <ListItemText className="text-slate-900" primary={file.name} />
// //           <div className="flex gap-3">
// //             <Button variant="contained" className="bg-blue-700">
// //               <a
// //                 href={"data:application/msword;base64," + file.content}
// //                 target="_blank"
// //                 rel="noreferrer"
// //                 download={file.name}
// //               >
// //                 Download File
// //               </a>
// //             </Button>
// //             <Button
// //               variant="contained"
// //               className="bg-red-700 hover:bg-red-700 "
// //             >
// //               Delete File
// //             </Button>
// //           </div>
// //         </ListItem>
// //       ))}
// //     </List>
// //   );
// // };

// // export default FileList;

// import { useState, useEffect } from "react";
// import { List, ListItem, ListItemText, Button } from "@mui/material";

// const FileList = () => {
//   const [files, setFiles] = useState([]);

//   useEffect(() => {
//     const fetchFiles = async () => {
//       try {
//         const response = await fetch("/api/files");
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
//     <List className="flex flex-wrap gap-3 items-strech">
//       {files.map((file) => (
//         <ListItem
//           key={file._id}
//           className="flex flex-col items-start border mx-4 max-w-md p-4 w-1/3 rounded-lg shadow-sm hover:shadow-lg "
//         >
//           <ListItemText className="text-slate-900" primary={file.name} />
//           <div className="flex gap-3">
//             <Button variant="contained" className="bg-blue-700">
//               <a
//                 href={"data:application/msword;base64," + file.content}
//                 target="_blank"
//                 rel="noreferrer"
//                 download={file.name}
//               >
//                 Download File
//               </a>
//             </Button>
//             <Button
//               variant="contained"
//               className="bg-red-700 hover:bg-red-700 "
//             >
//               Delete File
//             </Button>
//           </div>
//           {/* Display folder information */}
//           <div className="mt-2">
//             <strong>Folder:</strong> {file.folder}
//             <br />
//             <strong>Folder Content:</strong>
//             <ul>
//               {file.content.map((item) => (
//                 <li key={item}>{item}</li>
//               ))}
//             </ul>
//           </div>
//         </ListItem>
//       ))}
//     </List>
//   );
// };

// export default FileList;

import { useState, useEffect } from "react";
import { List, ListItem, Button } from "@mui/material";

const FileList = () => {
  const [files, setFiles] = useState([]);

  const fetchFiles = async () => {
    try {
      const response = await fetch("/api/files", {
        method: "GET",
        headers: {
          Accept: "application/zip", // Set the expected response type
        },
      });

      if (response.ok) {
        // Handle binary response
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "files.zip");

        // Display the download button
        const downloadButton = (
          <Button
            key="downloadButton"
            variant="contained"
            className="bg-blue-700"
            onClick={() => link.click()}
          >
            Download Files
          </Button>
        );

        setFiles([downloadButton]);
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

  useEffect(() => {
    fetchFiles();
  }, []);

  return (
    <List className="flex flex-wrap gap-3 items-stretch">
      {files.map((item, index) => (
        <ListItem
          key={index}
          className="flex flex-col items-start border mx-4 max-w-md p-4 w-1/3 rounded-lg shadow-sm hover:shadow-lg "
        >
          {item}
        </ListItem>
      ))}
    </List>
  );
};

export default FileList;
