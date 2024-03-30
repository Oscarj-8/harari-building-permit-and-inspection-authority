import { useState } from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useTheme } from "@mui/material/styles";
import { useMediaQuery } from "@mui/material";
import { licenseFormGuide } from "../../../data/constants.js";
function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const ConstructionRegulatory = () => {
  const theme = useTheme();
  const [value, setValue] = useState(0);
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className="max-w-[80em] mx-auto">
      <Box sx={{ width: "100%" }}>
        <Box
          sx={{
            borderBottom: 1,
            borderColor: "divider",
          }}
        >
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
            orientation={isSmallScreen ? "vertical" : "horizontal"}
          >
            <Tab
              sx={{
                textTransform: "none",
              }}
              label="New Registration of Professionals License"
              {...a11yProps(0)}
            />
            <Tab
              sx={{
                textTransform: "none",
              }}
              label="Renewal of Professionals License"
              {...a11yProps(1)}
            />
            <Tab
              sx={{
                textTransform: "none",
              }}
              label="Upgrade of Professionals License"
              {...a11yProps(2)}
            />
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
          <div className="flex flex-col gap-2">
            <h1 className="text-lg font-medium">
              New Registration of Professionals License
            </h1>
            <hr />
            <p className="text-gray-700">
              New Professional Licensing Service is provided: - for those who
              have graduated from an accredited educational institution and/or
              for the expert of experience who has Certification of Occupational
              Competency (COC), to register as a new professional, one must have
              received no professional licenses form this Authority before. New
              professional licensing registration services will be provided by
              design or construction as appropriate. Design professional
              licenses are issued, for professionals who are employed in the
              consulting sector, for professionals who are organized or run a
              consulting firm; in other hand, construction professional licenses
              are issued for professionals who are employed in the construction
              sector, for professionals who are organized or run a construction
              firm.
            </p>
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
                  {licenseFormGuide.map((step, index) => (
                    <li className="list-decimal" key={index}>
                      {step.text}
                    </li>
                  ))}
                </ul>
              </AccordionDetails>
            </Accordion>
          </div>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          Renewal of Professionals License
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
          Upgrade of Professionals License
        </CustomTabPanel>
      </Box>
    </div>
  );
};

export default ConstructionRegulatory;
