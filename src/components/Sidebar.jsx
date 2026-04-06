import { RiDashboardHorizontalFill } from "react-icons/ri";
import { GrOverview } from "react-icons/gr";
import { BsClipboardData } from "react-icons/bs";

const Sidebar = () => {
  const items = [
    {
      title: "DashBoard",
      icon: <RiDashboardHorizontalFill size={30} />,
    },
    {
      title: "Overview",
      icon: <GrOverview size={30} />,
    },
    {
      title: "Deep Dive",
      icon: <BsClipboardData size={30} />,
    },
  ];

  return (
    <aside className="sidebar">
      <h2>
        <i class="bi bi-database-fill"></i>NYC Traffic Data
      </h2>

      <div className="items--container">
        {items.map((item, idx) => {
          return (
            <div className={`sidebar--item ${idx == 0 && "active"}`}>
              <span>{item.icon}</span> <h3>{item.title}</h3>
            </div>
          );
        })}
      </div>
    </aside>
  );
};

export default Sidebar;
