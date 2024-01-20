import { useState } from "react";
import PlanConsentReqsList from "../PlanConsentReqsList";
import DesignEvalBuildingPermit from "../DesignEvalBuildingPermit";
import BuildingInsOccPermit from "../BuildingInsOccPermit";
import ConstructionRegulatory from "../ConstructionRegulatory";

export default function AdminPage() {
  const [navIsOpen, setNavIsOpen] = useState(false);
  const [selectedComponent, setSelectedComponent] = useState(null);

  const handleNavClick = (component) => {
    setNavIsOpen(false);
    setSelectedComponent(component);
  };

  return (
    <div className="flex flex-col">
      <div>
        <button onClick={() => setNavIsOpen(!navIsOpen)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-12 h-12"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75"
            />
          </svg>
        </button>
      </div>
      {navIsOpen && (
        <div className="smd:inline-block bg-slate-200 p-2 shadow-xl">
          <ul className="flex flex-col gap-4 text-slate-700 ">
            <li>
              <a
                href="#"
                onClick={() => handleNavClick(<PlanConsentReqsList />)}
              >
                Plan Consent Request
              </a>
            </li>
            <li>
              <a
                href="#"
                onClick={() => handleNavClick(<DesignEvalBuildingPermit />)}
              >
                Design evaluation and building permit Requests
              </a>
            </li>
            <li>
              <a
                href="#"
                onClick={() => handleNavClick(<BuildingInsOccPermit />)}
              >
                Building inspection and occupancy permit
              </a>
            </li>
            <li>
              <a
                href="#"
                onClick={() => handleNavClick(<ConstructionRegulatory />)}
              >
                Construction regulatory
              </a>
            </li>
          </ul>
        </div>
      )}

      <div className="w-full">
        <h1 className="text-center text-2xl text-slate-700 my-7">Files List</h1>
        {selectedComponent}
      </div>
    </div>
  );
}
