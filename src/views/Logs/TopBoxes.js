import React from "react";
import "./style.scss";
import { Card, CardContent, CardHeader } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import { Trans } from "react-i18next";
import Box from '@material-ui/core/Box';
import { DateTime } from "luxon"
function TopBoxes(props) {
    const { startDate, endDate, amountOfDataKept } = props
    return (
        <div className="logs">
            <Card>
                <CardHeader title={<Trans>logs.information</Trans>} />
                <CardContent>
                    <div id="logsInformationContent" className=" flex justify-between">
                        <Typography component={'span'} >
                            <Box fontWeight='fontWeightBold' display='inline'>
                                <Trans>logs.startDate</Trans>:{" "}
                            </Box>
                            {DateTime.fromMillis(startDate).toLocaleString()}
                        </Typography>
                        <Typography component={'span'} >
                            <Box fontWeight='fontWeightBold' display='inline'>
                                <Trans>logs.endDate</Trans>:{" "}
                            </Box>
                            {DateTime.fromMillis(endDate).toLocaleString()}
                        </Typography>
                        <Typography component={'span'} >
                            <Box fontWeight='fontWeightBold' display='inline'>
                                <Trans>logs.amountOfDataKept</Trans>:{" "}
                            </Box>
                            {amountOfDataKept}{" "}
                            <Trans>logs.days</Trans>
                        </Typography>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

export default TopBoxes;
