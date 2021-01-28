import React, { useEffect, useState, useContext } from "react";
import { ThemeContext } from "contexts/Providers/ThemeProvider";
import useFetch from "hooks/useFetch";
import RoundLoader from "components/RoundLoader";
import EnhancedTable from "components/EnhancedTable";
import Endpoints from "Endpoints";
import { Trans } from "react-i18next";
import { Card } from "@material-ui/core";
import GroupOutlinedIcon from '@material-ui/icons/GroupOutlined';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import FloatingActionButton from "components/FloatingActionButton"
import "./style.scss";
import { useHistory } from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import VpnKeyOutlinedIcon from '@material-ui/icons/VpnKeyOutlined';
import TouchAppOutlinedIcon from '@material-ui/icons/TouchAppOutlined';
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';
import AccessibilityOutlinedIcon from '@material-ui/icons/AccessibilityOutlined';
import SendOutlinedIcon from '@material-ui/icons/SendOutlined';
import PushNotificationDialog from './PushNotificationDialog'
function UsersList(props) {
    const themeContext = useContext(ThemeContext);
    const [openPushNotificationDialog, setOpenPushNotificationDialog] = useState(false);
    const [selectedIdsForPushNotification, setSelectedIdsForPushNotification] = useState();
    const { loading, data, fetch } = useFetch();
    const { fetch: fetchSendLostPasswordEmail } = useFetch();
    const { fetch: fetchSendActivationEmail } = useFetch();
    const { fetch: fetchDisableUser } = useFetch();
    const { fetch: fetchImpersonificateUser } = useFetch();
    const history = useHistory();

    const loadData = async () => {
        try {
            const result = await fetch({
                url: Endpoints.user.getAll,
                method: "GET",
            })
        }
        catch (e) {

        }
    }
    useEffect(() => {
        themeContext.setTitle("users.users", <GroupOutlinedIcon />);
        loadData()
    }, []);


    const headCells = [
        {
            id: "email",
            label: "Email",
        },
        {
            id: "firstname",
            label: <Trans>users.firstname</Trans>,
        },
        {
            id: "lastname",
            label: <Trans>users.lastname</Trans>,
        },
        {
            id: "status",
            label: <Trans>users.status</Trans>,
        },
        {
            id: "role",
            label: <Trans>users.role</Trans>,
        }
    ]


    if (loading) return <RoundLoader />
    const rows = data.map(user => {
        return {
            id: user.id,
            status: {
                value: user.status
            },
            firstname: {
                value: user.firstname
            },
            lastname: {
                value: user.lastname
            },
            email: {
                value: user.email,
                component: <span className="flex items-center"> <Avatar
                    className="mt-1 mr-1 mb-1"
                    src={user.profileImageUrl && process.env.REACT_APP_API_PUBLIC_URL + user.profileImageUrl}>
                </Avatar>
                    {user.email}
                </span>

            },
            role: {
                value: user.role
            },

        }
    })
    return (
        <div >
            <Card>
                <EnhancedTable
                    headCells={headCells}
                    rows={rows}
                    readOnly={false}
                    rowsPerPage={15}
                    dense={true}
                    buttons={[
                        {
                            tooltip: "users.edit",
                            icon: <EditOutlinedIcon />,
                            onClick: (id) => history.push(`/users-management-system/${id}`),
                            activateOnSingleSelection: true,
                            activateOnMultipleSelection: false,
                        },
                        {
                            tooltip: "users.sendActivationEmail",
                            icon: <TouchAppOutlinedIcon />,
                            onClick: async (id) => {
                                await fetchSendActivationEmail({
                                    url: Endpoints.user.sendActivationEmail,
                                    method: "POST",
                                    urlParams: {
                                        id
                                    }
                                })
                                themeContext.showSuccessSnackbar({ message: "users.activationEmailSent" })
                            },
                            activateOnSingleSelection: true,
                            activateOnMultipleSelection: false,
                        },
                        {
                            tooltip: "users.sendLostPasswordEmail",
                            icon: <VpnKeyOutlinedIcon />,
                            onClick: async (id) => {
                                await fetchSendLostPasswordEmail({
                                    url: Endpoints.user.sendLostPasswordEmail,
                                    method: "POST",
                                    urlParams: {
                                        id
                                    }
                                })
                                themeContext.showSuccessSnackbar({ message: "users.lostPasswordEmailSent" })
                            },
                            activateOnSingleSelection: true,
                            activateOnMultipleSelection: false,
                        },
                        {
                            tooltip: "users.disableUser",
                            icon: <DeleteOutlineOutlinedIcon />,
                            disabled: id => !Array.isArray(id) && data.find(element => element.id == id).status === "DISABLED",
                            onClick: async id => {
                                await fetchDisableUser({
                                    url: Endpoints.user.editByAdmin,
                                    method: "PUT",
                                    data: {
                                        id,
                                        status: "DISABLED"
                                    }
                                })
                                loadData()
                                themeContext.showSuccessSnackbar({ message: "users.disabledUserSuccessfully" })
                            },
                            activateOnSingleSelection: true,
                            activateOnMultipleSelection: false,
                        },
                        {
                            tooltip: "users.impersonificateUser",
                            icon: <AccessibilityOutlinedIcon />,
                            onClick: async id => {
                                await fetchImpersonificateUser({
                                    url: Endpoints.user.impersonificate,
                                    method: "POST",
                                    urlParams: {
                                        id
                                    }
                                })
                                window.location.assign(process.env.REACT_APP_FRONTEND_LINK);

                            },
                            activateOnSingleSelection: true,
                            activateOnMultipleSelection: false,
                        },
                        {
                            tooltip: "users.sendPushNotification",
                            icon: <SendOutlinedIcon />,
                            onClick: ids => {
                                setSelectedIdsForPushNotification(ids)
                                setOpenPushNotificationDialog(true)
                            },
                            activateOnSingleSelection: true,
                            activateOnMultipleSelection: true,
                        }
                    ]}
                />
            </Card>
            <PushNotificationDialog
                open={openPushNotificationDialog}
                setOpen={setOpenPushNotificationDialog}
                ids={selectedIdsForPushNotification}
            />
            <FloatingActionButton tooltip="users.createUser" href="/users-management-system/new" />
        </div>
    );
}

export default UsersList;
