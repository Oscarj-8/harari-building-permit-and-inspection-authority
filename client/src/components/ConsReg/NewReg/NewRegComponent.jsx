import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import {
  newLicenseFormGuide,
  newLicenseFormGuideInstruction,
} from "../../../data/constants.js";
import PdfViewer from "../../PDFViewr.jsx";
import { useFormik } from "formik";
import * as Yup from "yup";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import FormControl from "@mui/material/FormControl";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import EditEducationForm from "./EditEducationForm.jsx";

const steps = ["Read Instruction", "Fill Form", "Get Confirmation"];

const NewRegComponent = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set());
  const [value, setValue] = useState("female");
  const [selectedSubcity, setSelectedSubcity] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [open, setOpen] = useState(false);
  const [selectedEducationalLevel, setSelectedEducationalLevel] = useState("");
  const [institution, setInstitution] = useState("");
  const [country, setCountry] = useState("");
  const [graduation, setGraduation] = useState("");
  const [qualification, setQualification] = useState("");
  const [remarks, setRemarks] = useState("");
  const [educationalData, setEducationalData] = useState([]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  const handleSubCityChange = (event) => {
    setSelectedSubcity(event.target.value);
  };
  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  // modal functions
  const handleEducationChange = (event) => {
    setSelectedEducationalLevel(event.target.value);
  };

  const handlRemoveEducation = (id) => {
    const updatedEducationalData = educationalData.filter(
      (data) => data.id !== id
    );
    setEducationalData(updatedEducationalData);
  };

  const formik = useFormik({
    initialValues: {},
    validationSchema: Yup.object({}),
    onSubmit: async (values) => {},
  });

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-lg font-medium">
        New Registration of Professionals License
      </h1>
      <hr className="" />
      <p className="text-gray-700">{newLicenseFormGuide[0].description}</p>
      <Accordion className="mb-8">
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
          className="bg-gray-200"
        >
          Application form guide
        </AccordionSummary>
        <AccordionDetails className=" px-8">
          <ul className="flex flex-col gap-2">
            {newLicenseFormGuide.slice(1).map((step, index) => (
              <li className="list-decimal" key={index}>
                {step.text}
              </li>
            ))}
          </ul>
        </AccordionDetails>
      </Accordion>
      <Box className="border p-2 bg-gray-100 rounded-md" sx={{ width: "100%" }}>
        <Stepper
          className="border-b border-black md:border-none"
          activeStep={activeStep}
        >
          {steps.map((label, index) => {
            const stepProps = {};
            const labelProps = {};

            if (isStepSkipped(index)) {
              stepProps.completed = false;
            }
            return (
              <Step key={label} {...stepProps}>
                <StepLabel {...labelProps}>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
        {activeStep === steps.length ? (
          <>
            <Typography sx={{ mt: 2, mb: 1 }}>
              All steps completed - you&apos;re finished
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Box sx={{ flex: "1 1 auto" }} />
              <Button onClick={handleReset}>Reset</Button>
            </Box>
          </>
        ) : (
          <div className="mt-8">
            {activeStep === 0 && (
              <div className="flex flex-col gap-4">
                <h3 className="font-medium text-lg -mb-6">
                  Service Description
                </h3>
                <div className="flex flex-col">
                  {newLicenseFormGuideInstruction.map((item) => (
                    <div className="flex flex-col" key={item.id}>
                      <h4 className="font-medium mt-4" key={item.id}>
                        {item.title}
                      </h4>
                      {Array.isArray(item.text) ? (
                        <ul className="list-decimal">
                          {item.text.map((textItem, index) => (
                            <li className="ml-8" key={index}>
                              {textItem}
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p>{item.text}</p>
                      )}
                    </div>
                  ))}
                </div>
                <div className="max-w-[50em]">
                  <h4 className="font-medium">List of attached files</h4>
                  <Accordion>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1-content"
                      id="panel1-header"
                      className="bg-gray-200 underline"
                    >
                      File : Registration directive.pdf
                    </AccordionSummary>
                    <AccordionDetails>
                      <PdfViewer />
                    </AccordionDetails>
                  </Accordion>
                </div>
                <Alert severity="info">
                  <AlertTitle>Info</AlertTitle>
                  <p>
                    By continuing using the system you certify that you have
                    read the above service request instruction and accept the
                    applicable
                  </p>
                  <span>
                    <a className="underline text-[#0f3c51] font-medium" href="">
                      Terms and Conditions
                    </a>
                  </span>
                </Alert>
              </div>
            )}
            {activeStep === 1 && (
              <form onSubmit={formik.handleSubmit}>
                <div className="flex flex-col gap-2">
                  <TextField
                    required
                    id="filled-required"
                    label="Applicant Full Name"
                    defaultValue=""
                    variant="filled"
                    size="small"
                  />
                  <FormLabel id="demo-controlled-radio-buttons-group">
                    Gender
                  </FormLabel>
                  <RadioGroup
                    row
                    aria-labelledby="demo-controlled-radio-buttons-group"
                    name="controlled-radio-buttons-group"
                    value={value}
                    onChange={handleChange}
                  >
                    <FormControlLabel
                      value="female"
                      control={<Radio />}
                      label="Female"
                    />
                    <FormControlLabel
                      value="male"
                      control={<Radio />}
                      label="Male"
                    />
                  </RadioGroup>
                  <TextField
                    required
                    id="filled-required"
                    label="City"
                    defaultValue=""
                    variant="filled"
                    size="small"
                  />
                  <TextField
                    required
                    id="filled-required"
                    label="Woreda/Kebele"
                    defaultValue=""
                    variant="filled"
                    size="small"
                  />
                  <TextField
                    required
                    id="filled-required"
                    label="Mobile Phone"
                    defaultValue="number"
                    variant="filled"
                    size="small"
                  />
                  <TextField
                    required
                    id="filled-required"
                    label="House Number"
                    type="number"
                    defaultValue=""
                    variant="filled"
                    size="small"
                  />
                  <div>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">
                        Sub city
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={selectedSubcity}
                        label="Sub city"
                        onChange={handleSubCityChange}
                      >
                        <MenuItem disabled>Select subcity</MenuItem>
                        <MenuItem value="Bole subcity">Bole subcity</MenuItem>
                        <MenuItem value="Gulele subcity">
                          Gulele subcity
                        </MenuItem>
                        <MenuItem value="NifasSilk subcity">
                          NifasSilk subcity
                        </MenuItem>
                        <MenuItem value="Addis Ketema subcity">
                          Addis Ketema subcity
                        </MenuItem>
                      </Select>
                    </FormControl>
                  </div>
                  <div>
                    <label htmlFor="date-picker">Date of application</label>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DemoContainer components={["DatePicker"]}>
                        <DatePicker
                          label="Basic date picker"
                          id="date-picker"
                          name="date-picker"
                          value={selectedDate}
                          onChange={handleDateChange}
                        />
                      </DemoContainer>
                    </LocalizationProvider>
                  </div>
                  <div className="flex flex-col gap-3 items-center justify-center">
                    <div className="w-full flex justify-between">
                      <label> Educational data</label>
                      <Button
                        onClick={handleClickOpen}
                        variant="contained"
                        disableElevation
                        className="text-white bg-blue-700 h-8 normal-case"
                      >
                        Add
                      </Button>
                    </div>
                    <Dialog
                      open={open}
                      onClose={handleClose}
                      PaperProps={{
                        component: "form",
                        onSubmit: (event) => {
                          event.preventDefault();
                          const formData = new FormData(event.currentTarget);
                          formData.append(
                            "education level",
                            selectedEducationalLevel
                          );
                          const formJson = Object.fromEntries(
                            formData.entries()
                          );
                          const id = uuidv4();
                          const entryWithId = { id, ...formJson };

                          setEducationalData([...educationalData, entryWithId]);

                          handleClose();
                        },
                      }}
                    >
                      <DialogTitle>Add educational data</DialogTitle>
                      <DialogContent>
                        <div>
                          <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">
                              Description
                            </InputLabel>
                            <Select
                              labelId="demo-simple-select-label"
                              id="demo-simple-select"
                              value={selectedEducationalLevel}
                              label="Description"
                              onChange={handleEducationChange}
                            >
                              <MenuItem disabled>Select subcity</MenuItem>
                              <MenuItem value="Elementary">Elementary</MenuItem>
                              <MenuItem value="High school">
                                High school
                              </MenuItem>
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
                              <MenuItem value="Special training">
                                Special training
                              </MenuItem>
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
                          onChange={(event) =>
                            setInstitution(event.target.value)
                          }
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
                          onChange={(event) =>
                            setGraduation(event.target.value)
                          }
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
                          onChange={(event) =>
                            setQualification(event.target.value)
                          }
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
                          type="submit"
                          variant="contained"
                          disableElevation
                          className="text-white bg-blue-700 h-8 normal-case"
                        >
                          Done
                        </Button>
                      </DialogActions>
                    </Dialog>
                    <EditEducationForm
                      open={open}
                      handleClose={handleClose}
                      selectedEducationalLevel={selectedEducationalLevel}
                      setSelectedEducationalLevel={setSelectedEducationalLevel}
                      setEducationalData={setEducationalData}
                      educationalData={educationalData}
                    />
                    <TableContainer component={Paper}>
                      <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                          <TableRow>
                            <TableCell>Description</TableCell>
                            <TableCell align="right">
                              Name of institution
                            </TableCell>
                            <TableCell align="right">Country</TableCell>
                            <TableCell align="right">
                              Year of graduation
                            </TableCell>
                            <TableCell align="right">Qualification</TableCell>
                            <TableCell align="right">
                              Any pertinent remarks
                            </TableCell>
                            <TableCell align="right">Actions</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {educationalData.map((data, index) => (
                            <TableRow key={index}>
                              <TableCell>{data["education level"]}</TableCell>
                              <TableCell align="right">
                                {data["institution"]}
                              </TableCell>
                              <TableCell align="right">
                                {data["country"]}
                              </TableCell>
                              <TableCell align="right">
                                {data["year of graduation"]}
                              </TableCell>
                              <TableCell align="right">
                                {data["qualification"]}
                              </TableCell>
                              <TableCell align="right">
                                {data["remarks"]}
                              </TableCell>
                              <TableCell align="right">
                                <div className="flex gap-2">
                                  <DeleteForeverIcon
                                    onClick={() =>
                                      handlRemoveEducation(data.id)
                                    }
                                    className="text-red-600 hover:bg-red-200 rounded-full p-1 size-8 transition-all duration-300 ease-in-out "
                                  />
                                  <EditIcon className="text-blue-600 hover:bg-blue-200 rounded-full p-1 size-8 transition-all duration-300 ease-in-out " />
                                </div>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </div>
                </div>
              </form>
            )}
            {activeStep === 2 && (
              <form>
                <TextField label="Field 1" fullWidth />
                <TextField label="Field 2" fullWidth />
              </form>
            )}
            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Button
                variant="contained"
                disableElevation
                className="text-white bg-blue-700"
                disabled={activeStep === 0}
                onClick={handleBack}
              >
                Back
              </Button>
              <Box sx={{ flex: "1 1 auto" }} />

              <Button
                onClick={handleNext}
                variant="contained"
                disableElevation
                className="text-white bg-blue-700"
              >
                {activeStep === steps.length - 1 ? "Finish" : "Next"}
              </Button>
            </Box>
          </div>
        )}
      </Box>
    </div>
  );
};

export default NewRegComponent;
