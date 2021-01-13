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

function UserForm(props) {
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

    if (loading) return <RoundLoader />
    return (
        <div >
            <FloatingActionButton />
        </div>
    );
}

export default UserForm;
