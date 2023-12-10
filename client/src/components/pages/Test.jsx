import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Link } from "react-router-dom";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function BasicModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button onClick={handleOpen}>Open modal</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Text in a modal
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <ul className="flex flex-col items-center gap-4">
              <Link to="/service-one">
                <li className="hover:underline">Plan consent</li>
              </Link>
              <Link to="/service-two">
                <li className="hover:underline">
                  Design evaluation and building permit
                </li>
              </Link>
              <Link to="/service-three">
                <li className="hover:underline">
                  Building inspection and occupancy permit
                </li>
              </Link>
              <Link to="/service-four">
                <li className="hover:underline">Construction regulatory</li>
              </Link>
            </ul>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}
