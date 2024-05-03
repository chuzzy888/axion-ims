


// import React, { useState } from 'react';
// import { addDoc, collection } from 'firebase/firestore';
// import { db } from './firebase';

// function ProductForm() {
//     const [productName, setProductName] = useState('');
//     const [quantity, setQuantity] = useState('');
//     const [warehouse, setWarehouse] = useState('');
//     const [remarks, setRemarks] = useState('');
//     const [purchaseDate, setPurchaseDate] = useState('');
//     const [purchasePrice, setPurchasePrice] = useState('');

//     const handleSubmit = async (event) => {
//         event.preventDefault();
//         try {
//             await addDoc(collection(db, "products"), {
//                 name: productName,
//                 quantity: parseInt(quantity, 10),
//                 warehouse,
//                 remarks,
//                 purchaseDate,
//                 purchasePrice,
//             });
//             // Reset all form fields
//             setProductName('');
//             setQuantity('');
//             setWarehouse('');
//             setRemarks('');
//             setPurchaseDate('');
//             setPurchasePrice('');
//             // Display alert for successful product addition
//             alert("Product added successfully!");
//         } catch (error) {
//             console.error("Error adding product: ", error);
//         }
//     };

//     return (
//         <form onSubmit={handleSubmit} className=''>
//             <input
//                 type="text"
//                 value={productName}
//                 onChange={e => setProductName(e.target.value)}
//                 placeholder="Product Name"
//                 required
//             />
//             <input
//                 type="number"
//                 value={quantity}
//                 onChange={e => setQuantity(e.target.value)}
//                 placeholder="Quantity"
//                 required
//             />
//             <input
//                 type="text"
//                 value={warehouse}
//                 onChange={e => setWarehouse(e.target.value)}
//                 placeholder="Warehouse"
//                 required
//             />
//             <input
//                 type="text"
//                 value={remarks}
//                 onChange={e => setRemarks(e.target.value)}
//                 placeholder="Remarks"
//             />
//             <input
//                 type="date"
//                 value={purchaseDate}
//                 onChange={e => setPurchaseDate(e.target.value)}
//                 placeholder="Purchase Date"
//                 required
//             />
//             <input
//                 type="number"
//                 value={purchasePrice}
//                 onChange={e => setPurchasePrice(e.target.value)}
//                 placeholder="Purchase Price"
//                 required
//             />
//             <button type="submit">Add Product</button>
//         </form>
//     );
// }

// export default ProductForm;



























import React, { useState } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { db } from './firebase';
import  Footer  from '../src/Footer';
import { IoIosAddCircle } from "react-icons/io";


function ProductForm() {
    const [productName, setProductName] = useState('');
    const [quantity, setQuantity] = useState('');
    const [warehouse, setWarehouse] = useState('');
    const [remarks, setRemarks] = useState('');
    const [purchaseDate, setPurchaseDate] = useState('');
    const [purchasePrice, setPurchasePrice] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await addDoc(collection(db, "products"), {
                name: productName,
                quantity: parseInt(quantity, 10),
                warehouse,
                remarks,
                purchaseDate,
                purchasePrice,
            });
            // Reset all form fields
            setProductName('');
            setQuantity('');
            setWarehouse('');
            setRemarks('');
            setPurchaseDate('');
            setPurchasePrice('');
            // Display alert for successful product addition
            alert("Product added successfully!");
        } catch (error) {
            console.error("Error adding product: ", error);
        }
    };

    return (
        <div className=' bg-black'>
            <div className='flex justify-center items-center '> <img src="https://axionfoam.com/axionlogo.png" alt="" className='w-36'/></div>
     
            <div className="md:w-96 mx-auto p-5  flex justify-center items-center flex-col">
           
            <form onSubmit={handleSubmit} className='space-y-6'>
                <input
                    type="text"
                    value={productName}
                    onChange={e => setProductName(e.target.value)}
                    placeholder="Product Name"
                    className="w-full p-2 border border-gray-300 rounded-md"
                    required
                /><br></br>
                <input
                    type="number"
                    value={quantity}
                    onChange={e => setQuantity(e.target.value)}
                    placeholder="Quantity"
                    className="w-full p-2 border border-gray-300 rounded-md"
                    required
                /><br></br>
                <input
                    type="text"
                    value={warehouse}
                    onChange={e => setWarehouse(e.target.value)}
                    placeholder="Warehouse"
                    className="w-full p-2 border border-gray-300 rounded-md"
                    required
                /><br></br>
                <input
                    type="text"
                    value={remarks}
                    onChange={e => setRemarks(e.target.value)}
                    placeholder="Remarks"
                    className="w-full p-2 border border-gray-300 rounded-md"
                /><br></br>
                <input
                    type="date"
                    value={purchaseDate}
                    onChange={e => setPurchaseDate(e.target.value)}
                    placeholder="Purchase Date"
                    className="w-full p-2 border border-gray-300 rounded-md"
                    required
                /><br></br>
                <input
                    type="number"
                    value={purchasePrice}
                    onChange={e => setPurchasePrice(e.target.value)}
                    placeholder="Purchase Price"
                    className="w-full p-2 border border-gray-300 rounded-md"
                    required
                />
             <span className='flex justify-center items-center'>
             <button type="submit" className="text-3xl border border-gray-400 hover:bg-black hover:text-white p-1">
             <IoIosAddCircle />

                </button>
             </span>
              
            </form>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#0099ff" fill-opacity="1" d="M0,320L30,314.7C60,309,120,299,180,282.7C240,267,300,245,360,218.7C420,192,480,160,540,170.7C600,181,660,235,720,240C780,245,840,203,900,160C960,117,1020,75,1080,69.3C1140,64,1200,96,1260,133.3C1320,171,1380,213,1410,234.7L1440,256L1440,320L1410,320C1380,320,1320,320,1260,320C1200,320,1140,320,1080,320C1020,320,960,320,900,320C840,320,780,320,720,320C660,320,600,320,540,320C480,320,420,320,360,320C300,320,240,320,180,320C120,320,60,320,30,320L0,320Z"></path></svg>
        </div>
       
        </div>
        
    );
}

export default ProductForm;
