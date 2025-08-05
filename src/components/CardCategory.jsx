import { Card, CardMedia, CardContent, Typography } from "@mui/material";
import styles from '../styles/CardProduct.module.css';

const CardCategory = ({cat}) =>{

    return(
        <Card className={styles.cardCategory} >
            <CardMedia className={styles.img}
                component="img"
                image={cat.image || "https://placehold.co/600x400"}
                alt={cat.name}
            />
            <CardContent>
                <Typography className={styles.title}>{cat.name}</Typography>
            </CardContent>
        </Card>
    );
};

export default CardCategory;