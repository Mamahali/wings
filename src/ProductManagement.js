import React, { useState, useEffect } from 'react';

const Product = () => {
    const [products, setProducts] = useState([]);
    const [product, setProduct] = useState({ name: '', category: '', price: '', quantity: '' });
    const [editingName, setEditingName] = useState(null);
    const [quantityChange, setQuantityChange] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/product');
            if (!response.ok) throw new Error('Failed to fetch products');
            const data = await response.json();
            setProducts(data);
            localStorage.setItem('products', JSON.stringify(data));
        } catch (error) {
            console.error('Fetch products error:', error);
            setErrorMessage('Error fetching products. Loading cached data.');
            const cachedData = localStorage.getItem('products');
            if (cachedData) setProducts(JSON.parse(cachedData));
        }
    };

    const handleSaveProduct = async () => {
        const updatedProduct = {
            ...product,
            price: parseFloat(product.price) || 0,
            quantity: parseInt(product.quantity, 10) || 0,
        };

        try {
            let response;
            if (editingName) {
                response = await fetch(`http://localhost:5000/api/product/${editingName}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(updatedProduct),
                });
            } else {
                response = await fetch('http://localhost:5000/api/product', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(updatedProduct),
                });
            }

            if (!response.ok) throw new Error('Failed to save product');
            fetchProducts();
            resetForm();
        } catch (error) {
            console.error('Save product error:', error);
            setErrorMessage('Error saving product');
        }
    };

    const handleDeleteProduct = async (name) => {
        try {
            const response = await fetch(`http://localhost:5000/api/product/${name}`, { method: 'DELETE' });
            if (!response.ok) throw new Error('Failed to delete product');
            fetchProducts();
        } catch (error) {
            console.error('Delete product error:', error);
            setErrorMessage('Error deleting product');
        }
    };

    const handleQuantityChange = async (name, changeType) => {
        const quantityChangeValue = parseInt(quantityChange, 10);
        if (isNaN(quantityChangeValue) || quantityChangeValue <= 0) {
            alert("Please enter a valid quantity to add or deduct.");
            return;
        }

        try {
            const response = await fetch(`http://localhost:5000/api/products/${name}/quantity`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ changeType, quantityChange: quantityChangeValue }),
            });
            if (!response.ok) throw new Error('Failed to update quantity');
            fetchProducts();
            setQuantityChange('');
        } catch (error) {
            console.error('Quantity change error:', error);
            setErrorMessage('Error updating quantity');
        }
    };

    const handleEditProduct = (name) => {
        const selectedProduct = products.find(prod => prod.name === name);
        setProduct({
            name: selectedProduct.name,
            category: selectedProduct.category,
            price: selectedProduct.price,
            quantity: selectedProduct.quantity,
        });
        setEditingName(name);
    };

    const resetForm = () => {
        setProduct({ name: '', category: '', price: '', quantity: '' });
        setEditingName(null);
        setErrorMessage('');
    };

    return (
        <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
            <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>
                {editingName ? 'Edit Product' : 'Add New Product'}
            </h2>
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

            <input
                value={product.name}
                onChange={e => setProduct({ ...product, name: e.target.value })}
                placeholder="Product Name"
                style={{ padding: '8px', margin: '10px 0', width: '100%', borderRadius: '4px' }}
            />
            <input
                value={product.category}
                onChange={e => setProduct({ ...product, category: e.target.value })}
                placeholder="Category"
                style={{ padding: '8px', margin: '10px 0', width: '100%', borderRadius: '4px' }}
            />
            <input
                value={product.price}
                onChange={e => setProduct({ ...product, price: e.target.value })}
                placeholder="Price"
                type="number"
                style={{ padding: '8px', margin: '10px 0', width: '100%', borderRadius: '4px' }}
            />
            <input
                value={product.quantity}
                onChange={e => setProduct({ ...product, quantity: e.target.value })}
                placeholder="Quantity"
                type="number"
                style={{ padding: '8px', margin: '10px 0', width: '100%', borderRadius: '4px' }}
            />
            <button onClick={handleSaveProduct} style={{ padding: '10px 20px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '4px' }}>
                {editingName ? 'Update Product' : 'Add Product'}
            </button>

            <h3 style={{ marginTop: '30px' }}>Product List</h3>
            <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Category</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((prod) => (
                        <tr key={prod.name}>
                            <td>{prod.name}</td>
                            <td>{prod.category}</td>
                            <td>{prod.price}</td>
                            <td>{prod.quantity}</td>
                            <td>
                                <button onClick={() => handleEditProduct(prod.name)} style={{ padding: '5px 10px', backgroundColor: '#f0ad4e', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Edit</button>
                                <button onClick={() => handleDeleteProduct(prod.name)} style={{ padding: '5px 10px', backgroundColor: '#d9534f', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Delete</button>
                                <button onClick={() => handleQuantityChange(prod.name, 'add')} style={{ padding: '5px 10px', backgroundColor: '#5bc0de', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Add Quantity</button>
                                <button onClick={() => handleQuantityChange(prod.name, 'deduct')} style={{ padding: '5px 10px', backgroundColor: '#f0ad4e', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Deduct Quantity</button>
                                <input
                                    type="number"
                                    value={quantityChange}
                                    onChange={e => setQuantityChange(e.target.value)}
                                    placeholder="Enter qty"
                                    style={{ padding: '5px', margin: '5px 0', width: '80%', borderRadius: '4px' }}
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Product;
