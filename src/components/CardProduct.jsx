/* eslint-disable no-unused-vars */
import { useProducts } from '../context/ProductContext';
import { Card, CardMedia, CardContent, Typography, CardActions, Button } from "@mui/material";
import styles from '../styles/CardProduct.module.css';

const CardProduct = ({producto}) =>{

    return (
        <Card className={styles.card}>
            <CardMedia className={styles.img}
                component="img"
                image={producto.images?.[0] || "https://placehold.co/600x400"}
                alt={producto.title}
            />
            <CardContent>
                <Typography className={styles.title}>{producto.title}</Typography>
                <Typography className={styles.description}>
                    {producto.description}
                </Typography>
                <Typography className={styles.price}>
                    ${producto.price}
                </Typography>
            </CardContent>
            <CardActions>
                <Button className={styles.buttonVerMas} size="small">See more</Button>
            </CardActions>
        </Card>
    );
};

export default CardProduct;