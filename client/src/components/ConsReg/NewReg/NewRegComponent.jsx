import { useState } from "react";
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

const steps = ["Read Instruction", "Fill Form", "Get Confirmation"];

const NewRegComponent = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set());

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

  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-lg font-medium">
        New Registration of Professionals License
      </h1>
      <hr />
      <p className="text-gray-700">{newLicenseFormGuide[0].description}</p>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
          className="bg-gray-100"
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
      <Box sx={{ width: "100%" }}>
        <Stepper activeStep={activeStep}>
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
                <h3 className="font-medium -mb-6">Service Description</h3>
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
                      className="bg-gray-100 underline"
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
              <form>
                <TextField label="Field 1" fullWidth />
                <TextField label="Field 2" fullWidth />
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
