import React, { useEffect, useContext } from "react";
import { ThemeContext } from "contexts/Providers/ThemeProvider";
import AssignmentOutlinedIcon from '@material-ui/icons/AssignmentOutlined';
import useFetch from "hooks/useFetch";
import RoundLoader from "components/RoundLoader";
import EnhancedTable from "components/EnhancedTable";
import Endpoints from "Endpoints";
import TopBoxes from "./TopBoxes"
import { Trans } from "react-i18next";
import { Card, CardContent, CardHeader, Chip } from "@material-ui/core";
import "./style.scss";

function Logs(props) {
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
                component: (text) => <Chip style={{ backgroundColor: log.bgColor }} label={text} />
            },
            message: {
                value: log.message
            },
        }
    }).reverse()
    return (
        <div>
            <TopBoxes
                startDate={data.startDate}
                endDate={data.endDate}
                amountOfDataKept={data.keep.amount}
            />
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

export default Logs;
