import React, { useState, useContext } from "react";
import "./style.scss";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Trans } from "react-i18next";
import { useFormik } from "formik";
import useFetch from "hooks/useFetch";
import Endpoints from "Endpoints";
import { ThemeContext } from "contexts/Providers/ThemeProvider";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import DeleteOutlineOutlinedIcon from "@material-ui/icons/DeleteOutlineOutlined";
import IconButton from "@material-ui/core/IconButton";

const useStyles = makeStyles((theme) => ({
    large: {
        width: theme.spacing(12),
        height: theme.spacing(12),
    },
    input: {
        display: "none",
    },
}));

function PushNotificationDialog(props) {
    const { open, setOpen, ids } = props
    const [image, setImage] = useState()
    const [imageForForm, setImageForForm] = useState()
    const { fetch } = useFetch();
    const themeContext = useContext(ThemeContext)
    const classes = useStyles();
    const formikSendPushNotification = useFormik({
        initialValues: {
            title: undefined,
            body: undefined,
            clickAction: undefined
        },
        onSubmit: async (values) => {
            try {
                await fetch({
                    url: Endpoints.pushNotification.sendPushNotification,
                    data: {
                        ids: typeof ids == "string" ? [ids] : ids,
                        ...values
                    },
                    file: imageForForm,
                    filename: "image",
                    method: "POST",
                });
                handleClose()
                themeContext.showSuccessSnackbar({ message: "users.pushNotificationSent" });
            } catch (e) {

            }
        },
    })


    const handleUploadClick = (event) => {
        if (event?.target?.files[0]) {
            let file = event.target.files[0];
            const reader = new FileReader();
            setImageForForm(file)
            setImage(URL.createObjectURL(event?.target?.files[0]))
            reader.onloadend = function (e) {

            }.bind(this);
        }
    };

    const handleClose = () => {
        setOpen(false)
        formikSendPushNotification.resetForm()
        setImageForForm(undefined)
        setImage(undefined)
    }

    return (
        <div>
            <Dialog
                open={open}
                onClose={handleClose}
            >
                <DialogTitle ><Trans>users.sendPushNotification</Trans></DialogTitle>
                <form onSubmit={formikSendPushNotification.handleSubmit}>
                    <DialogContent>
                        <DialogContentText>
                            <Trans>users.sendPushNotificationText</Trans>
                        </DialogContentText>
                        <div className="flex flex-col">
                            <div className="flex relative justify-center">
                                <input
                                    accept="image/*"
                                    className={classes.input}
                                    id="image"
                                    name="image"
                                    type="file"
                                    onChange={(e) => {
                                        handleUploadClick(e);
                                    }}
                                    onClick={(event) => {
                                        event.target.value = null;
                                    }}
                                />
                                <label htmlFor="image">
                                    <Avatar
                                        src={image}
                                        className={classes.large}
                                    />
                                </label>

                                <div className="ml-32 absolute">
                                    {image && (
                                        <IconButton
                                            onClick={() => {
                                                setImage(undefined)
                                                setImageForForm(undefined)
                                            }}
                                        >
                                            <DeleteOutlineOutlinedIcon color="primary" />
                                        </IconButton>
                                    )}
                                </div>
                            </div>
                            <TextField
                                id="title"
                                label={<Trans>users.title</Trans>}
                                variant="filled"
                                onChange={formikSendPushNotification.handleChange}
                                value={formikSendPushNotification.values?.title || ""}
                            />

                            <TextField
                                id="body"
                                label={<Trans>users.body</Trans>}
                                variant="filled"
                                onChange={formikSendPushNotification.handleChange}
                                value={formikSendPushNotification.values?.body || ""}
                            />
                            <TextField
                                id="clickAction"
                                label={<Trans>users.clickAction</Trans>}
                                variant="filled"
                                onChange={formikSendPushNotification.handleChange}
                                value={formikSendPushNotification.values?.clickAction || ""}
                            />
                        </div>


                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="primary">
                            <Trans>users.cancel</Trans>
                        </Button>
                        <Button type="submit" color="primary" autoFocus>
                            <Trans>users.send</Trans>
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        </div>
    );
}

export default PushNotificationDialog;
