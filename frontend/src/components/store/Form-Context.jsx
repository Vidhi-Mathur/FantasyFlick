import { createContext, useState } from "react";

export const FormContext = createContext({
    formDetail: {
        submitted: false,
        captain: "",
        teamName: "",
        teamId: null
    },
    setFormDetail: () => {}
});

export const FormCtxProvider = ({ children }) => {
    const [ formDetail, setFormDetail ] = useState({
        submitted: false,
        captain: "",
        teamName: "",
        teamId: null
    });

    const ctxValue = {
        formDetail,
        setFormDetail
    };

    return <FormContext.Provider value={ctxValue}>{children}</FormContext.Provider>;
};