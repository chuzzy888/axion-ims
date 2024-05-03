// import React from 'react';

// function Dashboard({ totalInventoryCount, inventoryByCategory, topSellingProducts, lowStockProducts, totalExpenses, onTotalExpensesUpdate }) {
//     return (
//         <div className='flex flex-wrap justify-around items-center bg-slate-900 text-white p-8'>
//             <span className='bg-orange-500 h-32 w-52 flex justify-center items-center flex-col gap-3 shadow rounded'>

//                 <h2>Total Inventory Count </h2>
//                 <span className='font-bold h-8 w-8 text-xs rounded-full flex justify-center items-center bg-green-500 text-white'>{totalInventoryCount}</span>
//             </span>

//             <span className='bg-red-500 h-56 w-64 flex justify-center  items-center flex-col rounded shadow'>
//                 <h2 className='my-2'>Top Selling Products</h2>
//                 <span className=" gap-5">
//                     {topSellingProducts.map(product => (
//                         <span key={product.id} className='justify-between gap-2 flex'>
//                             <div className='h-8 m-0.5 bg-slate-900 px-3 py-1 rounded '>{product.name}</div><hr />
//                             <div className=" bg-blue-500 rounded-full m-1 w-6 h-6 flex items-center  justify-center text-white text-xs">{product.quantity}</div>
//                         </span>
//                     ))}
//                 </span>
//             </span>



//             <span className='bg-green-500 h-56 w-56 flex justify-center items-center flex-col rounded  shadow'>
//                 <h2 className='my-2'>Low Stock Products</h2>
//                 <span>
//                     {lowStockProducts.map(product => (
//                         <span key={product.id} className='justify-between gap-2 flex'>
//                             <div className='h-8 m-0.5 bg-slate-900 px-3 py-1 rounded '>{product.name}</div><hr />
//                             <div className=" bg-blue-500 rounded-full m-1 w-6 h-6 flex items-center  justify-center text-white text-xs">{product.quantity}</div>
//                         </span>
//                     ))}
//                 </span>

//             </span>

//             {/* <h2>Total Expenses: {onTotalExpensesUpdate}</h2> */}
//         </div>
//     );
// }

// export default Dashboard;






import React from 'react';

function Dashboard({ totalInventoryCount, inventoryByCategory, topSellingProducts, lowStockProducts, totalExpenses, onTotalExpensesUpdate }) {
    return (
        <div className='flex flex-wrap justify-around items-center bg-slate-900 text-white p-4 md:p-8 animate__animated animate__fadeIn '>
            <span className='bg-orange-500 h-32 w-full md:w-52 flex justify-center items-center flex-col gap-3 shadow rounded m-2'>
                <h2>Total Inventory Count</h2>
                <span className='font-bold h-8 w-8 text-xs rounded-full flex justify-center items-center bg-green-500 text-white'>
                    {totalInventoryCount}
                </span>
            </span>

            <span className='bg-red-500 h-auto md:h-56 w-full md:w-64 flex justify-center items-center flex-col rounded shadow m-2'>
                <h2 className='my-2'>Top Selling Products</h2>
                <div className='flex flex-col gap-1'>
                    {topSellingProducts.map(product => (
                        <span key={product.id} className='flex justify-between items-center w-full px-3'>
                            <div className='text-sm bg-slate-900 px-3 py-1 rounded'>{product.name}</div>
                            <div className="bg-blue-500 rounded-full m-1 w-6 h-6 flex items-center justify-center text-white text-xs">{product.quantity}</div>
                        </span>
                    ))}
                </div>
            </span>

            <span className='bg-green-500 h-auto md:h-56 w-full md:w-56 flex justify-center items-center flex-col rounded shadow m-2'>
                <h2 className='my-2'>Low Stock Products</h2>
                <div className='flex flex-col gap-1'>
                    {lowStockProducts.map(product => (
                        <span key={product.id} className='flex justify-between items-center w-full px-3'>
                            <div className='text-sm bg-slate-900 px-3 py-1 rounded'>{product.name}</div>
                            <div className="bg-blue-500 rounded-full m-1 w-6 h-6 flex items-center justify-center text-white text-xs">{product.quantity}</div>
                        </span>
                    ))}
                </div>
            </span>

            {/* Removed the Expenses since it wasn't implemented properly */}
        </div>
    );
}

export default Dashboard;


