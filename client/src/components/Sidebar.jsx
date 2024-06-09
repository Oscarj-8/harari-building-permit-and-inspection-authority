import DesignServicesIcon from "@mui/icons-material/DesignServices";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ConstructionIcon from "@mui/icons-material/Construction";
import HomeWorkIcon from "@mui/icons-material/HomeWork";

import { useState } from "react";
import { NavLink } from "react-router-dom";
import MobileDrawer from "./MobileDrawer";
import TrendingFlatIcon from "@mui/icons-material/TrendingFlat";
const consoleItems = [
  {
    id: 1,
    Icon: <DesignServicesIcon />,
    Description: "Plan consent",
    path: "plan-consent-request",
  },
  {
    id: 2,
    Icon: <WorkspacePremiumIcon />,
    Description: "Design evaluation",
    path: "design-eval-request",
  },
  {
    id: 3,
    Icon: <HomeWorkIcon />,
    Description: "Building inspection",
    path: "building-ins-request",
  },
  {
    id: 4,
    Icon: <ConstructionIcon />,
    Description: "Construction regulation",
    path: "construction-reg-request",
    children: [
      {
        id: 5,
        Description: "New license",
        path: "construction-reg-request/new-license",
      },
      {
        id: 6,
        Description: "Update license",
        path: "construction-reg-request/update-license",
      },
      {
        id: 7,
        Description: "Upgrade license",
        path: "construction-reg-request/upgrade-license",
      },
    ],
  },
];

const Sidebar = () => {
  const [screenIsSmall, setScreensSmall] = useState(false);
  const [submenuOpen, setSubmenuOpen] = useState(false);

  const handleClose = () => {
    setScreensSmall(!screenIsSmall);
  };

  const toggleSubmenu = () => {
    setSubmenuOpen(!submenuOpen);
  };

  return (
    <div className="text-slate-800 relative font-Roboto">
      <div className="md:hidden relative">
        <div className="cursor-pointer absolute top-4 left-4 border"></div>
        <MobileDrawer consoleItems={consoleItems} />
      </div>

      <div
        className={`hidden md:flex gap-2 py-4 flex-col min-h-[100%] items-start ${
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
        <ul className="relative flex w-full flex-col items-center justify-center px-2 gap-1">
          {consoleItems.map((item) => (
            <div key={item.id} className="relative w-full">
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `relative z-10 w-full p-2 flex gap-2 items-center justify-start cursor-pointer transition-all duration-300 ease-in-out hover:bg-slate-600 hover:text-white text-start overflow-hidden ${
                    isActive
                      ? "bg-slate-900 text-white shadow-lg before:content-[''] before:absolute before:-top-7 before:h-[2em] before:bg-white before:w-full before:rounded-full before:left-0 before:blur-xl"
                      : ""
                  } ${screenIsSmall ? "flex-col" : ""} rounded-md`
                }
                onClick={item.children ? toggleSubmenu : undefined}
              >
                <span className={`bg-white p-1 rounded-sm text-slate-800`}>
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
              {item.children && (
                <ul
                  className={`${
                    submenuOpen ? "max-h-80 opacity-100 " : "max-h-0 -mt-10"
                  } relative bottom-1 p-4 transition-all duration-500 ease-in-out overflow-hidden bg-slate-800 text-white space-y-2 rounded-b-lg shadow-lg before:content-[''] before:absolute before:-top-8 before:h-[1.5em] before:bg-gray-50 before:w-full before:rounded-full before:left-0 before:blur-xl`}
                >
                  {item.children.map((child) => (
                    <NavLink
                      to={child.path}
                      key={child.id}
                      onClick={toggleSubmenu}
                      className={({ isActive }) =>
                        `group relative w-full p-2 flex gap-2 items-center justify-start cursor-pointer transition-all duration-300 ease-in-out hover:bg-slate-600 hover:text-white text-start overflow-hidden ${
                          isActive
                            ? "bg-slate-900 text-white shadow-lg before:content-[''] before:absolute before:-top-7 before:h-[2em] before:bg-white before:w-full before:rounded-full before:left-0 before:blur-xl before:opacity-50"
                            : ""
                        } ${screenIsSmall ? "flex-col" : ""} rounded-md`
                      }
                    >
                      <span
                        className={`flex items-center justify-between w-full tracking-wide ${
                          screenIsSmall ? "text-center" : "text-start"
                        }`}
                      >
                        {child.Description}{" "}
                        <TrendingFlatIcon className="relative -left-2 group-hover:-left-0 opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out delay-100" />
                      </span>
                    </NavLink>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
