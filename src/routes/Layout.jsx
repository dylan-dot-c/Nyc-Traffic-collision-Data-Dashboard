import { Outlet } from "react-router";
import Sidebar from "../components/Sidebar";
import { useState } from "react";
import MobileHeader from "../components/MobileHeader";

const Layout = () => {
  const [open, setOpen] = useState(false);
  return (
    <div className="main--container">
      <Sidebar open={open} setClose={() => setOpen(false)} />
      <MobileHeader onMenuClick={() => setOpen(true)} />
      <Outlet />
    </div>
  );
};

export default Layout;
