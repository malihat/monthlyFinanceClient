import { createContext, useState } from "react";

export const TotalMoneyContext = createContext();

export const TotalMoneyProvider = ({children}) => {
    // State for displaying submitted income
    const [submittedIncome, setSubmittedIncome] = useState();

    const addTotal = async (total) => {
        setSubmittedIncome(total);
    }

    return (
        <TotalMoneyContext.Provider value={{submittedIncome, addTotal}}>
            {children}
        </TotalMoneyContext.Provider>
    )
}