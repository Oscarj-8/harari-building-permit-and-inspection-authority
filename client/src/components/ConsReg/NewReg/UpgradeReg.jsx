import { Alert, AlertTitle, Box, Button, Typography } from "@mui/material";
import { upgradeLicenseFormGuide } from "../../../data/constants.js";
import { useState } from "react";

const UpgradeReg = () => {
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
        <Alert severity="info">
          <AlertTitle>Info</AlertTitle>
          <p>
            By continuing using the system you certify that you have read the
            above service request instruction and accept the applicable
          </p>
          <span>
            <a className="underline text-[#0f3c51] font-medium" href="">
              Terms and Conditions
            </a>
          </span>
        </Alert>
      </Box>
    </div>
  );
};

export default UpgradeReg;
