import React from "react";
import DashboardOutlinedIcon from "@material-ui/icons/DashboardOutlined";
import AssignmentOutlinedIcon from '@material-ui/icons/AssignmentOutlined';
import PersonOutlineOutlinedIcon from '@material-ui/icons/PersonOutlineOutlined';
import BugReportOutlinedIcon from '@material-ui/icons/BugReportOutlined';
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
    to: "/users-management-system",
    icon: <PersonOutlineOutlinedIcon />,
    exact: true,
  },
  {
    type: "item",
    id: "feedbacks.feedbacks",
    to: "/feedbacks",
    icon: <BugReportOutlinedIcon />,
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
