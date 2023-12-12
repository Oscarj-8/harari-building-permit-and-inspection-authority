import { Button } from "@mui/material";
import pdf from "../../assets/awaqi.pdf";

export default function ServiceOne() {
  return (
    <div
      className="flex items-center justify-center bg-slate-400"
      style={{ height: "calc(100vh - 5rem)" }}
    >
      <main>
        <Button variant="contained" className="bg-blue-700 ">
          <a download href={pdf}>
            Download
          </a>
        </Button>
      </main>
    </div>
  );
}
