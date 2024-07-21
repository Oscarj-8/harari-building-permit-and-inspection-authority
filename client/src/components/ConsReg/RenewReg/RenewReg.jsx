import { useState } from "react";
import { useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
// import Accordion from "@mui/material/Accordion";
// import AccordionSummary from "@mui/material/AccordionSummary";
// import AccordionDetails from "@mui/material/AccordionDetails";
// import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
// import Stepper from "@mui/material/Stepper";
// import Step from "@mui/material/Step";
// import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Snackbar from "@mui/material/Snackbar";
import { renewLicenseFormGuide } from "../../../data/constants";
import { useFormik } from "formik";
import * as Yup from "yup";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
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
import DescriptionIcon from "@mui/icons-material/Description";
import ChevronRight from "@mui/icons-material/ChevronRight";
import ChevronLeft from "@mui/icons-material/ChevronLeft";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CircularProgress from "@mui/material/CircularProgress";
import SendIcon from "@mui/icons-material/Send";
import { postNewConstRegForm } from "../../../services/service.js";
import ReusableModal from "../../ReusableModal.jsx";

const steps = ["Read Instruction", "Fill Form", "Get Confirmation"];

const RenewReg = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);
  const [openError, setOpenError] = useState(false);
  const [logInError, setLogInError] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [formStep, setFormStep] = useState(1);
  const [skipped, setSkipped] = useState(new Set());
  const [successOpen, setSuccessOpen] = useState(false);
  // const handleClose = () => setSuccessOpen(false);
  const [open, setOpen] = useState(false);
  //step one form values
  const [educationalInstitution, setEducationalInstitution] = useState("");
  const [fieldOfStudy, setFieldOfStudy] = useState("");
  const [professionalTitle, setProfessionalTitle] = useState("");
  const [educationalData, setEducationalData] = useState([]);
  const [filesArray, setFilesArray] = useState([]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    formik.setFieldValue("educationalData", educationalData, true);
    setOpen(false);
    setSuccessOpen(false);
  };

  const handleErrorClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenError(false);
    setLogInError(false);
  };

  // Function to display error and disable scrolling

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

  const captureFile = (event, fieldName) => {
    const newFile = event.target.files[0];
    setFilesArray((prevFilesArray) => [...prevFilesArray, newFile]);
    formik.setFieldValue(fieldName, newFile);
  };

  const handlRemoveEducation = (id) => {
    const updatedEducationalData = educationalData.filter(
      (data) => data.id !== id
    );
    setEducationalData(updatedEducationalData);
  };

  const resetEducationLevelData = () => {
    setEducationalInstitution("");
    setFieldOfStudy("");
    setProfessionalTitle("");
  };

  const handleEducationDataAdd = () => {
    const formData = {
      educationalInstitution,
      fieldOfStudy,
      professionalTitle,
    };
    const id = uuidv4();
    const entryWithId = { id, ...formData };
    setEducationalData((prevEducationData) => [
      ...prevEducationData,
      entryWithId,
    ]);
    // Close the dialog or perform any other necessary actions
    handleClose();
    handleClose();
    resetEducationLevelData();
  };

  const formik = useFormik({
    initialValues: {
      applicantType: "",
      fullName: "",
      gender: "",
      city: "",
      woreda: "",
      mobilePhone: "",
      houseNumber: "",
      kebele: "",
      currentOrganization: "",
      licenseRenewalStatus: "",
      educationalData: [],
      profLicense: null,
      idCard: null,
      educationEvidence: null,
      COC: null,
      applicantPhoto: null,
      workExperience: "",
      competencyCertification: null,
      businessLicense: null,
      workExperiencePDF: null,
      delegationLetter: null,
      repID: null,
    },
    validationSchema: Yup.object().shape({
      applicantType: Yup.string().required("Applicant type is required"),
      fullName: Yup.string().required("Full name is required"),
      gender: Yup.string().required("Gender is required"),
      city: Yup.string().required("City is required"),
      woreda: Yup.string().required("Woreda is required"),
      mobilePhone: Yup.number().required("Mobile is required"),
      houseNumber: Yup.number().required("House number is required"),
      kebele: Yup.string().required("Kebele is required"),
      currentOrganization: Yup.string().required(
        "Current organization is required"
      ),
      licenseRenewalStatus: Yup.string().required(
        "License renewal status is required"
      ),
      // educationalData: Yup.array().required("educationalData is required"),
      profLicense: Yup.string().required("Professional license is required"),
      idCard: Yup.mixed().required("Id is required"),
      educationEvidence: Yup.mixed().required("education evidence is required"),
      COC: Yup.mixed().required("COC is required"),
      applicantPhoto: Yup.mixed().required("Applicant photo is required"),
      workExperience: Yup.string()
        .required("Work experience is required")
        .oneOf(
          ["The manager of PLC or Enterprise member", "Employee", "Unemployed"],
          "Invalid work experience"
        ),
      competencyCertification: Yup.mixed()
        .nullable()
        .test(
          "workExperience",
          "Competency certification is required",
          function (value) {
            return this.parent.workExperience ===
              "The manager of PLC or Enterprise member"
              ? !!value
              : true;
          }
        ),
      businessLicense: Yup.mixed()
        .nullable()
        .test(
          "workExperience",
          "Business license is required",
          function (value) {
            return this.parent.workExperience ===
              "The manager of PLC or Enterprise member"
              ? !!value
              : true;
          }
        ),
    }),
    onSubmit: async (values) => {
      if (!formik.isValid) {
        console.error("Form submission failed due to validation errors");
        return;
      }

      try {
        setLoading(true);
        const formData = new FormData();

        if (currentUser === null) {
          setLogInError(true);
          setLoading(false);
          return;
        }

        for (const key in values) {
          const value = values[key];
          if (value instanceof File) {
            formData.append(key, value);
          } else {
            formData.append(key, value);
          }
        }

        const edu = JSON.stringify(educationalData);

        formData.educationalData = edu;
        // for (const [key, value] of formData) {
        //   console.log(key, value);
        // }
        // for (const [key, value] of formData.entries()) {
        //   console.log(key, value);
        // }

        const { statusCode } = await postNewConstRegForm(formData);

        if (statusCode !== 201) {
          setOpenError(true);
          setLoading(false);
        } else {
          setSuccessOpen(true);
          setLoading(false);
        }
      } catch (error) {
        setOpenError(true);
        setLoading(false);
        console.error("An error occurred", error);
      }
    },
  });

  return (
    <div className="relative flex flex-col gap-4">
      <h1 className="text-lg font-medium">Renewal of Professionals License </h1>
      <hr className="" />
      <p className="text-gray-700">{renewLicenseFormGuide[0].description}</p>
      <Box
        className="border p-2 flex flex-col gap-4 bg-gray-50 rounded-md"
        sx={{ width: "100%" }}
      >
        <h1 className="text-slate-600 text-xl font-light"> Fill form</h1>
        <hr />
        {activeStep === 0 && (
          <div className="flex flex-col">
            <h3 className="text-lg -mb-6">Service Description</h3>
            <div className="flex flex-col gap-2">
              {renewLicenseFormGuide.map((item) => (
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
            <p className="font-medium">
              N.B{" "}
              <span className="font-normal">
                The file that you have attached must be in PDF format.
              </span>
            </p>
            <Alert severity="info">
              <AlertTitle>Info</AlertTitle>
              <p>
                By continuing using the system you certify that you have read
                the above service request instruction and accept the applicable
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
            <div className="flex w-full mb-6">
              <p
                onClick={() => setFormStep(1)}
                className={`flex items-center justify-center gap-1 w-[8em] p-2 border rounded-tl-md cursor-pointer ${
                  formStep == 1 ? "bg-blue-700 text-white" : ""
                }`}
              >
                <DescriptionIcon />
                Page 1
              </p>
              <p
                onClick={() => setFormStep(2)}
                className={`flex items-center justify-center gap-1 w-[8em] p-2 border rounded-tr-md cursor-pointer ${
                  formStep == 2 ? "bg-blue-700 text-white" : ""
                }`}
              >
                <DescriptionIcon />
                Page 2
              </p>
            </div>
            {formStep === 1 && (
              <div className="flex flex-col gap-6">
                <Box>
                  <FormLabel id="demo-controlled-radio-buttons-group">
                    Applicant type{" "}
                  </FormLabel>
                  <RadioGroup
                    row
                    aria-labelledby="demo-controlled-radio-buttons-group"
                    name="applicantType"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.applicantType}
                  >
                    <FormControlLabel
                      value="owner"
                      control={<Radio />}
                      label="Owner"
                    />
                    <FormControlLabel
                      value="representative"
                      control={<Radio />}
                      label="Representative"
                    />
                  </RadioGroup>
                  {formik.touched.applicantType &&
                  formik.errors.applicantType ? (
                    <div className="text-red-600">
                      {formik.errors.applicantType}
                    </div>
                  ) : null}
                </Box>
                <TextField
                  required
                  id="fullName"
                  label="Applicant Full Name"
                  variant="filled"
                  size="small"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.fullName}
                />
                {formik.touched.fullName && formik.errors.fullName ? (
                  <div className="text-red-600">{formik.errors.fullName}</div>
                ) : null}
                <Box>
                  <FormLabel id="demo-controlled-radio-buttons-group">
                    Gender
                  </FormLabel>
                  <RadioGroup
                    row
                    aria-labelledby="demo-controlled-radio-buttons-group"
                    name="gender"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.gender}
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
                  {formik.touched.gender && formik.errors.gender ? (
                    <div className="text-red-600">{formik.errors.gender}</div>
                  ) : null}
                </Box>
                <TextField
                  required
                  id="city"
                  label="City"
                  variant="filled"
                  size="small"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.city}
                />
                {formik.touched.city && formik.errors.city ? (
                  <div className="text-red-600">{formik.errors.city}</div>
                ) : null}
                <TextField
                  required
                  id="mobilePhone"
                  label="Mobile Phone"
                  variant="filled"
                  size="small"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.mobilePhone}
                />
                {formik.touched.mobilePhone && formik.errors.mobilePhone ? (
                  <div className="text-red-600">
                    {formik.errors.mobilePhone}
                  </div>
                ) : null}
                <TextField
                  required
                  name="houseNumber"
                  label="House Number"
                  type="number"
                  variant="filled"
                  size="small"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.houseNumber}
                />
                {formik.touched.houseNumber && formik.errors.houseNumber ? (
                  <div className="text-red-600">
                    {formik.errors.houseNumber}
                  </div>
                ) : null}
                <Box>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      kebele
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      name="kebele"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.kebele}
                      label="Woreda"
                    >
                      <MenuItem disabled>Select kebele</MenuItem>
                      <MenuItem value="01">01 </MenuItem>
                      <MenuItem value="02">02</MenuItem>
                      <MenuItem value="03">03</MenuItem>
                      <MenuItem value="04">04</MenuItem>
                      <MenuItem value="05">05</MenuItem>
                      <MenuItem value="06">06 </MenuItem>
                      <MenuItem value="07">07 </MenuItem>
                      <MenuItem value="08">08</MenuItem>
                      <MenuItem value="09">09</MenuItem>
                      <MenuItem value="10">10</MenuItem>
                      <MenuItem value="11">11</MenuItem>
                      <MenuItem value="12">12 </MenuItem>
                      <MenuItem value="13">13 </MenuItem>
                      <MenuItem value="14">14</MenuItem>
                      <MenuItem value="15">15</MenuItem>
                      <MenuItem value="16">16</MenuItem>
                      <MenuItem value="17">17</MenuItem>
                      <MenuItem value="18">18 </MenuItem>
                    </Select>
                  </FormControl>
                </Box>
                {formik.touched.kebele && formik.errors.kebele ? (
                  <div className="text-red-600">{formik.errors.kebele}</div>
                ) : null}
                <Box>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Woreda
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      name="woreda"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.woreda}
                      label="Woreda"
                    >
                      <MenuItem disabled>Select woreda</MenuItem>
                      <MenuItem value="Abadir">Abadir </MenuItem>
                      <MenuItem value="Aboker">Aboker</MenuItem>
                      <MenuItem value="Amir nur">Amir nur</MenuItem>
                      <MenuItem value="Dire yeyara">Dire yeyara</MenuItem>
                      <MenuItem value="Erer">Erer</MenuItem>
                      <MenuItem value="Hakim">Hakim</MenuItem>
                      <MenuItem value="Jeneala">Jeneala</MenuItem>
                      <MenuItem value="Shenkor">Shenkor</MenuItem>
                      <MenuItem value="Sofi">Sofi </MenuItem>
                    </Select>
                  </FormControl>
                </Box>
                {formik.touched.woreda && formik.errors.woreda ? (
                  <div className="text-red-600">{formik.errors.woreda}</div>
                ) : null}
                <TextField
                  required
                  name="currentOrganization"
                  label="Currently working at (Name of Organization)"
                  variant="filled"
                  size="small"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.currentOrganization}
                />
                {formik.touched.currentOrganization &&
                formik.errors.currentOrganization ? (
                  <div className="text-red-600">
                    {formik.errors.currentOrganization}
                  </div>
                ) : null}
                <Box>
                  <FormLabel id="demo-controlled-radio-buttons-group">
                    Did you apply for renewal of professionals license{" "}
                  </FormLabel>
                  <RadioGroup
                    row
                    aria-labelledby="demo-controlled-radio-buttons-group"
                    name="licenseRenewalStatus"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.licenseRenewalStatus}
                  >
                    <FormControlLabel
                      value="yes"
                      control={<Radio />}
                      label="Yes"
                    />
                    <FormControlLabel
                      value="no"
                      control={<Radio />}
                      label="No"
                    />
                  </RadioGroup>
                  {formik.touched.licenseRenewalStatus &&
                  formik.errors.licenseRenewalStatus ? (
                    <div className="text-red-600">
                      {formik.errors.licenseRenewalStatus}
                    </div>
                  ) : null}
                </Box>
                <div className="flex flex-col gap-3 items-center justify-center">
                  <div className="w-full flex justify-between">
                    <label> Education *</label>
                    <Button
                      onClick={handleClickOpen}
                      variant="contained"
                      disableElevation
                      className="text-white bg-blue-700 h-8 normal-case"
                    >
                      Add
                    </Button>
                  </div>
                  <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>Add educational data</DialogTitle>
                    <DialogContent>
                      <TextField
                        autoFocus
                        required
                        margin="dense"
                        id="educationalInstitution"
                        name="educationalInstitution"
                        label="Educational institution"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={educationalInstitution}
                        onChange={(event) =>
                          setEducationalInstitution(event.target.value)
                        }
                      />
                      <TextField
                        autoFocus
                        required
                        margin="dense"
                        id="fieldOfStudy"
                        name="fieldOfStudy"
                        label="Field of study"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={fieldOfStudy}
                        onChange={(event) =>
                          setFieldOfStudy(event.target.value)
                        }
                      />
                      <TextField
                        autoFocus
                        required
                        margin="dense"
                        id="professionalTitle"
                        name="professionalTitle"
                        label="Professional title (Certificate,Diploma, Degree)"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={professionalTitle}
                        onChange={(event) =>
                          setProfessionalTitle(event.target.value)
                        }
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
                  <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          <TableCell>Educational institution</TableCell>
                          <TableCell align="left">Field of study</TableCell>
                          <TableCell align="left">Professional title</TableCell>
                          <TableCell align="left">Actions</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {educationalData.map((data, index) => (
                          <TableRow key={index}>
                            <TableCell>
                              {data["educationalInstitution"]}
                            </TableCell>
                            <TableCell align="left">
                              {data["fieldOfStudy"]}
                            </TableCell>
                            <TableCell align="left">
                              {data["professionalTitle"]}
                            </TableCell>
                            <TableCell align="left">
                              <div className="flex gap-2">
                                <DeleteForeverIcon
                                  onClick={() => handlRemoveEducation(data.id)}
                                  className="text-red-600 hover:bg-red-200 rounded-full p-1 size-8 transition-all duration-300 ease-in-out "
                                />
                                <EditIcon className="text-blue-600 hover:bg-blue-200 rounded-full p-1 size-8 transition-all duration-300 ease-in-out" />
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </div>
                <Button
                  onClick={() => setFormStep(2)}
                  variant="outlined"
                  className="self-end pr-1 w-[7.3em]"
                >
                  <p>Page 2</p>
                  <ChevronRight sx={{ marginBottom: "1px" }} />
                </Button>
              </div>
            )}

            {formStep === 2 && (
              <div className="flex flex-col gap-6">
                {formik.values.applicantType === "representative" && (
                  <>
                    <div className="flex flex-col gap-2">
                      <label className="font-medium">Delegation letter *</label>
                      <input
                        multiple
                        type="file"
                        onChange={(event) =>
                          captureFile(event, "delegationLetter")
                        }
                        name="delegationLetter"
                      />
                      {formik.touched.delegationLetter &&
                      formik.errors.delegationLetter ? (
                        <div className="text-red-600">
                          {formik.errors.delegationLetter}
                        </div>
                      ) : null}
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="font-medium">
                        {" "}
                        Representative id *
                      </label>
                      <input
                        multiple
                        type="file"
                        onChange={(event) => captureFile(event, "repID")}
                        name="repID"
                      />
                      {formik.touched.repID && formik.errors.repID ? (
                        <div className="text-red-600">
                          {formik.errors.repID}
                        </div>
                      ) : null}
                    </div>
                  </>
                )}
                <div className="flex flex-col gap-2">
                  <label className="font-medium">
                    Professional License (Front & Back) *
                  </label>
                  <input
                    multiple
                    type="file"
                    onChange={(event) => captureFile(event, "profLicense")}
                    name="profLicense"
                  />
                  {formik.touched.profLicense && formik.errors.profLicense ? (
                    <div className="text-red-600">
                      {formik.errors.profLicense}
                    </div>
                  ) : null}
                </div>
                <hr />
                <div className="flex flex-col gap-2">
                  <label className="font-medium">
                    Renewed Resident ID card/Driving License/Passport(Front and
                    Back) *
                  </label>
                  <input
                    type="file"
                    onChange={(event) => captureFile(event, "idCard")}
                    name="idCard"
                  />
                  {formik.touched.idCard && formik.errors.idCard ? (
                    <div className="text-red-600">{formik.errors.idCard}</div>
                  ) : null}
                </div>
                <hr />
                <div className="flex flex-col gap-2">
                  <label className="font-medium">
                    Educational evidence (original with PDF doc)*{" "}
                  </label>
                  <input
                    type="file"
                    onChange={(event) =>
                      captureFile(event, "educationEvidence")
                    }
                    name="educationEvidence"
                  />
                  {formik.touched.educationEvidence &&
                  formik.errors.educationEvidence ? (
                    <div className="text-red-600">
                      {formik.errors.educationEvidence}
                    </div>
                  ) : null}
                </div>
                <hr />
                <div className="flex flex-col gap-2">
                  <label className="font-medium">
                    COC (Level 1 upto Level 5)
                  </label>
                  <input
                    type="file"
                    onChange={(event) => captureFile(event, "COC")}
                    name="COC"
                  />
                  {formik.touched.COC && formik.errors.COC ? (
                    <div className="text-red-600">{formik.errors.COC}</div>
                  ) : null}
                </div>
                <hr />
                <div className="flex flex-col gap-2">
                  <label className="font-medium">Applicant photograph*</label>
                  <input
                    type="file"
                    onChange={(event) => captureFile(event, "applicantPhoto")}
                    name="applicantPhoto"
                  />
                  {formik.touched.applicantPhoto &&
                  formik.errors.applicantPhoto ? (
                    <div className="text-red-600">
                      {formik.errors.applicantPhoto}
                    </div>
                  ) : null}
                </div>
                <hr />
                <div>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Type of Working Experience
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      name="workExperience"
                      label="Select work experience"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.workExperience}
                    >
                      <MenuItem value="The manager of PLC or Enterprise member">
                        The manager of PLC or Enterprise member
                      </MenuItem>
                      <MenuItem value="Employee">Employee</MenuItem>
                      <MenuItem value="Unemployed">Unemployed</MenuItem>
                    </Select>
                  </FormControl>
                  {formik.touched.workExperience &&
                  formik.errors.workExperience ? (
                    <div className="text-red-600">
                      {formik.errors.workExperience}
                    </div>
                  ) : null}
                </div>
                {formik.values.workExperience ===
                  "The manager of PLC or Enterprise member" && (
                  <div className="flex flex-col gap-6">
                    <div className="flex flex-col gap-2">
                      <label className="font-medium">Business license *</label>
                      <input
                        type="file"
                        onChange={(event) =>
                          captureFile(event, "businessLicense")
                        }
                        name="businessLicense"
                      />
                      {formik.touched.businessLicense &&
                      formik.errors.businessLicense ? (
                        <div className="text-red-600">
                          {formik.errors.businessLicense}
                        </div>
                      ) : null}
                    </div>{" "}
                    <hr />
                    <div className="flex flex-col gap-2">
                      <label className="font-medium">
                        Competency certification of company *
                      </label>
                      <input
                        type="file"
                        onChange={(event) =>
                          captureFile(event, "competencyCertification")
                        }
                        name="competencyCertification"
                      />
                      {formik.touched.competencyCertification &&
                      formik.errors.competencyCertification ? (
                        <div className="text-red-600">
                          {formik.errors.competencyCertification}
                        </div>
                      ) : null}
                    </div>
                  </div>
                )}
                {formik.values.workExperience === "Employee" && (
                  <div className="flex flex-col gap-2">
                    <label className="font-medium">
                      Work experience(orginal with PDF doc) *
                    </label>
                    <input
                      type="file"
                      onChange={(event) =>
                        captureFile(event, "workExperiencePDF")
                      }
                      name="workExperiencePDF"
                    />
                    {formik.touched.workExperiencePDF &&
                    formik.errors.workExperiencePDF ? (
                      <div className="text-red-600">
                        {formik.errors.workExperiencePDF}
                      </div>
                    ) : null}
                  </div>
                )}
                <Button
                  onClick={() => setFormStep(1)}
                  variant="outlined"
                  className="self-start pl-1 w-[7.3em]"
                >
                  <ChevronLeft sx={{ marginBottom: "1px" }} />
                  <p>Page 1</p>
                </Button>
                <Button
                  className="flex items-center justify-center md:self-end p-2 gap-2"
                  variant="outlined"
                  type="submit"
                >
                  <span>
                    {loading ? (
                      <span className="flex items-center gap-2">
                        Submitting <CircularProgress size={20} />
                      </span>
                    ) : (
                      <span>
                        Submit{" "}
                        <SendIcon
                          fontSize="small"
                          className="relative -top-[0.08em]"
                        />
                      </span>
                    )}
                  </span>
                </Button>
              </div>
            )}
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
            <ChevronLeft sx={{ marginBottom: "1px" }} />
            <span className="mr-3"> Back</span>
          </Button>
          <Box sx={{ flex: "1 1 auto" }} />

          <Button
            onClick={handleNext}
            variant="contained"
            disableElevation
            className="text-white bg-blue-700"
          >
            {activeStep === steps.length - 1 ? (
              <span className="flex justify-center items-center gap-2">
                {" "}
                Finish
                <CheckCircleOutlineIcon sx={{ fontSize: "22px" }} />
              </span>
            ) : (
              <span className="ml-2">Next</span>
            )}
            {activeStep === steps.length - 1 ? (
              ""
            ) : (
              <ChevronRight sx={{ marginBottom: "1px" }} />
            )}
          </Button>
        </Box>
      </Box>
      <ReusableModal open={successOpen} onClose={handleClose}>
        <div className="flex flex-col items-center min-w-[300px] max-w-[500px]">
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Confirmation
          </Typography>
          <Typography
            className="text-green-700 text-center"
            id="modal-modal-description"
            sx={{ mt: 2 }}
          >
            You have successfully uploaded and sent the request, we will get in
            touch with in a few days
          </Typography>
          <Button
            variant="contained"
            className="w-[100px] bg-blue-700 mt-6"
            onClick={handleClose}
          >
            Ok
          </Button>
        </div>
      </ReusableModal>
      <Snackbar
        open={openError}
        autoHideDuration={6000}
        onClose={handleErrorClose}
      >
        <Alert
          onClose={handleErrorClose}
          severity="error"
          variant="filled"
          sx={{ width: "100%" }}
        >
          Server Error: Apologies! Something went wrong. Our team&apos;s on it.
          Please retry shortly.
        </Alert>
      </Snackbar>
      <Snackbar open={logInError} onClose={handleErrorClose}>
        <Alert
          onClose={handleErrorClose}
          severity="error"
          variant="filled"
          sx={{ width: "100%" }}
        >
          Please Log in first!
        </Alert>
      </Snackbar>
    </div>
  );
};

export default RenewReg;
