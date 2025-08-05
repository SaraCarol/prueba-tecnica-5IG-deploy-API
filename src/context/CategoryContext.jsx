import { createContext, useState, useEffect, useContext } from "react";
import axios from 'axios';

const CategoryContext = createContext();
const API_URL = "https://api.escuelajs.co/api/v1/categories";

export const CategoryProvider = ({children}) => {

    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get(API_URL);
                setCategories(response.data);
            } catch (error) {
                console.error("Error al obtener los productos:", error)
                setError(error);
            } finally {
                setLoading(false)
            }
        };
        

        fetchCategories();
    }, []);

    return (
        <CategoryContext.Provider value={{ categories, loading, error }}>
            {children}
        </CategoryContext.Provider>
    );
    

}
// eslint-disable-next-line react-refresh/only-export-components
export const useCategories = () => useContext(CategoryContext);