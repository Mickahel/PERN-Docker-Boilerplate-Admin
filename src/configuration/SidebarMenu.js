import React from "react";
import DashboardOutlinedIcon from "@material-ui/icons/DashboardOutlined";
import AssignmentOutlinedIcon from '@material-ui/icons/AssignmentOutlined';
import PersonOutlineOutlinedIcon from '@material-ui/icons/PersonOutlineOutlined';

const SidebarMenu = [
  {
    type: "item",
    id: "Dashboard",
    to: "/dashboard",
    icon: <DashboardOutlinedIcon />,
    exact: true,
  },
  {
    type: "item",
    id: "users.users",
    to: "/users",
    icon: <PersonOutlineOutlinedIcon />,
    exact: true,
  },
  {
    type: "item",
    id: "Logs",
    to: "/logs",
    icon: <AssignmentOutlinedIcon />,
    exact: true,
  },
];

export default SidebarMenu;
