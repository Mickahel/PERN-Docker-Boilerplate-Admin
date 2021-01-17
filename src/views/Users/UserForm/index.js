import React, { useEffect, useContext } from "react";
import { ThemeContext } from "contexts/Providers/ThemeProvider";
import useFetch from "hooks/useFetch";
import useFormUtils from "hooks/useFormUtils";
import RoundLoader from "components/RoundLoader";
import Endpoints from "Endpoints";
import { Trans } from "react-i18next";
import { Card, CardContent, CardHeader, Chip } from "@material-ui/core";
import PersonOutlineOutlinedIcon from '@material-ui/icons/PersonOutlineOutlined';
import SaveOutlinedIcon from '@material-ui/icons/SaveOutlined';
import FloatingActionButton from "components/FloatingActionButton"
import "./style.scss";

function UserForm(props) {
    const themeContext = useContext(ThemeContext);
    const { loading, data, fetch } = useFetch();
    const { isNew } = useFormUtils();

    const loadData = async () => {
        try {
            const result = await fetch({
                url: Endpoints.user.getById,//
                urlParams: {
                    id: props.match.params.id
                },
                method: "GET",
            })
            console.log(result)
            themeContext.setTitle(result.email, <PersonOutlineOutlinedIcon />);
        }
        catch (e) {

        }
    }
    useEffect(() => {
        if (!isNew()) loadData()
    }, []);

    if (loading) return <RoundLoader />
    return (
        <div >
            <FloatingActionButton
                icon={<SaveOutlinedIcon />} />
        </div>
    );
}

export default UserForm;
