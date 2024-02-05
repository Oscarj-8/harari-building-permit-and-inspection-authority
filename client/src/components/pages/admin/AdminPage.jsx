import { useState } from "react";
import PlanConsentReqsList from "../admin/PlanConsentReqsList";
import DesignEvalBuildingPermitReqsList from "../admin/DesignEvalBuildingPermitReqsList";
import BuildingInsOccPermit from "../admin/BuildingInsOccPermit";
import ConstructionRegulatory from "../admin/ConstructionRegulatory";
import CommentMessagesList from "../admin/CommentMessagesList";
export default function AdminPage() {
  const [navIsOpen, setNavIsOpen] = useState(false);
  const [selectedComponent, setSelectedComponent] = useState(
    <PlanConsentReqsList />
  );

  const handleNavClick = (component) => {
    setNavIsOpen(false);
    setSelectedComponent(component);
  };

  return (
    <div className="flex flex-col p-2 gap-4">
      <div className="flex text-slate-700 ">
        <button onClick={() => setNavIsOpen(!navIsOpen)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-8 h-8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75"
            />
          </svg>
        </button>
        <h1 className="text-center text-2xl text-slate-700 self-center w-full">
          Files List
        </h1>
      </div>
      {navIsOpen && (
        <div className="bg-slate-200 p-2 shadow-xl max-w-[24em]">
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
                onClick={() =>
                  handleNavClick(<DesignEvalBuildingPermitReqsList />)
                }
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
            <li>
              <a
                href="#"
                onClick={() => handleNavClick(<CommentMessagesList />)}
              >
                Comments and messages
              </a>
            </li>
          </ul>
        </div>
      )}

      <div className="w-full">{selectedComponent}</div>
    </div>
  );
}
