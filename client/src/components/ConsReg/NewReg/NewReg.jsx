import { useState } from "react";
import { useSelector } from "react-redux";
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
import Snackbar from "@mui/material/Snackbar";
import {
  newLicenseFormGuide,
  newLicenseFormGuideInstruction,
} from "../../../data/constants.js";
import { PdfViewer } from "../../PDFViewr.jsx";
import pdf1 from "../../../../public/9ab615bc-9f05-4c98-ab99-19ec88e5f201.pdf";
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
// let c = console.log.bind(document);

const NewReg = () => {
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
  const [educationLevel, setEducationLevel] = useState("");
  const [institution, setInstitution] = useState("");
  const [country, setCountry] = useState("");
  const [graduation, setGraduation] = useState("");
  const [qualification, setQualification] = useState("");
  const [remarks, setRemarks] = useState("");
  const [educationalData, setEducationalData] = useState([]);
  const [educationalDataError, setEducationalDataError] = useState(false);
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
    setEducationalDataError(false);
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

  const handleReset = () => {
    setActiveStep(0);
  };

  // const resetEducationLevelData = () => {
  //   setEducationLevel("");
  //   setInstitution("");
  //   setCountry("");
  //   setGraduation("");
  //   setQualification("");
  //   setRemarks("");
  // };

  const captureFile = (event, fieldName) => {
    const newFile = event.target.files[0];
    setFilesArray((prevFilesArray) => [...prevFilesArray, newFile]);
    formik.setFieldValue(fieldName, newFile);
  };

  // modal functions
  const handleEducationChange = (event) => {
    setEducationLevel(event.target.value);
  };

  const handlRemoveEducation = (id) => {
    const updatedEducationalData = educationalData.filter(
      (data) => data.id !== id
    );
    setEducationalData(updatedEducationalData);
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
    setEducationalData([...educationalData, entryWithId]);

    setOpen(false);
  };

  const formik = useFormik({
    initialValues: {
      fullName: "",
      gender: "",
      city: "",
      woreda: "",
      mobilePhone: "",
      houseNumber: "",
      kebele: "",
      currentOrganization: "",
      educationalData: [],
      idCard: null,
      educationEvidence: null,
      transcript: null,
      COC: null,
      applicantPhoto: null,
      workExperience: "",
      competencyCertification: null,
      businessLicense: null,
      contractAgreement: null,
      paymentDocument: null,
      performanceLetter: null,
      enterpriseArticles: null,
      byLaws: null,
      workExperiencePDF: null,
    },
    validationSchema: Yup.object().shape({
      fullName: Yup.string().required("Full name is required"),
      gender: Yup.string().required("Gender is required"),
      city: Yup.string().required("City is required"),
      woreda: Yup.string().required("Woreda is required"),
      mobilePhone: Yup.number().required("Mobile is required"),
      houseNumber: Yup.string().required("House number is required"),
      kebele: Yup.string().required("Kebele is required"),
      currentOrganization: Yup.string().required(
        "Current organization is required"
      ),
      educationalData: Yup.array().required("educationalData is required"),
      idCard: Yup.mixed().required("Id is required"),
      educationEvidence: Yup.mixed().required("education evidence is required"),
      transcript: Yup.mixed().required("Transcript is required"),
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
      contractAgreement: Yup.mixed()
        .nullable()
        .test(
          "workExperience",
          "Contract agreement is required",
          function (value) {
            return this.parent.workExperience ===
              "The manager of PLC or Enterprise member"
              ? !!value
              : true;
          }
        ),
      paymentDocument: Yup.mixed()
        .nullable()
        .test(
          "workExperience",
          "Payment document is required",
          function (value) {
            return this.parent.workExperience ===
              "The manager of PLC or Enterprise member"
              ? !!value
              : true;
          }
        ),
      performanceLetter: Yup.mixed()
        .nullable()
        .test(
          "workExperience",
          "Performance letter is required",
          function (value) {
            return this.parent.workExperience ===
              "The manager of PLC or Enterprise member"
              ? !!value
              : true;
          }
        ),
      enterpriseArticles: Yup.mixed()
        .nullable()
        .test(
          "workExperience",
          "Enterprise articles is required",
          function (value) {
            return this.parent.workExperience ===
              "The manager of PLC or Enterprise member"
              ? !!value
              : true;
          }
        ),
      byLaws: Yup.mixed()
        .nullable()
        .test("workExperience", "By laws is required", function (value) {
          return this.parent.workExperience ===
            "The manager of PLC or Enterprise member"
            ? !!value
            : true;
        }),
      workExperiencePDF: Yup.mixed()
        .nullable()
        .test("workExperience", "By laws is required", function (value) {
          return this.parent.workExperience === "Employee" ? !!value : true;
        }),
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

        if (educationalData.length < 1) {
          setEducationalDataError(true);
          setLoading(false);
          return;
        } else {
          // Convert educationalData to a JSON string and append it to formData
          const educationalDataJson = JSON.stringify(educationalData);
          formData.append("educationalData", educationalDataJson);
        }

        for (const key in values) {
          const value = values[key];
          if (value instanceof File) {
            formData.append(key, value);
          } else if (key !== "educationalData") {
            formData.append(key, value);
          }
        }

        // Logging the formData to verify the contents
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
      <Box className="border p-2 bg-gray-50 rounded-md" sx={{ width: "100%" }}>
        <Stepper
          className="hidden md:flex border-b border-gray-400 md:border-none"
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
                      <PdfViewer src={pdf1} />
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
                      <div className="text-red-600">
                        {formik.errors.fullName}
                      </div>
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
                    </Box>
                    {formik.touched.gender && formik.errors.gender ? (
                      <div className="text-red-600">{formik.errors.gender}</div>
                    ) : null}
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
                      <Dialog open={open} onClose={handleClose}>
                        <DialogTitle>Add educational data</DialogTitle>
                        <DialogContent>
                          <div>
                            <FormControl fullWidth>
                              <InputLabel id="demo-simple-select-label">
                                Description
                              </InputLabel>
                              <Select
                                required
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={educationLevel}
                                label="Description"
                                onChange={handleEducationChange}
                              >
                                <MenuItem disabled>Select subcity</MenuItem>
                                <MenuItem value="Elementary">
                                  Elementary
                                </MenuItem>
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
                            {educationalData?.map((data, index) => (
                              <TableRow key={index}>
                                <TableCell>{data["educationLevel"]}</TableCell>
                                <TableCell align="right">
                                  {data["institution"]}
                                </TableCell>
                                <TableCell align="right">
                                  {data["country"]}
                                </TableCell>
                                <TableCell align="right">
                                  {data["graduation"]}
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
                                    <EditIcon className="text-blue-600 hover:bg-blue-200 rounded-full p-1 size-8 transition-all duration-300 ease-in-out" />
                                  </div>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </div>
                    {educationalDataError && (
                      <div className="text-red-600">
                        <p>Please add educational data </p>
                      </div>
                    )}
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
                    <div className="flex flex-col gap-2">
                      <label className="font-medium">
                        Renewed Resident ID card/Driving License/Passport(Front
                        and Back) *
                      </label>
                      <input
                        type="file"
                        onChange={(event) => captureFile(event, "idCard")}
                        name="idCard"
                      />
                      {formik.touched.idCard && formik.errors.idCard ? (
                        <div className="text-red-600">
                          {formik.errors.idCard}
                        </div>
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
                        Student copy / transcript
                      </label>
                      <input
                        type="file"
                        onChange={(event) => captureFile(event, "transcript")}
                        name="transcript"
                      />
                      {formik.touched.transcript && formik.errors.transcript ? (
                        <div className="text-red-600">
                          {formik.errors.transcript}
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
                      <label className="font-medium">
                        Applicant photograph*
                      </label>
                      <input
                        type="file"
                        onChange={(event) =>
                          captureFile(event, "applicantPhoto")
                        }
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
                        <hr />
                        <div className="flex flex-col gap-2">
                          <label className="font-medium">
                            Business license *
                          </label>
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
                            Contract Agreement *
                          </label>
                          <input
                            type="file"
                            onChange={(event) =>
                              captureFile(event, "contractAgreement")
                            }
                            name="contractAgreement"
                          />
                          {formik.touched.contractAgreement &&
                          formik.errors.contractAgreement ? (
                            <div className="text-red-600">
                              {formik.errors.contractAgreement}
                            </div>
                          ) : null}
                        </div>{" "}
                        <hr />
                        <div className="flex flex-col gap-2">
                          <label className="font-medium">
                            Payment document or certificate *
                          </label>
                          <input
                            type="file"
                            onChange={(event) =>
                              captureFile(event, "paymentDocument")
                            }
                            name="paymentDocument"
                          />
                          {formik.touched.paymentDocument &&
                          formik.errors.paymentDocument ? (
                            <div className="text-red-600">
                              {formik.errors.paymentDocument}
                            </div>
                          ) : null}
                        </div>{" "}
                        <hr />
                        <div className="flex flex-col gap-2">
                          <label className="font-medium">
                            Good job performance letter *
                          </label>
                          <input
                            type="file"
                            onChange={(event) =>
                              captureFile(event, "performanceLetter")
                            }
                            name="performanceLetter"
                          />
                          {formik.touched.performanceLetter &&
                          formik.errors.performanceLetter ? (
                            <div className="text-red-600">
                              {formik.errors.performanceLetter}
                            </div>
                          ) : null}
                        </div>{" "}
                        <hr />
                        <div className="flex flex-col gap-2">
                          <label className="font-medium">
                            Articles of Enterprise(መመስረቻ ደንብ) *
                          </label>
                          <input
                            type="file"
                            onChange={(event) =>
                              captureFile(event, "enterpriseArticles")
                            }
                            name="enterpriseArticles"
                          />
                          {formik.touched.enterpriseArticles &&
                          formik.errors.enterpriseArticles ? (
                            <div className="text-red-600">
                              {formik.errors.enterpriseArticles}
                            </div>
                          ) : null}
                        </div>{" "}
                        <hr />
                        <div className="flex flex-col gap-2">
                          <label className="font-medium">
                            The bylaws of the organization(መተዳደሪያ ደንብ)
                          </label>
                          <input
                            type="file"
                            onChange={(event) => captureFile(event, "byLaws")}
                            name="byLaws"
                          />
                          {formik.touched.byLaws && formik.errors.byLaws ? (
                            <div className="text-red-600">
                              {formik.errors.byLaws}
                            </div>
                          ) : null}
                        </div>
                        <hr />
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
          </div>
        )}
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
      <Snackbar open={educationalDataError} onClose={handleErrorClose}>
        <Alert
          onClose={handleErrorClose}
          severity="error"
          variant="filled"
          sx={{ width: "100%" }}
        >
          Please make sure that you have added educational data!
        </Alert>
      </Snackbar>
    </div>
  );
};

export default NewReg;
