import PDF from "../../public/9ab615bc-9f05-4c98-ab99-19ec88e5f201.pdf";
const PdfViewer = () => {
  return (
    <div>
      <iframe title="PDF Viewer" src={PDF} width="100%" height="600px" />
    </div>
  );
};

export default PdfViewer;
