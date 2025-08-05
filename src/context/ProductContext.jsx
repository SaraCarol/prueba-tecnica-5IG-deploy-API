/* eslint-disable no-unused-vars */
import { createContext, useState, useEffect, useContext } from "react";
import axios from 'axios';

const ProductContext = createContext();
const API_URL = "https://api.escuelajs.co/api/v1/products/"

export const ProductProvider = ({children}) => {

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filters, setFilters] = useState({});

    
        const fetchProducts = async (customFilters = {}) => {
            try {
                const query = new URLSearchParams(customFilters).toString();
                const URL = `${API_URL}?${query}`
                const response = await axios.get(URL);
                setProducts(response.data);
                setFilters(customFilters);
            } catch (error) {
                console.error("Error al obtener los productos:", error)
                setError(error);
            } finally {
                setLoading(false)
            }
        };
        
        useEffect(() => {
            fetchProducts();
        }, []);


    return (
        <ProductContext.Provider value={{ products, loading, error, filters, fetchProducts }}>
            {children}
        </ProductContext.Provider>
    );
    

}
// eslint-disable-next-line react-refresh/only-export-components
export const useProducts = () => useContext(ProductContext);