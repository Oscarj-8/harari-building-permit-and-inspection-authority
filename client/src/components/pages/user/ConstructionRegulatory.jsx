import { useState } from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import { useMediaQuery } from "@mui/material";
import NewRegComponent from "../../ConsReg/NewReg/NewRegComponent";
// Tab starts here
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

// Tab ends here

const ConstructionRegulatory = () => {
  const theme = useTheme();
  const [value, setValue] = useState(0);
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className="bg-slate-100 p-1">
      <Box sx={{ width: "60%", margin: "auto", backgroundColor: "#fff" }}>
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
          <NewRegComponent />
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
