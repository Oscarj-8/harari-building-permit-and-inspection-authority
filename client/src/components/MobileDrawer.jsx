import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import MenuIcon from "@mui/icons-material/Menu";
import { NavLink } from "react-router-dom";

export default function MobileDrawer({ consoleItems }) {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <hr className="border-primary-blue" />
      <ListItem className="grid grid-cols-2 w-full items-center justify-center">
        {consoleItems.map((item) => (
          <NavLink
            to={item.path}
            key={item.id}
            className={({ isActive }) =>
              `flex items-center justify-center ${
                isActive
                  ? "bg-secondary-blue text-white border border-gray-300 shadow-xl"
                  : ""
              } w-full p-3 rounded-md`
            }
          >
            {" "}
            <span className="flex flex-col items-center text-center justify-evenly p-2 gap-2 text-sm">
              {item.Icon} {item.Description}
            </span>
          </NavLink>
        ))}
      </ListItem>
    </Box>
  );

  return (
    <div>
      <div
        className="cursor-pointer absolute top-4 left-4 border-2 border-slate-500 rounded-full p-1 z-50"
        onClick={toggleDrawer(true)}
      >
        {" "}
        <MenuIcon />
      </div>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </div>
  );
}
