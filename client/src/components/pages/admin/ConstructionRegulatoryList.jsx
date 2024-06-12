import { Outlet, useLocation } from "react-router-dom";
import NewLicenseDataTable from "./NewLicenseDataTable";

function ConstructionRegList() {
  return (
    <div className="flex flex-col items-center justify-center gap-6">
      <h1>Construction Reg Data</h1>
      <div className="w-full">
        <Outlet />
      </div>
    </div>
  );
}

export default ConstructionRegList;
