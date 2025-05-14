// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const ListDisplayComponent = ({ record, onDelete }) => {
//   const notifyDeleted = () => toast("Item has been deleted");

//   const handleDelete = (id) => {
//     onDelete(id);
//     notifyDeleted();
//   }

//   return (
//     <>
//       <div className="w-full ">
//         <div className="mb-8">
//           <h2 className="text-2xl font-bold mt-10 mb-5 text-gray-800 max-w-screen-md mx-auto">
//             List of the Items
//           </h2>
//           <table className="w-full text-md text-left rtl:text-right text-gray-900 dark:text-gray-400 overflow-x-auto shadow-md sm:rounded-lg text-center">
//             <thead className="text-md text-gray-900 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
//               <tr>
//                 <th className="text-md border border-gray-300 p-2">Store Name</th>
//                 <th className="text-md border border-gray-300 p-2">Date</th>
//                 <th className="text-md border border-gray-300 p-2">Amount</th>
//                 <th className="text-md border border-gray-300 p-2">Image</th>
//                 <th className="text-md border border-gray-300 p-2"></th>
//               </tr>
//             </thead>
//             <tbody>
//               {record.map((item, index) => (
//                 <tr
//                   key={index}
//                   className="border-t border-gray-300 hover:bg-gray-50"
//                 >
//                   <td className="border border-gray-300 p-2">{item.store}</td>
//                   <td className="border border-gray-300 p-2">{item.date}</td>
//                   <td className="border border-gray-300 p-2">${item.amount}</td>
//                   <td className="border border-gray-300 p-2">
//                     <img src={`${process.env.REACT_APP_BASE_URL}/uploads/${item.image}`} width={50} height={50} />
//                   </td>
//                   <td className="border border-gray-300 p-2 text-center">
//                     <button onClick={() => handleDelete(item._id)}>❌</button> 
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </>
//   );
// };

// export default ListDisplayComponent; 






import { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ListDisplayComponent = ({ record, onDelete }) => {
  const [selectedImage, setSelectedImage] = useState(null); // For modal image

  const notifyDeleted = () => toast("Item has been deleted");

  const handleDelete = (id) => {
    onDelete(id);
    notifyDeleted();
  };

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  return (
    <>
      <div className="w-full">
        <div className="mb-8">
          <h2 className="text-2xl font-bold mt-10 mb-5 text-gray-800 max-w-screen-md mx-auto">
            List of the Items
          </h2>
          <table className="w-full text-md text-left rtl:text-right text-gray-900 dark:text-gray-400 overflow-x-auto shadow-md sm:rounded-lg text-center">
            <thead className="text-md text-gray-900 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th className="text-md border border-gray-300 p-2">Store Name</th>
                <th className="text-md border border-gray-300 p-2">Date</th>
                <th className="text-md border border-gray-300 p-2">Amount</th>
                <th className="text-md border border-gray-300 p-2">Image</th>
                <th className="text-md border border-gray-300 p-2"></th>
              </tr>
            </thead>
            <tbody>
              {record.map((item, index) => (
                <tr key={index} className="border-t border-gray-300 hover:bg-gray-50">
                  <td className="border border-gray-300 p-2">{item.store}</td>
                  <td className="border border-gray-300 p-2">{item.date}</td>
                  <td className="border border-gray-300 p-2">${item.amount}</td>
                  <td className="border border-gray-300 p-2">
                    <img
                      src={`${process.env.REACT_APP_BASE_URL}/uploads/${item.image}`}
                      width={50}
                      height={50}
                      className="cursor-pointer"
                      onClick={() => handleImageClick(`${process.env.REACT_APP_BASE_URL}/uploads/${item.image}`)}
                      alt="thumbnail"
                    />
                  </td>
                  <td className="border border-gray-300 p-2 text-center">
                    <button onClick={() => handleDelete(item._id)}>❌</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Modal for enlarged image */}
        {selectedImage && (
          <div
            className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50"
            onClick={handleCloseModal}
          >
            <img
              src={selectedImage}
              className="max-w-full max-h-full object-contain"
              alt="enlarged"
            />
          </div>
        )}
      </div>
    </>
  );
};

export default ListDisplayComponent;


