import React, { useContext, useState } from "react";
import { Card, CardContent, CardHeader } from "@material-ui/core";
import { Trans } from "react-i18next";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import "./style.scss";
import FormGroup from '@material-ui/core/FormGroup';
function UtilitiesBox(props) {
    const { formikUser } = props
    return (
        <Card id="utilitiesBox">
            <CardHeader title={<Trans>users.utilities</Trans>} />

            <CardContent>
                <div className="flex flex-col">
                    <FormControlLabel
                        control={
                            <Switch
                                name="sendActivationEmail"
                                checked={formikUser.values.sendActivationEmail}
                                onChange={formikUser.handleChange}
                                color="primary"
                            />
                        }
                        label={<Trans>users.sendActivationEmail</Trans>}
                    />
                </div>
            </CardContent>
        </Card>
    );
}

export default UtilitiesBox;
