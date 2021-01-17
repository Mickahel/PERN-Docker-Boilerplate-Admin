import React from "react";
import { useRouteMatch } from "react-router-dom";
function useFormUtils(props) {

    let match = useRouteMatch();

    const isNew = () => match.params.id === "new"


    return {
        isNew
    }
}

export default useFormUtils;