import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { TotalMoneyContext } from "../TotalMoneyContext";


export default function TotalFormComponent() {
    const {submittedIncome, addTotal} = useContext(TotalMoneyContext)
    const [totalMoney, setTotalMoney] = useState("");
    // const [submittedIncome, setSubmittedIncome] = useState(null); // State for displaying submitted income
    const cmonth = new Date().toLocaleString('default', { month: 'long' });
    const year = new Date().getFullYear();


    useEffect(() => {
        const fetchTotal = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/total`);

                if (response.data) {
                    addTotal(response.data[0].total); // Assuming `total` is part of the response
                }
            } catch (error) {
                console.error("Error fetching total:", error);
            }
        };

        fetchTotal();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/total`, {
                total: totalMoney,
            });
            addTotal(response.data.total);                      
        } catch (error) {
            console.log(error);
        }
        setTotalMoney('');      
    }   

    const handleChange = (e) => {
        const value = e.target.value;
        if (/^\d*$/.test(value)) {
            setTotalMoney(value); // Update state only if the value is numeric
        }
    }

    return (
        <div className="max-w-screen-lg	mx-auto">
            <div className="bg-purple-50 rounded p-8 mt-5">
                <form onSubmit={handleSubmit}>
                    <label className="text-base sm:text-lg font-medium text-gray-700 me-3">Enter the Total Amount</label>
                    <input id="input-field focus:border-blue-500" name="total"
                        placeholder="Enter Monthly Total" 
                        value={totalMoney}
                        onChange={handleChange}
                        className="rounded-md border-sm p-1.5"/>
                        <div id="monthly-total">
                            <button type="submit" className="bg-[#ab60c4] text-white font-bold focus:outline-none hover:bg-[#9754ad] rounded-md px-5 py-2">Submit</button>
                        </div>
                </form>
                <p className="text-base sm:text-lg font-medium text-gray-700 mt-5">Total amount for {cmonth}, {year}: <br></br> 
                    <span className="text-3xl font-bold text-[#ab60c4] mt-3">
                        {submittedIncome > 0 ? `$${submittedIncome}` : '' } 
                    </span>
                </p>
            </div>
        </div>
  )
}
