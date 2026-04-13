import { RiDashboardHorizontalFill } from "react-icons/ri";
import { GrOverview } from "react-icons/gr";
import { BsClipboardData } from "react-icons/bs";
import { Link } from "react-router";

const Sidebar = () => {
  const items = [
    {
      title: "DashBoard",
      icon: <RiDashboardHorizontalFill size={30} />,
      url: "/",
    },
    {
      title: "Overview",
      icon: <GrOverview size={30} />,
      url: "/",
    },
    {
      title: "Deep Dive",
      icon: <BsClipboardData size={30} />,
      url: "/",
    },
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h2>NYC Traffic</h2>
        <p>Data Dashboard</p>
      </div>

      <hr />

      <div className="items--container">
        {items.map((item, idx) => {
          return (
            <div className={`sidebar--item ${idx == 0 && "active"}`}>
              <Link to={item.url}>
                <span>{item.icon}</span> <h3>{item.title}</h3>
              </Link>
            </div>
          );
        })}
      </div>
    </aside>
  );
};

export default Sidebar;
