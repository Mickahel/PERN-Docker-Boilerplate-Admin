import React from "react";
import "./style.scss";
import { Card, CardContent, Button, CardHeader } from "@material-ui/core";
import { Trans } from "react-i18next";
import CardActions from "@material-ui/core/CardActions";
import { useFormik } from "formik";
import { Editor as EditorWYSIWYG } from 'react-draft-wysiwyg';
import '../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import classnames from 'classnames'
import { convertToDraft, convertFromDraft } from 'auxiliaries/DraftJs';



function GDPR(props) {
    const formikPrivacyPolicy = useFormik(
        {
            initialValues: {
                privacyPolicy: "",
            },
            onSubmit: values => {
                console.log(values)
                console.log(convertFromDraft(values.privacyPolicy))
            }
        }
    )


    const uploadImageCallBack = (file) => {
        console.log("ciao", file)
    }
    return (
        <div className="flex flex-col">
            <Card id="privacyPolicyBox">
                <form onSubmit={formikPrivacyPolicy.handleSubmit}>
                    <CardHeader title="Privacy Policy" />
                    <CardContent>
                        <EditorWYSIWYG
                            wrapperClassName={classnames("editor-wrapper", props.wrapperClassName)}
                            editorClassName={classnames("editor", props.editorClassName)}
                            toolbar={{
                                image: { uploadCallback: uploadImageCallBack, alt: { present: true, mandatory: true } }
                            }}
                            editorState={formikPrivacyPolicy.values.privacyPolicy}
                            onEditorStateChange={(editorState) => { formikPrivacyPolicy.setFieldValue("privacyPolicy", editorState) }}
                        />
                    </CardContent>
                    <CardActions>
                        <Button
                            color="primary"
                            type="submit"
                        >
                            <Trans>save</Trans>
                        </Button>
                    </CardActions>
                </form>
            </Card>
            <Card id="termsOfServiceBox">
                <CardHeader title={<Trans>tos.termsOfService</Trans>} />
                <CardActions>
                    <Button
                        color="primary"
                        onClick={() => {

                        }}
                    >
                        <Trans>save</Trans>
                    </Button>
                </CardActions>
            </Card>
        </div>
    )

}
export default GDPR;
