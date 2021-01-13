import React, { useEffect, useContext } from "react";
import { ThemeContext } from "contexts/Providers/ThemeProvider";
import AssignmentOutlinedIcon from '@material-ui/icons/AssignmentOutlined';
import useFetch from "hooks/useFetch";
import RoundLoader from "components/RoundLoader";
import EnhancedTable from "components/EnhancedTable";
import Endpoints from "Endpoints";
import { Trans } from "react-i18next";
import { Card, CardContent, CardHeader, Chip } from "@material-ui/core";
import PersonOutlineOutlinedIcon from '@material-ui/icons/PersonOutlineOutlined';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import FloatingActionButton from "components/FloatingActionButton"
import "./style.scss";
import { useHistory } from "react-router-dom";

function UsersList(props) {
    const themeContext = useContext(ThemeContext);
    const { loading, data, fetch } = useFetch();
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
        themeContext.setTitle("users.users", <PersonOutlineOutlinedIcon />);
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
                value: user.email
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
                        }
                    ]}
                />
            </Card>
            <FloatingActionButton href="/users-management-system/new" />
        </div>
    );
}

export default UsersList;