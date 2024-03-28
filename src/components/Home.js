

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { Typography, Button, Grid, Card, CardContent, CardMedia } from '@mui/material';

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://fakestoreapi.com/products');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error.message);
      }
    };

    fetchProducts();
  }, []);
  console.log(products,"product")

  return (
    <div>
      <Typography variant="h3" gutterBottom align="center" mt={10} mb={5}>Latest Products</Typography>
      <hr />
      <Grid container spacing={3} justifyContent="center">
        {products.map((product) => (
          <Grid item xs={2} sm={6} md={4} key={product.id}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', margin: '0 20px' }}>
              <CardMedia
                component="img"
                sx={{ height: 300, width: '80%', objectFit: 'cover' }}
                image={product.image}
                alt={product.title}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h5" component="div" gutterBottom>{product.id}{product.title}</Typography>
                {/* <Typography variant="body1" gutterBottom>Category: {product.category}</Typography> */}
                <Typography variant="body2" gutterBottom>Description: {product.description}</Typography>
                <Typography variant="body1" gutterBottom>Price: ${product.price}</Typography>
                <Typography variant="body2" gutterBottom>Rating: {product.rating.rate} ({product.rating.count} reviews)</Typography>
                <Link href={`/product/${product.id}`} passHref>
                  <Button variant="contained" style={{ backgroundColor: 'blue', color: 'white' }}>Show More..</Button>
                </Link>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Home;

