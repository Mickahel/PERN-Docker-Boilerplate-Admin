import React, { useContext, useEffect } from "react";
import { EditorState, ContentState, convertToRaw, convertFromHTML } from 'draft-js'
import htmlToDraft from 'html-to-draftjs'
import draftToHtml from 'draftjs-to-html'

import "./style.scss";
import { Card, CardContent, Button, CardHeader } from "@material-ui/core";
import { Trans } from "react-i18next";
import CardActions from "@material-ui/core/CardActions";
import { useFormik } from "formik";
import { Editor as EditorWYSIWYG } from 'react-draft-wysiwyg';
import '../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import classnames from 'classnames'
import { convertToDraft, convertFromDraft } from 'auxiliaries/DraftJs';
import { ThemeContext } from "contexts/Providers/ThemeProvider"
import useFetch from "hooks/useFetch";
import Endpoints from "Endpoints"
import RoundLoader from "components/RoundLoader";
import GavelOutlinedIcon from '@material-ui/icons/GavelOutlined';
function GDPR(props) {
    const themeContext = useContext(ThemeContext)
    const { fetch: privacyPolicyFetch } = useFetch();
    const { fetch: termsOfServiceFetch } = useFetch();
    const { loading, data: fetchedData, fetchAll } = useFetch();

    const loadData = async () => {
        const t = await fetchAll([{
            method: "GET",
            name: "privacyPolicy",
            url: Endpoints.generalSettings.getGeneralSetting,
            urlParams: {
                feature: "privacyPolicy"
            }
        }, {
            method: "GET",
            name: "termsOfService",
            url: Endpoints.generalSettings.getGeneralSetting,
            urlParams: {
                feature: "termsOfService"
            }
        }])

        formikPrivacyPolicy.setFieldValue("privacyPolicy", convertToDraft(t?.data?.privacyPolicy?.value))
        formikTermsOfService.setFieldValue("termsOfService", convertToDraft(t?.data?.termsOfService?.value))

    }
    useEffect(() => {
        themeContext.setTitle("GDPR", <GavelOutlinedIcon />)
        loadData()

    }, [])

    const formikPrivacyPolicy = useFormik(
        {
            //           enableReinitialize: true,
            initialValues: {
                privacyPolicy: ""
            },
            onSubmit: async (values) => {
                try {
                    await privacyPolicyFetch({
                        method: "PUT",
                        url: Endpoints.generalSettings.editGeneralSetting,
                        data: {
                            feature: "privacyPolicy",
                            value: convertFromDraft(values.privacyPolicy)
                        }
                    });
                    themeContext.showSuccessSnackbar({ message: "gdpr.privacyPolicyChangedSuccessfully" })
                } catch (e) {

                }
            }
        }
    )

    const formikTermsOfService = useFormik(
        {
            initialValues: {
                termsOfService: ""
            },
            onSubmit: async (values) => {
                try {
                    await termsOfServiceFetch({
                        method: "PUT",
                        url: Endpoints.generalSettings.editGeneralSetting,
                        data: {
                            feature: "termsOfService",
                            value: convertFromDraft(values.termsOfService)
                        }
                    });
                    themeContext.showSuccessSnackbar({ message: "gdpr.termsOfServiceChangedSuccessfully" })
                } catch (e) {

                }
            }
        }
    )
    if (loading) return <RoundLoader />
    return (
        <div className={classnames("flex flex-col", themeContext.muiType === "light" ? "lightThemeEditor" : "darkThemeEditor")}>
            <Card id="privacyPolicyBox">
                <CardHeader title="Privacy Policy" />
                <form onSubmit={formikPrivacyPolicy.handleSubmit}>
                    <CardContent>
                        <EditorWYSIWYG
                            disabled={formikPrivacyPolicy.isSubmitting}
                            wrapperClassName={classnames("editor-wrapper", props.wrapperClassName)}
                            editorClassName={classnames("editor", props.editorClassName)}
                            editorState={formikPrivacyPolicy.values.privacyPolicy}
                            onEditorStateChange={(editorState) => { formikPrivacyPolicy.setFieldValue("privacyPolicy", editorState) }}
                        />
                    </CardContent>
                    <CardActions>
                        <Button
                            color="primary"
                            type="submit"
                            disabled={formikPrivacyPolicy.isSubmitting}
                        >
                            <Trans>save</Trans>
                        </Button>
                    </CardActions>
                </form>
            </Card>
            <Card id="termsAndConditionseBox">
                <CardHeader title={<Trans>tos.termsOfService</Trans>} />
                <form onSubmit={formikTermsOfService.handleSubmit}>
                    <CardContent>
                        <EditorWYSIWYG
                            disabled={formikTermsOfService.isSubmitting}
                            wrapperClassName={classnames("editor-wrapper", props.wrapperClassName)}
                            editorClassName={classnames("editor", props.editorClassName)}
                            editorState={formikTermsOfService.values.termsOfService}
                            onEditorStateChange={(editorState) => { formikTermsOfService.setFieldValue("termsOfService", editorState) }}
                        />
                    </CardContent>
                    <CardActions>
                        <Button
                            color="primary"
                            type="submit"
                            disabled={formikTermsOfService.isSubmitting}
                        >
                            <Trans>save</Trans>
                        </Button>
                    </CardActions>
                </form>
            </Card>
        </div>
    )

}
export default GDPR;
