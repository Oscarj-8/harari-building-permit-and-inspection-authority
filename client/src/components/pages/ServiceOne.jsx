import { Button } from "@mui/material";
import pdf from "../../assets/awaqi.pdf";

export default function ServiceOne() {
  return (
    <div
      className="flex items-center justify-center bg-slate-400"
      // style={{ height: "calc(100vh - 5rem)" }}
    >
      <main>
        <iframe
          src="https://docs.google.com/forms/d/e/1FAIpQLScX6M2901vmGQlFOJiUffYW1KhNjhf4vqIaTS5cjw2irxVwcA/viewform?embedded=true"
          width="640"
          height="957"
          style={{ overflow: "hidden" }}
        >
          Loading…
        </iframe>
        <Button variant="contained" className="bg-blue-700 ">
          <a download href={pdf}>
            Download
          </a>
        </Button>
      </main>
    </div>
  );
}
