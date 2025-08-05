/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-unused-vars */
import { useState } from "react";
import { Container, Grid, Box, Typography } from '@mui/material';
import Pagination from '@mui/material/Pagination';
import { useProducts } from '../context/ProductContext';
import {useCategories} from '../context/CategoryContext';
import CardProduct from '../components/CardProduct';
import styles from '../styles/Home.module.css';
import CardCategory from "../components/CardCategory";
import FilterProducts from "../components/FilterProducts";

const Home = () => {
    const { products} = useProducts();
    const {categories} = useCategories();
    const [currentPage, setCurrentPage] = useState(1);

    const productsPerPage = 8;
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);
    const totalPages = Math.ceil(products.length / productsPerPage);

    return(
        <Container className={styles.container}>

        <Box className={styles.filtersBox}>
            <Typography variant="h4" >SHOP</Typography>
            <FilterProducts/>
        </Box>

        <Box className={styles.boxCategories}>
            <Typography variant="h5" >Categories</Typography>
            <Box className={styles.categories} >
                {categories.map(cat =>(
                    <Box item key={cat.id} className={styles.boxCard}>
                        <CardCategory cat={cat} />
                    </Box>
                ))}
            </Box>
        </Box>

        <Container className={styles.containerProducts}>
            <Typography variant="h5" className={styles.titleSec1}>Products</Typography>
            <Box className={styles.products}>
                {currentProducts.length === 0 ? (
                    <Typography className={styles.noResults}>
                        No products found 😥
                    </Typography>
                ) : (
                    currentProducts.map((producto) => (
                    <Box item key={producto.id} className={styles.boxCard}>
                        <CardProduct producto={producto} />
                    </Box>
                    ))
                )}
            </Box>
            <Box className={styles.pagination} >
                <Pagination
                    count={totalPages}
                    page={currentPage}
                    onChange={(e, value) => setCurrentPage(value)}
                    color="primary"
                />
            </Box>
        </Container>
            
        
        </Container>
    );
};

export default Home;