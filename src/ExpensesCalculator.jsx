



// import React, { useState, useEffect } from 'react';
// import { doc, updateDoc, getDoc, increment, collection, addDoc, onSnapshot } from 'firebase/firestore';
// import { db } from './firebase';
// import  Footer from './Footer'

// function ExpensesCalculator({ onTotalExpensesUpdate }) {
//     const [expensesList, setExpensesList] = useState([]);
//     const [date, setDate] = useState('');
//     const [description, setDescription] = useState('');
//     const [amount, setAmount] = useState('');
//     const [totalExpenses, setTotalExpenses] = useState(0);

//     useEffect(() => {
//         const fetchExpenses = async () => {
//             const expensesSnapshot = await getDoc(doc(db, 'totalExpenses', 'total'));
//             if (expensesSnapshot.exists()) {
//                 setTotalExpenses(expensesSnapshot.data().value);
//             }
//         };

//         const unsubscribe = onSnapshot(collection(db, 'expenses'), (querySnapshot) => {
//             const expenses = [];
//             let total = 0;
//             querySnapshot.forEach((doc) => {
//                 const data = doc.data();
//                 total += data.amount;
//                 expenses.push({...data, id: doc.id});
//             });
//             setExpensesList(expenses);
//             setTotalExpenses(total);
//             // Update the total expenses in the parent component
//             if (typeof onTotalExpensesUpdate === 'function') {
//                 onTotalExpensesUpdate(total);
//             }
//         });

//         fetchExpenses();

//         return () => unsubscribe();
//     }, []);

//     const handleAddExpense = async () => {
//         if (!date || !description || !amount || isNaN(parseInt(amount))) return;

//         const newExpense = { 
//             date, 
//             description, 
//             amount: parseInt(amount)
//         };

//         const expensesRef = collection(db, 'expenses');
//         await addDoc(expensesRef, newExpense);

//         const totalExpensesRef = doc(db, 'totalExpenses', 'total');
//         await updateDoc(totalExpensesRef, {
//             value: increment(newExpense.amount)
//         });

//         setDate('');
//         setDescription('');
//         setAmount('');
//     };

//     return (
//         <div className="max-w-4xl mx-auto p-4 bg-white shadow-md rounded-lg">
//             <h2 className="text-xl font-bold text-gray-700 mb-4">Expenses Calculator</h2>
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
//                 <div>
//                     <label className="block text-gray-700">Date:</label>
//                     <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="w-full p-2 border border-gray-300 rounded" />
//                 </div>
//                 <div>
//                     <label className="block text-gray-700">Description:</label>
//                     <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} className="w-full p-2 border border-gray-300 rounded" />
//                 </div>
//                 <div>
//                     <label className="block text-gray-700">Amount:</label>
//                     <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} className="w-full p-2 border border-gray-300 rounded" />
//                 </div>
//             </div>
//             <button onClick={handleAddExpense} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Add Expense</button>

//             <h3 className="text-lg font-bold text-gray-700 mt-6 mb-2">Expense List</h3>
//             <table className="w-full text-left">
//                 <thead className="bg-gray-100">
//                     <tr>
//                         <th className="p-2">Date</th>
//                         <th className="p-2">Description</th>
//                         <th className="p-2">Amount</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {expensesList.map((expense, index) => (
//                         <tr key={index} className="hover:bg-gray-50">
//                             <td className="p-2">{expense.date}</td>
//                             <td className="p-2">{expense.description}</td>
//                             <td className="p-2">₦{expense.amount}</td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>

//             <h3 className="text-lg font-bold text-gray-600 mt-4">Total Expenses:
             
//             ₦<span className='text-white bg-green-500 rounded-lg p-2 ml-2 '>{totalExpenses}</span>
//              </h3>
//              <Footer/>
//         </div>
//     );
// }

// export default ExpensesCalculator;



















import React, { useState, useEffect } from 'react';
import { doc, updateDoc, getDoc, increment, collection, addDoc, onSnapshot, deleteDoc } from 'firebase/firestore';
import { db } from './firebase';
import Footer from './Footer';
import { FaTrash } from 'react-icons/fa';

function ExpensesCalculator({ onTotalExpensesUpdate }) {
    const [expensesList, setExpensesList] = useState([]);
    const [date, setDate] = useState('');
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState('');
    const [totalExpenses, setTotalExpenses] = useState(0);

    useEffect(() => {
        const fetchExpenses = async () => {
            const expensesSnapshot = await getDoc(doc(db, 'totalExpenses', 'total'));
            if (expensesSnapshot.exists()) {
                setTotalExpenses(expensesSnapshot.data().value);
            }
        };

        const unsubscribe = onSnapshot(collection(db, 'expenses'), (querySnapshot) => {
            const expenses = [];
            let total = 0;
            querySnapshot.forEach((doc) => {
                const data = doc.data();
                total += data.amount;
                expenses.push({ ...data, id: doc.id });
            });
            setExpensesList(expenses);
            setTotalExpenses(total);
            // Update the total expenses in the parent component
            if (typeof onTotalExpensesUpdate === 'function') {
                onTotalExpensesUpdate(total);
            }
        });

        fetchExpenses();

        return () => unsubscribe();
    }, []);

    const handleAddExpense = async () => {
        if (!date || !description || !amount || isNaN(parseInt(amount))) return;

        const newExpense = {
            date,
            description,
            amount: parseInt(amount)
        };

        const expensesRef = collection(db, 'expenses');
        await addDoc(expensesRef, newExpense);

        const totalExpensesRef = doc(db, 'totalExpenses', 'total');
        await updateDoc(totalExpensesRef, {
            value: increment(newExpense.amount)
        });

        setDate('');
        setDescription('');
        setAmount('');
    };

    const handleDeleteExpense = async (id, amount) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this expense?');
        if (!confirmDelete) return;

        try {
            await deleteDoc(doc(db, 'expenses', id));
            const updatedTotalExpenses = totalExpenses - amount;
            setTotalExpenses(updatedTotalExpenses);
            if (typeof onTotalExpensesUpdate === 'function') {
                onTotalExpensesUpdate(updatedTotalExpenses);
            }
        } catch (error) {
            console.error('Error deleting expense: ', error);
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-4 bg-white shadow-md rounded-lg">
            <div className='flex justify-center items-center'> <img src="https://axionfoam.com/axionlogo.png" alt="" className='w-36'/></div>
     
     
            <h2 className="text-xl font-bold text-gray-700 mb-4 text-center my-3">Expenses Calculator</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                    <label className="block text-gray-700">Date:</label>
                    <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="w-full p-2 border border-gray-300 rounded" />
                </div>
                <div>
                    <label className="block text-gray-700">Description:</label>
                    <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} className="w-full p-2 border border-gray-300 rounded" />
                </div>
                <div>
                    <label className="block text-gray-700">Amount:</label>
                    <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} className="w-full p-2 border border-gray-300 rounded" />
                </div>
            </div>
            <button onClick={handleAddExpense} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Add Expense</button>

            <h3 className="text-lg font-bold text-gray-700 mt-6 mb-2">Expense List</h3>
            <table className="w-full text-left">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="p-2">Date</th>
                        <th className="p-2">Description</th>
                        <th className="p-2">Amount</th>
                        <th className="p-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {expensesList.map((expense, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                            <td className="p-2">{expense.date}</td>
                            <td className="p-2">{expense.description}</td>
                            <td className="p-2">₦{expense.amount}</td>
                            <td className="p-2">
                                <button onClick={() => handleDeleteExpense(expense.id, expense.amount)} className="text-red-600 hover:text-red-800">
                                    <FaTrash />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <h3 className="text-lg font-bold text-gray-600 mt-4">
                Total Expenses: ₦
                <span className="text-white bg-green-500 rounded-lg p-2 ml-2">{totalExpenses}</span>
            </h3>
            <Footer />
        </div>
    );
}

export default ExpensesCalculator;
