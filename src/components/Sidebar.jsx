import { Link } from "react-router";
import { BarChart3, Database, TrendingUp, XIcon } from "lucide-react";
import { NavLink } from "react-router-dom";
import { useEffect, useRef } from "react";

const Sidebar = ({ open, setClose }) => {
  const sidebarRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setClose();
      }
    };

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open, setClose]);
  const items = [
    {
      title: "Overview",
      icon: <BarChart3 size={30} />,
      url: "/",
    },
    {
      title: "Deep Dive",
      icon: <TrendingUp size={30} />,
      url: "/deep-dive",
    },
    {
      title: "Raw Data",
      icon: <Database size={30} />,
      url: "/raw-data",
    },
  ];

  return (
    <aside className={`sidebar ${open ? "open" : ""}`} ref={sidebarRef}>
      <div className="sidebar-header">
        <div className="sb-top">
          <h2>NYC Traffic Analytics</h2> {open && <XIcon onClick={setClose} />}
        </div>
        <p>Collison Data Dashboard</p>
      </div>

      <hr />

      <div className="items--container">
        {items.map((item) => {
          return (
            <NavLink
              to={item.url}
              key={item.url}
              onClick={setClose}
              className={({ isActive }) =>
                `sidebar--item ${isActive ? "active" : ""}`
              }
            >
              <span>{item.icon}</span> <h3>{item.title}</h3>
            </NavLink>
          );
        })}
      </div>
    </aside>
  );
};

export default Sidebar;
