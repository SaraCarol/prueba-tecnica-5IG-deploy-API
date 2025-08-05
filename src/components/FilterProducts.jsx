/* eslint-disable no-unused-vars */
import { useState } from "react";
import {Button, Drawer, Box, Typography, Select, FormControlLabel, Radio, Divider, Container, 
    FormControl, FormLabel, RadioGroup, MenuItem
} from "@mui/material"
import { useCategories } from "../context/CategoryContext";
import { useProducts } from "../context/ProductContext";
import styles from '../styles/FilterProduct.module.css';

const FilterProducts = () =>{
    const {categories} = useCategories();
    const {fetchProducts} = useProducts();;

    const priceRanges = [
        { label: "1 - 10", min: 1, max: 10 },
        { label: "11 - 20", min: 11, max: 20 },
        { label: "21 - 30", min: 21, max: 30 },
        { label: "31 - 50", min: 31, max: 50 },
        { label: "51+", min: 51, max: 9999 },
    ];

    const [open, setOpen] = useState(false);
    const [categorySelected, setCategorySelected] = useState("");
    const [priceRangeSelected, setPriceRangeSelected] = useState("");
    const toggleDrawer = () => setOpen(!open)

    const applyFilters = () =>{
        const filters={}

        if(categorySelected && categorySelected !== ""){
            filters.categoryId = categorySelected
        }

        if(priceRangeSelected && priceRangeSelected !== ""){
            const range = priceRanges.find((r) => r.label === priceRangeSelected)
            if(range){
                filters.price_min = range.min
                filters.price_max = range.max
            }
        }

        fetchProducts(filters)
        toggleDrawer();

    }

    const clearFilters = () => {
        setCategorySelected('');
        setPriceRangeSelected('');
        fetchProducts({});
        toggleDrawer();
    }

    return(
        <Container>

            <Button onClick={toggleDrawer} variant="outlined" sx={{ mb: 2 }}
            className={styles.filterButton}>
                Filter
            </Button>
            <Drawer open={open} onClose={toggleDrawer}> 
                <Box className={styles.boxFilter} role="presentation" >
                    <Typography variant="h6" gutterBottom className={styles.title}>
                        Filter by
                    </Typography>

                    <Divider sx={{ mb: 2 }} />

                    <FormControl component="fieldset" sx={{ mb: 3 }}>
                        <FormLabel component="legend" className={styles.label}>Categories</FormLabel>
                            <Select
                                value={categorySelected}
                                onChange={(e) => setCategorySelected(e.target.value)}
                                className={styles.select}
                                >
                                {categories.map((cat) => (
                                    <MenuItem key={cat.id} value={String(cat.id)} 
                                    className={styles.menuItem}>
                                        {cat.name}
                                    </MenuItem>
                                ))}
                            </Select>
                    </FormControl>

                    <Divider sx={{ mb: 2 }} />

                    <FormControl component="fieldset" sx={{ mb: 3 }}>
                        <FormLabel component="legend" className={styles.label}>Price Range</FormLabel>
                        <Select
                        value={priceRangeSelected}
                        onChange={(e) => setPriceRangeSelected(e.target.value)}
                        className={styles.select}
                        >
                        {priceRanges.map((range) => (
                            <MenuItem key={range.label} value={range.label}
                            className={styles.menuItem}>
                                {range.label}
                            </MenuItem>
                        ))}
                        </Select>
                    </FormControl>

                    <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        onClick={applyFilters}
                        className={styles.applyButton}
                    >
                        Apply Filters
                    </Button>

                    <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        onClick={clearFilters}
                        className={styles.clearButton}
                    >
                        Clear Filters
                    </Button>
                </Box>
            </Drawer>
        </Container>
    );
};

export default FilterProducts;