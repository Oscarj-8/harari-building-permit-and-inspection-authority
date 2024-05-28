import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

let c = console.log.bind(document);

const Test = () => {
  const [educationLevel, setEducationLevel] = useState("");
  const [institution, setInstitution] = useState("");
  const [country, setCountry] = useState("");
  const [graduation, setGraduation] = useState("");
  const [qualification, setQualification] = useState("");
  const [remarks, setRemarks] = useState("");
  const [educationalData, setEducationalData] = useState([]);
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleEducationChange = (event) => {
    setEducationLevel(event.target.value);
  };

  const handleEducationDataAdd = () => {
    const formData = {
      educationLevel,
      institution,
      country,
      graduation,
      qualification,
      remarks,
    };
    const id = uuidv4();
    const entryWithId = { id, ...formData };
    setEducationalData((prevEducationData) => [
      ...prevEducationData,
      entryWithId,
    ]);

    // for (const [key, value] of Object.entries(entryWithId)) {
    //   c(key, value);
    // }

    // Object.entries(entryWithId).forEach((key, value) => c(key, value));

    Object.keys(entryWithId).forEach((key) => c(key));

    Object.values(entryWithId).forEach((value) => c(value));
    // Close the dialog or perform any other necessary actions
    handleClose();
    handleClose();
    // resetEducationLevelData();
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  return (
    <div>
      <Button
        onClick={handleClickOpen}
        variant="contained"
        disableElevation
        className="text-white bg-blue-700 h-8 normal-case"
      >
        Add
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add educational data</DialogTitle>
        <DialogContent>
          <div>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Description</InputLabel>
              <Select
                required
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={educationLevel}
                label="Description"
                onChange={handleEducationChange}
              >
                <MenuItem disabled>Select subcity</MenuItem>
                <MenuItem value="Elementary">Elementary</MenuItem>
                <MenuItem value="High school">High school</MenuItem>
                <MenuItem value="College/University (Diploma)">
                  College/University (Diploma)
                </MenuItem>
                <MenuItem value="College/University (BSC)">
                  College/University (BSC)
                </MenuItem>
                <MenuItem value="College/University (MSC)">
                  College/University (MSC)
                </MenuItem>{" "}
                <MenuItem value="College/University (PHD)">
                  College/University (PHD)
                </MenuItem>
                <MenuItem value="Research performed">
                  Research performed
                </MenuItem>
                <MenuItem value="Special training">Special training</MenuItem>
              </Select>
            </FormControl>
          </div>
          <TextField
            autoFocus
            required
            margin="dense"
            id="institution"
            name="institution"
            label="Name of institution"
            type="text"
            fullWidth
            variant="standard"
            value={institution}
            onChange={(event) => setInstitution(event.target.value)}
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="country"
            name="country"
            label="Country"
            type="text"
            fullWidth
            variant="standard"
            value={country}
            onChange={(event) => setCountry(event.target.value)}
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="year of graduation"
            name="year of graduation"
            label="Year of graduation"
            type="text"
            fullWidth
            variant="standard"
            value={graduation}
            onChange={(event) => setGraduation(event.target.value)}
          />{" "}
          <TextField
            autoFocus
            required
            margin="dense"
            id="qualification"
            name="qualification"
            label="Qualification"
            type="text"
            fullWidth
            variant="standard"
            value={qualification}
            onChange={(event) => setQualification(event.target.value)}
          />{" "}
          <TextField
            autoFocus
            required
            margin="dense"
            id="remarks"
            name="remarks"
            label="Any pertinent remarks"
            type="text"
            fullWidth
            variant="standard"
            value={remarks}
            onChange={(event) => setRemarks(event.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button
            disableElevation
            className="h-8 normal-case"
            onClick={handleClose}
          >
            Cancel
          </Button>
          <Button
            onClick={() => handleEducationDataAdd()}
            variant="contained"
            disableElevation
            className="text-white bg-blue-700 h-8 normal-case"
          >
            Done
          </Button>
        </DialogActions>
      </Dialog>

      <p>{educationalData.map((data) => data.remarks)}</p>
    </div>
  );
};

export default Test;
