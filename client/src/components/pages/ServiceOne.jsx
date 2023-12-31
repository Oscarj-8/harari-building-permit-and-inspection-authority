import { Button } from "@mui/material";
import { useRef, useState } from "react";
import pdf from "../../assets/awaqi.pdf";

export default function ServiceOne() {
  const fileRef = useRef(null);
  const [file, setFile] = useState(undefined);
  console.log(file);
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
            <a download href={pdf}>
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
        </div>
      </main>
    </div>
  );
}
