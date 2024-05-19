import PropTypes from "prop-types";

export const PdfViewer = ({ src }) => {
  return (
    <div>
      <iframe title="PDF Viewer" src={src} width="100%" height="600px" />
    </div>
  );
};

// export default PdfViewer;

export const PdfViewer2 = ({ src }) => {
  return (
    <div>
      <iframe title="PDF Viewer" src={src} width="100%" height="600px" />
    </div>
  );
};

PdfViewer.propTypes = {
  src: PropTypes.string.isRequired,
};

PdfViewer2.propTypes = {
  src: PropTypes.string.isRequired,
};
