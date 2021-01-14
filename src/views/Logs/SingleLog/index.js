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

function SingleLog(props) {
    const themeContext = useContext(ThemeContext);
    const { loading, data, fetch } = useFetch();

    const loadData = async () => {
        try {
            const result = await fetch({
                url: Endpoints.logs.getAll,
                method: "GET",
            })
        }
        catch (e) {

        }
    }
    useEffect(() => {
        themeContext.setTitle("logs.logs", <AssignmentOutlinedIcon />);
        loadData()
    }, []);


    const headCells = [
        {
            id: "timestamp",
            label: <Trans>Timestamp</Trans>,
        },
        {
            id: "level",
            label: <Trans>logs.level</Trans>,
            helpText: <Trans>logs.levelHelperText</Trans>,
        },
        {
            id: "module",
            label: <Trans>logs.module</Trans>,
        },
        {
            id: "message",
            label: <Trans>logs.message</Trans>,
        },
        {
            id: "object",
            label: <Trans>logs.object</Trans>,
        },
    ]


    if (loading) return <RoundLoader />
    const rows = data.logs.map(log => {
        return {
            id: log.timestamp,
            timestamp: {
                value: log.timestamp
            },
            level: {
                value: log.level
            },
            module: {
                value: log.module,
                component: <Chip size="small" style={{ backgroundColor: log.bgColor }} label={log.module} />
            },
            message: {
                value: log.message
            },
            object: {
                value: log.object
            },
        }
    }).reverse()
    return (
        <div>
            <div className="mt-5">
                <Card>
                    <EnhancedTable
                        headCells={headCells}
                        rows={rows}
                        readOnly
                        rowsPerPage={25}
                        dense
                    />
                </Card>
            </div>
        </div>
    );
}

export default SingleLog;