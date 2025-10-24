import React, { useState, useRef, useEffect, useContext } from 'react';
import axios from 'axios';
import ListDisplayComponent from './ListDisplayComponent';
import PieChart from '../Piechart';
import { TotalMoneyContext } from '../TotalMoneyContext';
import { toast } from 'react-toastify';


const ListFormComponent = () => {
    const { addTotal, submittedIncome } = useContext(TotalMoneyContext);
    const [record, setRecord] = useState([]);
    const fileInputRef = useRef();
    const notifyError = () => toast.error("Not enough balance");
    const notifyAdded = () => toast("New item has been added");
    const tableRef = useRef(null);

    const [formData, setFormData] = useState({
      date: '',
      store: '',
      amount: '',
      payment: '',
      image: null
    });

    const fetchRecords = () => {
      axios.get(`${process.env.REACT_APP_BASE_URL}`).
        then((res) => {
          setRecord(res.data);
        }).catch((error) => {
          console.error(error);
        })
    }
  
    useEffect(() => {
      fetchRecords();
    }, []);

    useEffect(() => {
      console.log('PieChart updated with:', record);
    }, [record]);
    
  
    const handleChange = (e) => {
      const { name, value, files } = e.target;
      if (name === 'image') {
        setFormData({ ...formData, image: files[0] });
      } else {
        setFormData({ ...formData, [name]: value });
      }
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();

      const newRecord = { ...formData, date: formData.date.slice(0, 10) };
      console.log(newRecord.image);
  
      try {
        // First, post the total amount to the backend
        const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/total`, {
          total: submittedIncome - newRecord.amount,
        });
        addTotal(response.data.total);
      } catch (error) {
        console.error(error);
      }
  
      const data = new FormData();
      data.append('date', formData.date);
      data.append('store', formData.store);
      data.append('amount', formData.amount);
      data.append('payment', formData.payment);
      data.append('image', formData.image);
  
    // try {
    //     const res = await axios.post('http://localhost:5000', data, {
    //       headers: { 'Content-Type': 'multipart/form-data' },
    //     });
    //     console.log('Response:', res.data);
    //   } catch (err) {
    //     console.error(err);
    // }

    try {
        if (submittedIncome > 0) {
            // Send POST request with FormData
            const response = await axios.post(`${process.env.REACT_APP_BASE_URL}`, data, {
              headers: {
                'Content-Type': 'multipart/form-data', // Specify the content type for file uploads
              },
            });
    
            await fetchRecords();

            setRecord((prevRecords) => [...prevRecords, response.data]);

    
            // Clear the form after successful submission
            setFormData({
              date: '',
              store: '',
              amount: '',
              payment: '',
              image: '', 
            });
    
            if (fileInputRef.current) {
              fileInputRef.current.value = ''; // Clear the file input value
            }
    
            // Add the new record to the displayed list
    
            notifyAdded();
          } else {
            notifyError();
          }
        } catch (error) {
            console.error('Error submitting form:', error);
        }

        // Optional: Scroll smoothly to the table
        setTimeout(() => {
          tableRef.current?.scrollIntoView({ behavior: "smooth" });
        }, 200);
    };

    const handleDelete = (id) => {
      try {
        axios.delete(`${process.env.REACT_APP_BASE_URL}/${id}`)
          .then(() => {
            const updateDate = record.filter(item => item._id !== id);
            setRecord(updateDate);
          })
      } catch (error) {
        console.error('There was an error deleting the record!', error);
      }
    }
    return (
      <>
      <div className="form-container mt-8 max-w-screen-lg	mx-auto p-6 bg-white shadow-lg rounded-md">
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <h2 className="text-2xl font-bold mb-5 text-gray-800 mt-5">Enter your items here: </h2>
        <div className="grid grid-cols-1 gap-1 mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Date:</label>
          <input type="date" name="date" onChange={handleChange} value={formData.date}
            className="input p-1 w-full border-gray-300 rounded-md focus:outline-none focus:shadow-md focus:shadow-gray-300 " placeholder="Date" required />
        </div>

        <div className="form-field">
          <label className="block text-sm font-medium text-gray-700 mt-4 mb-1">Store Name:</label>
          <input type="text" name="store" onChange={handleChange} value={formData.store}
            className="input p-1 w-full border-gray-300 placeholder-slate-400 rounded-md border-gray-300 focus:outline-none focus:shadow-md focus:shadow-gray-300" placeholder="Store" required />
        </div>


        <div className="form-field">
          <label className="block text-sm font-medium text-gray-700 mt-4 mb-1">Amount:</label>
          <input type="number" name="amount" onChange={handleChange} value={formData.amount}
              className="input p-1 w-full border-gray-300 placeholder-slate-400 rounded-md roundes-sm focus:outline-none focus:shadow-md focus:shadow-gray-300"
              placeholder="Amount" required />
        </div>

        <div className="form-field">
          <label className="block text-sm font-medium text-gray-700 mt-4 mb-1">Payment Method:</label>
          <select type="text" name="payment" onChange={handleChange} value={formData.payment} placeholder="Payment Method">
            <option value="">Select a Payment Method</option>
            <option value="Credit Card">Credit Card</option>
            <option value="Cash">Cash</option>
            <option value="Bank Transfer">Bank Transfer</option>
          </select>
          {/* <input type="text" name="payment" onChange={handleChange} placeholder="Payment" required /> */}
        </div>

        <div className="form-field">
          <label className="block text-sm font-medium text-gray-700 mt-4 mb-1">Upload Receipt:</label>
          <input type="file" name="image" accept="image/*" onChange={handleChange} ref={fileInputRef} className="w-full" />
        </div>  
          
          <div className="flex justify-center">
            <button type="submit" className="w-full md:w-auto mt-5 px-8 py-2 bg-[#ab60c4] hover:bg-[#9754ad] text-white font-bold rounded">
              Add Record
            </button>
          </div>
        </form>
      </div>

      <div className="flex flex-col md:flex-row mt-8 items-center max-w-screen-lg mx-auto">
        <div className="w-full md:w-[35%] flex justify-center md:justify-start mb-4 md:mb-0">
          <PieChart record={record} />
        </div>
        <div ref={tableRef} className="w-full md:w-[75%] flex justify-center md:justify-end">
          <div className="w-full">
            <ListDisplayComponent record={record} onDelete={handleDelete} />
          </div>
        </div>
      </div>
      </>
    );
  };

  export default ListFormComponent;