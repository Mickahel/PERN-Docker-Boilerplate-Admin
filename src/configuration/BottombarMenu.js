import React from "react";
import DashboardOutlinedIcon from "@material-ui/icons/DashboardOutlined";
import PersonOutlineOutlinedIcon from "@material-ui/icons/PersonOutlineOutlined";
const BottombarMenu = [
  {
    id: "profile.profile",
    to: "/account/profile",
    icon: <PersonOutlineOutlinedIcon />,
  },
  {
    id: "dashboard.dashboard",
    to: "/dashboard",
    icon: <DashboardOutlinedIcon />,
  },
];
export default BottombarMenu;
