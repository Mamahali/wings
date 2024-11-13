import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';


const Dashboard = ({ activeUser }) => {
    const [products, setProducts] = useState([]);
    const [totalQuantity, setTotalQuantity] = useState(0);
    const [lowStockProducts, setLowStockProducts] = useState([]);
    const [currentImageIndex, setCurrentImageIndex] = useState(0); // Track current image index
    const images = [
        `${process.env.PUBLIC_URL}/images/biscuits.jpeg`,
        `${process.env.PUBLIC_URL}/images/image2.jpg`,
        `${process.env.PUBLIC_URL}/images/image3.jpg`
    ];
    

    useEffect(() => {
        // Fetch products from localStorage
        const storedProducts = JSON.parse(localStorage.getItem('products')) || [];
        setProducts(storedProducts);

        // Calculate total stock and low-stock products
        const totalQty = storedProducts.reduce((sum, product) => sum + product.quantity, 0);
        setTotalQuantity(totalQty);

        const lowStock = storedProducts.filter(product => product.quantity < 5);
        setLowStockProducts(lowStock);
    }, []);

    // Image rotation effect using useEffect and setInterval
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 3000); // Change image every 3 seconds

        return () => clearInterval(interval); // Cleanup interval on component unmount
    }, [images.length]);

    // Prepare data for the stock graph
    const chartData = {
        labels: products.map(product => product.name),
        datasets: [
            {
                label: 'Quantity in Stock',
                data: products.map(product => product.quantity),
                backgroundColor: 'rgba(54, 162, 235, 0.6)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1,
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                enabled: true,
                callbacks: {
                    label: (context) => `Quantity: ${context.raw}`,
                },
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Quantity',
                },
            },
            x: {
                title: {
                    display: true,
                    text: 'Product Name',
                },
            },
        },
    };

    return (
        <div style={{ padding: '20px', backgroundColor: '#f4f4f4', borderRadius: '8px', maxWidth: '800px', margin: '0 auto' }}>
            <h1 style={{ color: '#333', fontSize: '24px', textAlign: 'center' }}>
                Welcome to Wings Cafe Inventory Management, {activeUser}
            </h1>

            {/* Stock summary */}
            <div style={{ marginTop: '20px', padding: '15px', backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)' }}>
                <h2 style={{ color: '#333', fontSize: '20px' }}>Stock Summary</h2>
                <p>Total Products: {products.length}</p>
                <p>Total Stock Quantity: {totalQuantity}</p>
                <p>Low Stock Products:</p>
                <ul>
                    {lowStockProducts.map((product, index) => (
                        <li key={index} style={{ color: 'red' }}>
                            {product.name} - Only {product.quantity} left
                        </li>
                    ))}
                </ul>
            </div>

            {/* Stock chart */}
            <div style={{ marginTop: '30px', padding: '15px', backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)' }}>
                <h2 style={{ color: '#333', fontSize: '20px', textAlign: 'center' }}>Stock Quantity Chart</h2>
                <Bar data={chartData} options={chartOptions} />
            </div>

            {/* Product Image Rotation */}
            <div style={{ marginTop: '30px', padding: '15px', backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)', textAlign: 'center' }}>
                <h2 style={{ color: '#333', fontSize: '20px' }}>Product Images</h2>
                <img
                    src={images[currentImageIndex]}
                    alt={`Product ${currentImageIndex + 1}`}
                    style={{ width: '200px', height: 'auto', margin: '0 auto' }}
                />
            </div>
        </div>
    );
};

export default Dashboard;
