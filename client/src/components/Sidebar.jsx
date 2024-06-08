import AdjustIcon from "@mui/icons-material/Adjust";
import StorageIcon from "@mui/icons-material/Storage";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import KeyIcon from "@mui/icons-material/Key";
import LineWeightIcon from "@mui/icons-material/LineWeight";
import DynamicFeedIcon from "@mui/icons-material/DynamicFeed";
import TuneIcon from "@mui/icons-material/Tune";

import { useState } from "react";
import { NavLink } from "react-router-dom";
import MobileDrawer from "./MobileDrawer";

const consoleItems = [
  {
    id: 1,
    Icon: <AdjustIcon />,
    Description: "Plan consent",
    path: "plan-consent-request",
  },
  {
    id: 2,
    Icon: <StorageIcon />,
    Description: "Design evaluation",
    path: "design-eval-request",
  },
  {
    id: 3,
    Icon: <LineWeightIcon />,
    Description: "Building inspection",
    path: "building-ins-request",
  },
  {
    id: 4,
    Icon: <KeyIcon />,
    Description: "Construction regulation",
    path: "construction-reg-request",
  },
];

const Sidebar = () => {
  const [screenIsSmall, setScreensSmall] = useState(false);
  // const [navIsOpen, setNavIsOpen] = useState(false);

  const handleClose = () => {
    setScreensSmall(!screenIsSmall);
  };

  return (
    <div className="text-slate-800 relative font-Roboto">
      <div className="md:hidden relative">
        <div className="cursor-pointer absolute top-4 left-4 border"></div>
        <MobileDrawer consoleItems={consoleItems} />
      </div>

      {/* This is displayed when the screen is greater than mid */}
      <div
        className={`hidden md:flex  gap-2 py-4 flex-col min-h-[100%] items-start ${
          screenIsSmall ? "w-[8em] text-xs " : "w-[17em] text-sm"
        } overflow-hidden transition-all duration-500 ease-in-out bg-gray-100 shadow-[1px_6px_2px_2px_#00000024]`}
      >
        <div
          className={`w-full flex px-2 ${
            screenIsSmall ? "justify-center" : "justify-between"
          }`}
        >
          <span
            className={`font-medium tracking-wider ${
              screenIsSmall ? "hidden" : "flex"
            }`}
          >
            Menu
          </span>
          {screenIsSmall ? (
            <ChevronRightIcon
              className="cursor-pointer"
              onClick={handleClose}
            />
          ) : (
            <ChevronLeftIcon className="cursor-pointer" onClick={handleClose} />
          )}
        </div>
        <hr className="w-full" />
        <ul className="flex w-full flex-col items-center justify-center overflow-hidden px-2 gap-1">
          {consoleItems.map((item) => (
            <NavLink
              to={item.path}
              key={item.id}
              className={({
                isActive,
              }) => `w-full p-2 flex gap-2 items-center justify-start
              cursor-pointer transition-all duration-300 ease-in-out
              hover:bg-slate-600 hover:text-white text-start ${
                isActive ? "bg-slate-800 text-white shadow-lg" : ""
              }
              ${screenIsSmall ? "flex-col" : ""} rounded-md`}
            >
              <span className={` bg-white p-1 rounded-sm text-slate-800`}>
                {item.Icon}
              </span>
              <span
                className={`tracking-wide ${
                  screenIsSmall ? "text-center" : "text-start"
                }`}
              >
                {item.Description}
              </span>
            </NavLink>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
