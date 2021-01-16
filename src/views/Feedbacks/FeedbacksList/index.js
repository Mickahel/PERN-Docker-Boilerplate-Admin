import React, { useEffect, useContext } from "react";
import { ThemeContext } from "contexts/Providers/ThemeProvider";
import AssignmentOutlinedIcon from '@material-ui/icons/AssignmentOutlined';
import useFetch from "hooks/useFetch";
import RoundLoader from "components/RoundLoader";
import EnhancedTable from "components/EnhancedTable";
import Endpoints from "Endpoints";
import { Trans } from "react-i18next";
import { Card, CardContent, CardHeader, Chip } from "@material-ui/core";
import "./style.scss";
import { useHistory } from "react-router-dom";
import BugReportOutlinedIcon from '@material-ui/icons/BugReportOutlined';
import EmojiObjectsOutlinedIcon from '@material-ui/icons/EmojiObjectsOutlined';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';

import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';
function FeedbacksList(props) {
    const themeContext = useContext(ThemeContext);
    const { loading, data, fetch } = useFetch();
    const history = useHistory();

    const loadData = async () => {
        try {
            const result = await fetch({
                url: Endpoints.feedback.getAll,
                method: "GET",
            })
        }

        catch (e) {

        }
    }
    useEffect(() => {
        themeContext.setTitle("feedbacks.feedbacks", <BugReportOutlinedIcon />);
        loadData()
    }, []);


    const headCells = [
        {
            id: "description",
            label: <Trans>feedbacks.description</Trans>,
        },
        {
            id: "type",
            label: <Trans>feedbacks.type</Trans>,
        },
        {
            id: "handled",
            label: <Trans>feedbacks.handled</Trans>,
        },
        {
            id: "path",
            label: <Trans>feedbacks.path</Trans>,
        },
        {
            id: "createdAt",
            label: <Trans>feedbacks.createdAt</Trans>,
        },
                {
            id: "createdBy",
            label: <Trans>feedbacks.createdBy</Trans>,
        },
                        {
            id: "screenshot",
            label: <Trans>feedbacks.screenshot</Trans>,
        }
    ]


    if (loading) return <RoundLoader />
    const rows = data.map(feedback => {
        return {
            id: feedback.id,
            type: {
                value: feedback.type,
                component: feedback.type == "BUG" ? <BugReportOutlinedIcon /> : <EmojiObjectsOutlinedIcon />
            },
            description: {
                value: feedback.description
            },
            handled: {
                value: feedback.handled,
                onClick: ()=>{console.log(feedback.id)}
            },
            path: {
                value: feedback.path
            },
            createdAt: {
                value: feedback.createdAt
            },
            createdBy: {
                value: feedback.user.email,
                link: `/users-management-system/${feedback.user.id}`
            },
            screenshot:{
                
                link: process.env.REACT_APP_API_PUBLIC_URL +feedback.screenshotUrl}
            }
        
    })
    return (
        <div >
            <Card>
                <EnhancedTable
                    headCells={headCells}
                    rows={rows}
                    buttons={[
                        {
                            tooltip: "feebacks.delete",
                            icon: <DeleteOutlineOutlinedIcon />,
                            onClick: (id) => history.push(`/feedbacks/${id}`),
                            activateOnSingleSelection: true,
                            activateOnMultipleSelection: false,
                        }
                    ]}
                />
            </Card>
        </div>
    );
}

export default FeedbacksList;
