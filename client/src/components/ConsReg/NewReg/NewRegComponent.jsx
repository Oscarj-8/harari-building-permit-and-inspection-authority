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
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { licenseFormGuide } from "../../../data/constants.js";

const steps = ["Read Instruction", "Fill Form", "Get Confirmation"];

const NewRegComponent = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set());

  const isStepOptional = (step) => {
    return step === 1;
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

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
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
      <p className="text-gray-700">{licenseFormGuide[0].description}</p>
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
            {licenseFormGuide.slice(1).map((step, index) => (
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
              <div className="flex flex-col gap-2">
                <h3 className="font-medium">Service Description</h3>
                <h4>Who Can Apply</h4>
                <p>
                  For those who are graduated from recognized university or
                  similar educational institute /TVET colleges and who has
                  Certification of Occupational Competency (COC). To register as
                  a new professional, one must have received no professional
                  licenses form this Construction Authority before.
                </p>
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
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                Back
              </Button>
              <Box sx={{ flex: "1 1 auto" }} />
              {isStepOptional(activeStep) && (
                <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                  Skip
                </Button>
              )}
              <Button onClick={handleNext}>
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
