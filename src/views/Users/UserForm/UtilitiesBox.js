import React, { useContext, useState } from "react";
import { Card, CardContent, CardHeader } from "@material-ui/core";
import { Trans } from "react-i18next";
import TextField from "@material-ui/core/TextField";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import "./style.scss";

function UtilitiesBox(props) {
    const { formikUser } = props
    return (
        <Card id="utilitiesBox">
            <CardHeader title={<Trans>users.utilities</Trans>} />

            <CardContent>
                <div className="flex flex-col">

                </div>
            </CardContent>
        </Card>
    );
}

export default UtilitiesBox;
