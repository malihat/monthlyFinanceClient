// import './App.css';
// import {createRef} from 'react';

// function App() {
//   const fileInput = createRef();
//   const onSubmit = async (e) => {
//     e.preventDefault();
//     const formData = new FormData();
//     formData.set("photo", fileInput.current.files[0])
//     console.log('This is the file: ',fileInput.current.files[0]);
//     try {
//       const response = await fetch('http://localhost:5000', {
//         method: 'POST',
//         body: formData
//       })
//       const parsedResponse = await response.json();
//       if (response.ok) {
//         console.log('file uploaded');
//       } else {
//         console.error('Some error occures')
//       }

//     } catch (error) {
//         console.error(error.message);      
//     }

//   }
//   return (
//     <>
//       <div className="App"> 
//         <form onSubmit={onSubmit}>
//           <input ref={fileInput} type='file' name='photo' />
//           <input type='submit' value='Submit' />
//         </form>
//       </div>
//     </>
//   );
// }

// export default App;


import ListFormComponent from './components/ListFormComponent';
import TotalFormComponent from './components/TotalFormComponent';
import { ToastContainer } from 'react-toastify';


const App = () => {
    return (
        <>
        <ToastContainer />
        <div className="App"></div>
            <div className="dashboard-container">
                <div className="bg-[#f2ccff] text-center pt-2 pb-2 mb-[50px]">
                    {/* <h1 className="text-2xl font-bold font-arvo text-slate-700">Welcome {user?.firstName}! </h1> */}
                    <h2 className="text-md">Track Your Monthly Finances</h2>
                </div>

                <div className="mx-8">
                    <TotalFormComponent />
                    <ListFormComponent/>
                </div>
            </div>
        </>
    )
}

export default App;

