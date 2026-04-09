import { Link, Outlet } from "react-router";
import Sidebar from "../components/Sidebar";

const Layout = () => {
  return (
    <div className="main--container">
      <Sidebar />
      <Outlet />
    </div>
  );
};

export default Layout;
