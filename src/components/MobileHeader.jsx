import React from "react";
import { Menu } from "lucide-react";
const MobileHeader = ({ onMenuClick }) => {
  return (
    <div className="mobile-header">
      <Menu onClick={onMenuClick} />
      <h2>NYC Traffic Analytics</h2>
    </div>
  );
};

export default MobileHeader;
