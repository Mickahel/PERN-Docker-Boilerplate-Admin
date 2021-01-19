import React, { useState } from "react";
import { ThemeContext } from "contexts/Providers/ThemeProvider";
import { UserContext } from "contexts/Providers/UserProvider";
import { Card, CardContent, CardHeader, Button } from "@material-ui/core";
import PhotoCameraOutlinedIcon from "@material-ui/icons/PhotoCameraOutlined";
import IconButton from "@material-ui/core/IconButton";
import DeleteOutlineOutlinedIcon from "@material-ui/icons/DeleteOutlineOutlined";
import Typography from "@material-ui/core/Typography";
import "./style.scss";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import { Trans } from "react-i18next";
import useFetch from "hooks/useFetch";
import Endpoints from "Endpoints";

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
  const { formikUser } = props
  const classes = useStyles();
  const [image, setImage] = useState(process.env.REACT_APP_API_PUBLIC_URL + formikUser.values.profileImageUrl)

  const handleUploadClick = (event) => {
    if (event?.target?.files[0]) {
      let file = event.target.files[0];
      const reader = new FileReader();
      console.log(URL.createObjectURL(event?.target?.files[0]))
      setImage(URL.createObjectURL(event?.target?.files[0]))

      formikUser.setFieldValue("file", file)

      formikUser.setFieldValue("filename", "profileImageUrl")
      formikUser.setFieldValue("removeProfileImageUrl", false)
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
              {formikUser.values.profileImageUrl && (
                <IconButton
                  onClick={() => {
                    formikUser.setFieldValue("removeProfileImageUrl", true)
                    formikUser.setFieldValue("file", null)
                    formikUser.setFieldValue("profileImageUrl", null)
                    setImage(null)
                  }}
                >
                  <DeleteOutlineOutlinedIcon color="primary" />
                </IconButton>
              )}
            </div>
          </div>
          <div className="mt-4 mb-2 flex justify-center">
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
