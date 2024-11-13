// src/utils/storage.js

export const getUsers = () => {
    return JSON.parse(localStorage.getItem('users')) || [];
};

export const setUsers = (users) => {
    localStorage.setItem('users', JSON.stringify(users));
};

export const getProducts = () => {
    return JSON.parse(localStorage.getItem('products')) || [];
};

export const setProducts = (products) => {
    localStorage.setItem('products', JSON.stringify(products));
};
