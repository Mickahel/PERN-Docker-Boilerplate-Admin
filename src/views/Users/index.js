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
import "./style.scss";

function Users(props) {
    const themeContext = useContext(ThemeContext);
    const { loading, data, fetch } = useFetch();

    const loadData = async () => {
        try {
            const result = await fetch({
                url: Endpoints.user.getAll,
                method: "GET",
            })
            console.log(result)
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
            id: "status",
            label: <Trans>user.status</Trans>,
        },
        {
            id: "firstname",
            label: <Trans>user.firstname</Trans>,
        },
        {
            id: "lastname",
            label: <Trans>user.lastname</Trans>,
        },
        {
            id: "role",
            label: <Trans>user.role</Trans>,
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
    }).reverse()
    return (
        <div >
                <Card>
                    <EnhancedTable
                        headCells={headCells}
                        rows={rows}
                        readOnly={false}
                        rowsPerPage={25}
                        dense={true}
                    />
                </Card>
        </div>
    );
}

export default Users;
