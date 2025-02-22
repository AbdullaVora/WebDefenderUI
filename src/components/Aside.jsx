import React from "react";
import { MdOutlineElectricBolt } from "react-icons/md";
import { HiOutlineDesktopComputer } from "react-icons/hi";
import { PiCompassRoseDuotone, PiTargetBold } from "react-icons/pi";
import { IoBugSharp, IoPulseSharp, IoSettingsSharp } from "react-icons/io5";
import { BsTools } from "react-icons/bs";
import { HiClipboardDocumentList } from "react-icons/hi2";
import { FaUsers } from "react-icons/fa";
import { Link } from "react-router-dom";

const Aside = ({ isCollapsed }) => {
  return (
    <div
      className={`aside fixed mt-16 start-0 z-20 h-screen bg-[#040C1F] transition-all duration-300 border-e border-[#4C566A] ${isCollapsed ? "w-[68px]" : "w-[220px]"
        }`}
    >
      <div
        className={`flex flex-col ${isCollapsed ? "items-center px-2" : "px-5"
          }`}
      >
        <Link to="/tools"><button
          type="button"
          className={`bg-[#00FFFF] flex cursor-pointer items-center justify-center rounded-[5px] font-bold text-black transition-all ${isCollapsed ? "w-10 h-10 p-0 mt-5" : "w-[170px] py-[6px] mt-5"
            }`}
        >
          <MdOutlineElectricBolt
            size={22}
            className={isCollapsed ? "" : "ms-[-10px]"}
          />
          {!isCollapsed && "New Scan"}
        </button></Link>

        <div className="workspace w-full mt-6">
          {!isCollapsed && (
            <span className="text-white text-[12px] font-medium opacity-50">
              WORKSPACES
            </span>
          )}
          <ul
            className={`list-none mt-3 space-y-1 ${isCollapsed ? "px-0" : ""}`}
          >
            <Link to="/dashboard" className="text-decoration-none">
              <li
                className={`flex cursor-pointer items-center font-medium text-[#00E6E6] opacity-60 hover:opacity-100 transition-all p-2 rounded-md hover:bg-[#1A2C4E] ${isCollapsed ? "justify-center" : "gap-3"
                  }`}
              >
                <HiOutlineDesktopComputer size={20} />
                {!isCollapsed && "Dashboard"}
              </li>
            </Link>
            <Link to="/assets" className="text-decoration-none">
              <li
                className={`flex cursor-pointer items-center font-medium text-[#00E6E6] opacity-60 hover:opacity-100 transition-all p-2 rounded-md hover:bg-[#1A2C4E] ${isCollapsed ? "justify-center" : "gap-3"
                  }`}
              >
                <PiTargetBold size={20} />
                {!isCollapsed && "Assets"}
              </li>
            </Link>
            <Link to="/scans" className="text-decoration-none">
              <li
                className={`flex cursor-pointer items-center font-medium text-[#00E6E6] opacity-60 hover:opacity-100 transition-all p-2 rounded-md hover:bg-[#1A2C4E] ${isCollapsed ? "justify-center" : "gap-3"
                  }`}
              >
                <IoPulseSharp size={20} />
                {!isCollapsed && "Scans"}
              </li>
            </Link>
            <Link to="/findings" className="text-decoration-none">
              <li
                className={`flex cursor-pointer items-center font-medium text-[#00E6E6] opacity-60 hover:opacity-100 transition-all p-2 rounded-md hover:bg-[#1A2C4E] ${isCollapsed ? "justify-center" : "gap-3"
                  }`}
              >
                <IoBugSharp size={20} />
                {!isCollapsed && "Findings"}
              </li>
            </Link>
            <Link to="/surface" className="text-decoration-none">
              <li
                className={`flex cursor-pointer items-center font-medium text-[#00E6E6] opacity-60 hover:opacity-100 transition-all p-2 rounded-md hover:bg-[#1A2C4E] ${isCollapsed ? "justify-center" : "gap-3"
                  }`}
              >
                <PiCompassRoseDuotone size={20} />
                {!isCollapsed && "Attack Surface"}
              </li>
            </Link>
            <Link to="/tools" className="text-decoration-none">
              <li
                className={`flex cursor-pointer items-center font-medium text-[#00E6E6] opacity-60 hover:opacity-100 transition-all p-2 rounded-md hover:bg-[#1A2C4E] ${isCollapsed ? "justify-center" : "gap-3"
                  }`}
              >
                <BsTools size={20} />
                {!isCollapsed && "Tools"}
              </li>
            </Link>
          </ul>

          {!isCollapsed && (
            <span className="text-white text-[12px] font-medium mt-6 block opacity-50">
              CONFIGURATIONS
            </span>
          )}
          <ul
            className={`list-none ${isCollapsed ? "mt-6" : "mt-3"} space-y-1`}
          >
            <Link to="/reports" className="text-decoration-none">
              <li
                className={`flex cursor-pointer items-center font-medium text-[#00E6E6] opacity-60 hover:opacity-100 transition-all p-2 rounded-md hover:bg-[#1A2C4E] ${isCollapsed ? "justify-center" : "gap-3"
                  }`}
              >
                <HiClipboardDocumentList size={20} />
                {!isCollapsed && "Reports"}
              </li>
            </Link>
            <Link to="/team" className="text-decoration-none">
              <li
                className={`flex cursor-pointer items-center font-medium text-[#00E6E6] opacity-60 hover:opacity-100 transition-all p-2 rounded-md hover:bg-[#1A2C4E] ${isCollapsed ? "justify-center" : "gap-3"
                  }`}
              >
                <FaUsers size={20} />
                {!isCollapsed && "Team"}
              </li>
            </Link>
            <Link to="/settings" className="text-decoration-none">
              <li
                className={`flex cursor-pointer items-center font-medium text-[#00E6E6] opacity-60 hover:opacity-100 transition-all p-2 rounded-md hover:bg-[#1A2C4E] ${isCollapsed ? "justify-center" : "gap-3"
                  }`}
              >
                <IoSettingsSharp size={20} />
                {!isCollapsed && "Settings"}
              </li>
            </Link>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Aside;
