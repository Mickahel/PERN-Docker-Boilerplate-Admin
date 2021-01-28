import React from "react";
import DashboardOutlinedIcon from "@material-ui/icons/DashboardOutlined";
import AssignmentOutlinedIcon from '@material-ui/icons/AssignmentOutlined';
import GroupOutlinedIcon from '@material-ui/icons/GroupOutlined';
import BugReportOutlinedIcon from '@material-ui/icons/BugReportOutlined';
import StorageOutlinedIcon from '@material-ui/icons/StorageOutlined';
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
    icon: <GroupOutlinedIcon />,
    exact: false
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
  {
    type: "item",
    id: "Database",
    to: "/database",
    icon: <StorageOutlinedIcon />,
    exact: true,
  },
];

export default SidebarMenu;
