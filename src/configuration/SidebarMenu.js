import React from "react";
import DashboardOutlinedIcon from "@material-ui/icons/DashboardOutlined";

const SidebarMenu = [
  {
    type: "item",
    id: "Dashboard",
    to: "/dashboard",
    icon: <DashboardOutlinedIcon />,
    exact: true,
  },
];

export default SidebarMenu;
