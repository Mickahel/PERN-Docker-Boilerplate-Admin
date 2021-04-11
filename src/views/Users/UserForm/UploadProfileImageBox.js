import React, { useState } from "react";
import { Card, CardContent, CardHeader, Button, CircularProgress } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import DeleteOutlineOutlinedIcon from "@material-ui/icons/DeleteOutlineOutlined";
import Typography from "@material-ui/core/Typography";
import "./style.scss";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import { Trans } from "react-i18next";

import useFormUtils from "hooks/useFormUtils";
const useStyles = makeStyles((theme) => ({
  large: {
    width: theme.spacing(12),
    height: theme.spacing(12),
  },
  input: {
    display: "none",
  },
}));

function UploadProfileImageBox(props) {
  const { formikUser, setImageFileForForm } = props
  const classes = useStyles();
  const [image, setImage] = useState(formikUser.values.profileImageUrl && process.env.REACT_APP_API_PUBLIC_URL + formikUser.values.profileImageUrl)
  const { isNew } = useFormUtils()
  const handleUploadClick = (event) => {
    if (event?.target?.files[0]) {
      let file = event.target.files[0];
      const reader = new FileReader();
      setImage(URL.createObjectURL(event?.target?.files[0]))
      setImageFileForForm(file)
      //formikUser.setFieldValue("profileImageUrl", undefined)
      if (!isNew()) formikUser.setFieldValue("removeProfileImageUrl", false)

      reader.onloadend = function (e) {

      }.bind(this);
    }
  };

  return (
    <Card id="uploadProfileImageBox">
      <CardHeader title={<Trans>profile.profileImage</Trans>} />
      <CardContent>
        <div className="flex flex-col items-center">
          <div className="flex relative">
            <Avatar
              className={classes.large}
              src={image}
            ></Avatar>
            <div className=" ml-24 absolute">
              {image && (
                <IconButton
                  onClick={() => {
                    if (!isNew()) formikUser.setFieldValue("removeProfileImageUrl", true)
                    //formikUser.setFieldValue("profileImageUrl", null)
                    setImage(null)
                  }}
                >
                  <DeleteOutlineOutlinedIcon color="primary" />
                </IconButton>
              )}
            </div>
          </div>
          <div className="mt-4 mb-2 flex flex-col justify-center">
            <Button color="primary" variant="outlined" component="label">
              <input
                accept="image/*"
                className={classes.input}
                id="profileImageUrl"
                name="profileImageUrl"
                type="file"
                onChange={(e) => {
                  handleUploadClick(e);
                }}
                onClick={(event) => {
                  event.target.value = null;
                }}
              />
              <Trans>profile.upload</Trans>
            </Button>
          </div>
          <div className="mt-2 mb-2 flex justify-center">
            <Typography color="textSecondary" variant="body1">
              <Trans>profile.uploadImageText</Trans>
            </Typography>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default UploadProfileImageBox;
