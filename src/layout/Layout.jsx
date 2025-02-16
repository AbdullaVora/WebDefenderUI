import { useState } from "react";
import { useLocation } from "react-router-dom";
import Header from "../components/Header";
import Aside from "../components/Aside";

function Layout({ children }) {
  const [isAsideCollapsed, setIsAsideCollapsed] = useState(false);

  return (
    <>
      <Header
        isAsideCollapsed={isAsideCollapsed}
        setIsAsideCollapsed={setIsAsideCollapsed}
      />
      <Aside isCollapsed={isAsideCollapsed} />
      <div className={`content-with-sidebar ${isAsideCollapsed ? "aside-collapsed" : "aside-expanded"}`}>
        {children}
      </div>
    </>
  );
}

export default Layout;
