import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Alert,
  AlertTitle,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormLabel,
  InputLabel,
  MenuItem,
  Paper,
  Radio,
  RadioGroup,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import { v4 as uuidv4 } from "uuid";
import { useSelector } from "react-redux";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { upgradeLicenseFormGuide } from "../../../data/constants.js";
import ChevronRight from "@mui/icons-material/ChevronRight";
import ChevronLeft from "@mui/icons-material/ChevronLeft";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import DescriptionIcon from "@mui/icons-material/Description";
import { useState } from "react";
import { PdfViewer2 } from "../../PDFViewr.jsx";
import pdf2 from "../../../../public/upgradeLicense.pdf";
import { useFormik } from "formik";
import * as Yup from "yup";
import { postUpdateConstReg } from "../../../services/service.js";

const steps = ["Read Instruction", "Fill Form", "Get Confirmation"];

const UpgradeReg = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set());
  const [formStep, setFormStep] = useState(1);
  const { currentUser } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);
  const [openError, setOpenError] = useState(false);
  const [logInError, setLogInError] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);
  // const handleClose = () => setSuccessOpen(false);
  const [open, setOpen] = useState(false);
  //step one form values
  const [educationLevel, setEducationLevel] = useState("");
  const [educationalInstitution, setEducationalInstitution] = useState("");
  const [fieldOfStudy, setFieldOfStudy] = useState("");
  const [professionalTitle, setProfessionalTitle] = useState("");
  const [educationalData, setEducationalData] = useState([]);

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleEducationChange = (event) => {
    setEducationLevel(event.target.value);
  };

  const resetEducationLevelData = () => {
    setEducationalInstitution("");
    setFieldOfStudy("");
    setProfessionalTitle("");
  };

  const handleEducationDataAdd = () => {
    // event.preventDefault(); // Prevent default form submission
    // event.stopPropagation();

    // const formData = new FormData();
    // formData.append("education level", educationLevel);
    // formData.appen
    // const id = uuidv4();
    // const entryWithId = { id, ...formJson };

    // setEducationalData((prevEducationalData) => [
    //   ...prevEducationalData,
    //   entryWithId,
    // ]);
    // handleClose();
    // resetEducationLevelData();
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

  const handlRemoveEducation = (id) => {
    const updatedEducationalData = educationalData.filter(
      (data) => data.id !== id
    );
    setEducationalData(updatedEducationalData);
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

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    formik.setFieldValue("educationalData", educationalData, true);
    setOpen(false);
    setSuccessOpen(false);
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
      houseNumber: Yup.number().required("House number is required"),
      kebele: Yup.string().required("Kebele is required"),
      currentOrganization: Yup.string().required(
        "Current organization is required"
      ), // educationalData: Yup.array().required("educationalData is required"),
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
      // workExperiencePDF: Yup.mixed()
      //   .nullable()
      //   .test("workExperience", "By laws is required", function (value) {
      //     return this.parent.workExperience === "Employee" ? !!value : true;
      //   }),

      // businessLicense: Yup.mixed().required("Business license is required"),
      // contractAgreement: Yup.mixed().required("Contract agreement is required"),
      // paymentDocument: Yup.mixed().required("Payment document is required"),
      // performanceLetter: Yup.mixed().required("Performance letter is required"),
      // enterpriseArticles: Yup.mixed().required(
      //   "Enterprise articles is required"
      // ),
      // byLaws: Yup.mixed().required("By laws is required"),
      // workExperiencePDF: Yup.mixed().required(
      //   "Work experience pdf or doc file is required"
      // ),
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

        for (const [key, value] of formData.entries()) {
          console.log(key, value);
        }

        const { statusCode } = await postUpdateConstReg(formData);

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
      <h1 className="text-lg font-medium">Upgrade of Professionals License </h1>
      <hr className="" />
      <p className="text-gray-700">{upgradeLicenseFormGuide[0].description}</p>
      <Box
        className="border p-2 flex flex-col gap-4 bg-gray-50 rounded-md"
        sx={{ width: "100%" }}
      >
        <h1 className="text-slate-600 text-xl font-light">Fill form</h1>
        <hr />
        {activeStep === 0 && (
          <>
            <div className="flex flex-col gap-2">
              {" "}
              <p
                className="text-lg
          "
              >
                Service description
              </p>
              <div className="flex flex-col gap-8">
                {upgradeLicenseFormGuide.slice(1).map((guide) => (
                  <div key={guide.id} className="flex flex-col gap-2">
                    <h4>
                      <span className="font-medium">{guide.title}</span>
                    </h4>
                    <ul className="list-decimal">
                      {Array.isArray(guide.text) ? (
                        guide.text.map((textItem, index) => (
                          <li className="ml-8" key={index}>
                            {textItem}
                          </li>
                        ))
                      ) : (
                        <p>{guide.text}</p>
                      )}
                    </ul>
                  </div>
                ))}
              </div>
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
                  <PdfViewer2 src={pdf2} />
                </AccordionDetails>
              </Accordion>
            </div>
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
          </>
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
    </div>
  );
};

export default UpgradeReg;
