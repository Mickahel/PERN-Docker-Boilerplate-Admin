import React, { useEffect, useContext } from "react";
import { ThemeContext } from "contexts/Providers/ThemeProvider";
import useFetch from "hooks/useFetch";
import RoundLoader from "components/RoundLoader";
import EnhancedTable from "components/EnhancedTable";
import Endpoints from "Endpoints";
import { Trans } from "react-i18next";
import { Card } from "@material-ui/core";
import "./style.scss";
import { useHistory } from "react-router-dom";
import BugReportOutlinedIcon from '@material-ui/icons/BugReportOutlined';
import EmojiObjectsOutlinedIcon from '@material-ui/icons/EmojiObjectsOutlined';
import CheckOutlinedIcon from '@material-ui/icons/CheckOutlined';
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';
import { DateTime } from "luxon";
function Feedbacks(props) {
    const themeContext = useContext(ThemeContext);
    const { loading, data, fetch } = useFetch();
    const { fetch: fetchDeleteFeedback } = useFetch();
    const { fetch: fetchEditFeedback } = useFetch();
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

    const handleFeedback = async (id) => {
        try {
            const result = await fetchEditFeedback({
                url: Endpoints.feedback.editById,
                method: "PUT",
                data: { id, handled: !data.find(feedback => feedback.id == id).handled }
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
                value: feedback.description,
                maxCharacters: 200
            },
            handled: {
                value: feedback.handled,
                onClick: async () => {
                    await handleFeedback(feedback.id)
                    themeContext.showSuccessSnackbar({ message: "feedback.changedHandleStatus" })
                    loadData()
                },
            },
            path: {
                value: feedback.path
            },
            createdAt: {
                value: DateTime.fromISO(feedback.createdAt).toLocaleString()
            },
            createdBy: {
                value: feedback.user.email,
                link: `/users-management-system/${feedback.user.id}`
            },
            screenshot: {
                link: process.env.REACT_APP_API_PUBLIC_URL + feedback.screenshotUrl
            }
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
                            tooltip: "feebacks.handle",
                            icon: <CheckOutlinedIcon />,
                            onClick: async (id) => {
                                await handleFeedback(id)
                                themeContext.showSuccessSnackbar({ message: "feedbacks.changedHandleStatus" })
                                loadData()
                            },
                            activateOnSingleSelection: true,
                            activateOnMultipleSelection: false,
                        },
                        {
                            tooltip: "feebacks.delete",
                            icon: <DeleteOutlineOutlinedIcon />,
                            onClick: async (id) => {
                                await fetchDeleteFeedback({
                                    url: Endpoints.feedback.deleteById,
                                    method: "DELETE",
                                    urlParams: { id }
                                })
                                themeContext.showSuccessSnackbar({ message: "feedbacks.deletedSuccessfully" })
                                loadData()
                            },
                            activateOnSingleSelection: true,
                            activateOnMultipleSelection: false,
                        }
                    ]}
                />
            </Card>
        </div>
    );
}

export default Feedbacks;
