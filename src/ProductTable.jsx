




import React, { useState, useEffect } from 'react';
import { useTable } from 'react-table';
import { collection, onSnapshot, doc, updateDoc, getDoc, setDoc, deleteDoc } from 'firebase/firestore';
import { db } from './firebase';
import Dashboard from './Dashboard';
import { CiSearch } from "react-icons/ci";
import { FaRegEye, FaRegEyeSlash, FaTachometerAlt, FaRegEdit, FaTrash } from 'react-icons/fa';

function ProductTable() {
    const [products, setProducts] = useState([]);
    const [editingProduct, setEditingProduct] = useState(null);
    const [newQuantity, setNewQuantity] = useState('');
    const [newPrice, setNewPrice] = useState('');
    const [newDate, setNewDate] = useState('');
    const [filter, setFilter] = useState('');
    const [totalExpenses, setTotalExpenses] = useState(0);
    const [totalInventoryCount, setTotalInventoryCount] = useState(0);
    const [inventoryByCategory, setInventoryByCategory] = useState({});
    const [topSellingProducts, setTopSellingProducts] = useState([]);
    const [lowStockProducts, setLowStockProducts] = useState([]);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showdashboard, setshowdashboard] = useState(false)

    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, "products"), (snapshot) => {
            const productList = [];
            let totalCount = 0;
            const inventoryByCat = {};
            snapshot.forEach((doc) => {
                const product = { id: doc.id, ...doc.data() };
                productList.push(product);
                totalCount += product.quantity;

                if (inventoryByCat[product.category]) {
                    inventoryByCat[product.category] += product.quantity;
                } else {
                    inventoryByCat[product.category] = product.quantity;
                }
            });
            setProducts(productList);
            setTotalInventoryCount(totalCount);
            setInventoryByCategory(inventoryByCat);

            const sortedProducts = [...productList].sort((a, b) => b.quantity - a.quantity);
            setTopSellingProducts(sortedProducts.slice(0, 5));
            const lowStock = productList.filter(product => product.quantity <= 10);
            setLowStockProducts(lowStock);
        });

        return () => unsubscribe();
    }, []);

    useEffect(() => {
        const fetchTotalExpenses = async () => {
            const totalExpensesRef = doc(db, 'totalExpenses', 'total');
            const totalExpensesSnapshot = await getDoc(totalExpensesRef);
            if (totalExpensesSnapshot.exists()) {
                setTotalExpenses(totalExpensesSnapshot.data().value);
            }
        };

        fetchTotalExpenses();
    }, []);

    useEffect(() => {
        const expenses = products.reduce((total, product) => total + (product.purchasePrice * product.quantity), 0);
        setTotalExpenses(expenses);

        const totalExpensesRef = doc(db, 'totalExpenses', 'total');
        setDoc(totalExpensesRef, { value: expenses });
    }, [products]);

    const handleSell = async (id, currentQuantity) => {
        if (currentQuantity <= 0) return;
        const newQuantity = currentQuantity - 1;
        const productRef = doc(db, "products", id);

        try {
            await updateDoc(productRef, { quantity: newQuantity });
        } catch (error) {
            console.error("Error updating product: ", error);
        }
    };

    const handleEdit = (product) => {
        setEditingProduct(product);
        setNewQuantity(product.quantity.toString());
        setNewPrice(product.purchasePrice.toString());
        setNewDate(product.purchaseDate);
        setShowEditModal(true); // Show the edit modal when editing begins
    };

    const toggledashboardvisibility = () => {
        setshowdashboard(!showdashboard)
    }

    const handleUpdate = async () => {
        if (!newQuantity || !newPrice || !newDate) return;

        const updatedQuantity = parseInt(newQuantity);
        const updatedPrice = parseFloat(newPrice);
        const productRef = doc(db, "products", editingProduct.id);

        try {
            await updateDoc(productRef, { quantity: updatedQuantity, purchasePrice: updatedPrice, purchaseDate: newDate });
            setEditingProduct(null);
            setNewQuantity('');
            setNewPrice('');
            setNewDate('');
            setShowEditModal(false); // Hide the edit modal after updating
        } catch (error) {
            console.error("Error updating product: ", error);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            const productRef = doc(db, "products", id);
            try {
                await deleteDoc(productRef);
            } catch (error) {
                console.error("Error deleting product: ", error);
            }
        }
    };

    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(filter.toLowerCase()) ||
        product.warehouse.toLowerCase().includes(filter.toLowerCase())
    );

    const data = React.useMemo(
        () => filteredProducts.map(product => ({
            ...product,
            purchasePrice: `₦${product.purchasePrice}`, // Add the Naira sign to the purchase price
            totalAmount: `₦${product.quantity * product.purchasePrice}` // Add the Naira sign to the total amount
        })),
        [filteredProducts]
    );

    const columns = React.useMemo(
        () => [
            {
                Header: '#',
                accessor: (row, i) => i + 1,
                disableSortBy: true
            },
            {
                Header: 'Product',
                accessor: 'name'
            },
            {
                Header: 'Quantity',
                accessor: 'quantity'
            },
            {
                Header: 'Warehouse',
                accessor: 'warehouse'
            },
            {
                Header: 'Remarks',
                accessor: 'remarks',
                Cell: ({ value }) => value || 'N/A'
            },
            {
                Header: 'Purchase Date',
                accessor: 'purchaseDate'
            },
            {
                Header: 'Purchase Price',
                accessor: 'purchasePrice'
            },
            {
                Header: 'Total Amount',
                accessor: 'totalAmount'
            },
            {
                Header: 'Actions',
                Cell: ({ row }) => (
                    <div className="flex space-x-2">
                        <button onClick={() => handleSell(row.original.id, row.original.quantity)} disabled={row.original.quantity <= 0} className='bg-red-600 text-white px-3 py-1 rounded'>
                            Sell
                        </button>
                        <button onClick={() => handleEdit(row.original)} className='bg-green-500 text-white px-3 py-1 rounded'>
                            Re-stock
                        </button>
                        <button onClick={() => handleDelete(row.original.id)} className="text-red-500 hover:text-red-800">
                            <FaTrash />
                        </button>
                    </div>
                ),
                disableSortBy: true
            }
        ],
        []
    );

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow
    } = useTable({ columns, data });

    return (
        <>

            <div className='flex justify-around items-center sticky flex-wrap top-0 bg-gray-100'>
            <div className='flex justify-center items-center'> <img src="https://axionfoam.com/axionlogo.png" alt="" className='w-36'/></div>
     
                <div className='relative flex items-center m-3 md:m-5'>
                    <CiSearch className='absolute left-5 text-gray-400' />
                    <input
                        type="text"
                        value={filter}
                        onChange={e => setFilter(e.target.value)}
                        placeholder="Search by product or warehouse.."
                        className="pl-10 pr-3 py-2 border-2 border-gray-300 rounded-lg w-64 md:w-72 placeholder:text-sm placeholder:text-gray-400 "
                    />
                </div>
                <button onClick={toggledashboardvisibility} className="bg-blue-500 text-white px-4 py-2 rounded m-3">
                    {showdashboard ? <FaRegEyeSlash /> : <FaRegEye />}
                </button>
            </div>

            {showdashboard && (
                <Dashboard
                    totalInventoryCount={totalInventoryCount}
                    inventoryByCategory={inventoryByCategory}
                    topSellingProducts={topSellingProducts}
                    lowStockProducts={lowStockProducts}
                    totalExpenses={totalExpenses}
                    
                />
            )}

            <div className="overflow-x-auto">
                <table {...getTableProps()} className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-500">
                        {headerGroups.map(headerGroup => (
                            <tr {...headerGroup.getHeaderGroupProps()}>
                                {headerGroup.headers.map(column => (
                                    <th {...column.getHeaderProps()} className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                                        {column.render('Header')}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody {...getTableBodyProps()} className="bg-white divide-y">
                        {rows.map(row => {
                            prepareRow(row);
                            return (
                                <tr {...row.getRowProps()} className="hover:bg-gray-100">
                                    {row.cells.map(cell => {
                                        return (
                                            <td {...cell.getCellProps()} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {cell.render('Cell')}
                                            </td>
                                        );
                                    })}
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
            {showEditModal && editingProduct && (
                <div className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-8 rounded shadow-lg">
                        <div className='flex justify-center items-center gap-2'>
                            <FaRegEdit className='mb-2' />
                            <h3 className="text-lg font-medium mb-2 text-center text-slate-500">Edit Product</h3>
                        </div>

                        <span className='flex justify-center items-center mb-4 bg-green-500 p-2 rounded-xl w-32'>
                            <p className="text-white font-medium  ">{editingProduct.name}</p>
                        </span>

                        <div className="flex justify-center items-center mb-2">
                            <span className="text-gray-600 mr-2 mb-2">QTY</span>
                            <input type="number" value={newQuantity} onChange={(e) => setNewQuantity(e.target.value)} placeholder="Qty" className="mb-2 p-2 border-2 border-gray-300 rounded block w-full" />
                        </div>

                        <div className="flex justify-center items-center mb-2">
                            <span className="text-gray-600 mr-2">₦</span>
                            <input type="number" value={newPrice} onChange={(e) => setNewPrice(e.target.value)} placeholder="Price" className="p-2 border-2 border-gray-300 rounded block w-full" />
                        </div>
                        <input type="date" value={newDate} onChange={(e) => setNewDate(e.target.value)} placeholder="Date" className="mb-2 p-2 border-2 border-gray-300 rounded block w-full" />
                        <div className='flex justify-center items-center'>
                            <button onClick={handleUpdate} className="bg-gray-600 hover:bg-gray-500 text-white px-4 py-2 rounded">
                                Update
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default ProductTable;
