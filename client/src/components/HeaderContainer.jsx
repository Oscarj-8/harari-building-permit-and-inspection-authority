import { useLocation } from "react-router-dom";
import Header from "./Header";
import { useEffect, useState } from "react";
import AdminHeader from "./AdminHeader";

const HeaderContainer = () => {
  const location = useLocation();
  const [isAdminPage, setIsAdminPage] = useState(false);

  useEffect(() => {
    const isAdminPath =
      location.pathname === "/admin-page" ||
      location.pathname === "/admin-profile" ||
      location.pathname === "/sign-in" ||
      location.pathname === "/sign-up";

    setIsAdminPage(isAdminPath);
  }, [location.pathname]);

  return isAdminPage ? <AdminHeader /> : <Header />;
};

export default HeaderContainer;
