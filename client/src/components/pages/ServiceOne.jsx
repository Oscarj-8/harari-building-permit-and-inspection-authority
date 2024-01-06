import { Button } from "@mui/material";
import { useRef, useState } from "react";
import AblazeLabsCV from "../../../public/documents/AblazeLabsCV.docx";

export default function ServiceOne() {
  const fileRef = useRef(null);
  const [file, setFile] = useState(undefined);
  const [fileUploadSuccess, setFileUploadSuccess] = useState(false);
  console.log(file);

  const handleImport = async () => {
    if (file) {
      const formData = new FormData();
      formData.append("file", file);

      try {
        const response = await fetch("http://localhost:3000/api/upload", {
          method: "POST",
          body: formData,
        });

        if (response.ok) {
          console.log("File uploaded successfully");
          setFileUploadSuccess(true);
          setTimeout(() => {
            setFileUploadSuccess(false);
          }, 5000);
        } else {
          console.error("File upload failed");
          setFileUploadSuccess(false);
        }
      } catch (error) {
        console.error("An error occurred", error);
      }
    }
  };

  return (
    <div className="flex items-center justify-center">
      <main className=" flex flex-col gap-8 w-full p-8">
        <div className="text-slate-700 text-lg text-center">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Natus
          nesciunt, autem maiores voluptatum facere possimus quibusdam vero
          cumque sint doloribus esse culpa deleniti ab voluptatibus dolorum
          voluptates quas dolor aliquam. Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Labore nemo beatae neque minus dignissimos magnam
          laborum ipsum, modi, repellendus aut incidunt ab. Nesciunt dolore
          corrupti quasi accusamus deserunt. Accusantium, sequi! Lorem ipsum,
          dolor sit amet consectetur adipisicing elit. Sunt, eaque in quam
          dolorem quidem veritatis consequatur modi dolores consectetur enim
          debitis. Consequatur, assumenda necessitatibus? Unde vero soluta sint
          fugiat dolor?
        </div>
        <div className="flex w-full items-center justify-center gap-8">
          <Button variant="contained" className="bg-blue-700 ">
            <a download="AblazeLabsCV.docx" href={AblazeLabsCV}>
              Download
            </a>
          </Button>
          <input
            type="file"
            ref={fileRef}
            id="file"
            className="hidden"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <Button
            variant="contained"
            onClick={() => fileRef.current.click()}
            className="bg-blue-700"
          >
            Import
          </Button>
          <Button
            variant="contained"
            onClick={handleImport}
            className="bg-blue-700"
            disabled={!file}
          >
            Upload to MongoDB
          </Button>
        </div>
        {fileUploadSuccess && (
          <p className="text-green-700 font-semibold text-center text-2xl">
            You have successfully Uploaded and sent the request, we will get in
            touch with in a few days
          </p>
        )}
      </main>
    </div>
  );
}
