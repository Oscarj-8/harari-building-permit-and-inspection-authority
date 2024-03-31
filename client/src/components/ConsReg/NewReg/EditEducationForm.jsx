import { useState } from "react";
import PropTypes from "prop-types";
import { v4 as uuidv4 } from "uuid";
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

const EditEducationForm = ({
  open,
  handleClose,
  selectedEducationalLevel,
  setSelectedEducationalLevel,
  setEducationalData,
  educationalData,
}) => {
  const [institution, setInstitution] = useState("");
  const [country, setCountry] = useState("");
  const [graduation, setGraduation] = useState("");
  const [qualification, setQualification] = useState("");
  const [remarks, setRemarks] = useState("");

  const handleEducationChange = (event) => {
    setSelectedEducationalLevel(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    formData.append("education level", selectedEducationalLevel);
    const formJson = Object.fromEntries(formData.entries());
    const id = uuidv4();
    const entryWithId = { id, ...formJson };

    setEducationalData([...educationalData, entryWithId]);

    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Add educational data</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <div>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Description</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={selectedEducationalLevel}
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
                </MenuItem>
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
            id="year_of_graduation"
            name="year_of_graduation"
            label="Year of graduation"
            type="text"
            fullWidth
            variant="standard"
            value={graduation}
            onChange={(event) => setGraduation(event.target.value)}
          />
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
          />
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
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit">Done</Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};

EditEducationForm.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  selectedEducationalLevel: PropTypes.string.isRequired,
  setSelectedEducationalLevel: PropTypes.func.isRequired,
  setEducationalData: PropTypes.func.isRequired,
  educationalData: PropTypes.array.isRequired,
};

export default EditEducationForm;
