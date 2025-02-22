import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex justify-center items-center h-screen" style={{flexDirection: 'column'}}>
      <h1 className="text-[#00E6E6] text-[42px] font-bold">404 - Page Not Found</h1>
      <p className="text-[#00E6E6] text-[42px] font-bold">The page you are looking for does not exist.</p>
      <Link to="/dashboard" className="text-[#00E6E6] text-[42px] font-bold">Go to Dashboard</Link>
    </div>
  );
};

export default NotFound;
