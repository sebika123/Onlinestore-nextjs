"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Typography, Box, Card, CardContent, CardMedia, CircularProgress, Button, Grid, IconButton, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PaymentIcon from '@mui/icons-material/Payment';

const ProductDetails = () => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      const id = window.location.pathname.split('/').pop();
      
      if (id) {
        try {
          const response = await axios.get(`https://fakestoreapi.com/products/${id}`);
          setProduct(response.data);
          setLoading(false); // Set loading to false when data is fetched
        } catch (error) {
          console.error('Error fetching product details:', error.message);
        }
      }
    };

    fetchData();
  }, []);

  const handleIncrement = () => {
    setQuantity(prevQuantity => prevQuantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(prevQuantity => prevQuantity - 1);
    }
  };

  if (loading || !product) {
    return (
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh', 
       
        }}
      >
        <CircularProgress size={80} /> {/* Increase the size of the spinner */}
      </Box>
    );
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h4" align="center" gutterBottom>{product.title}</Typography>
      </Grid>
      <Grid item xs={12} md={6} lg={4}>
        <Card>
          <CardMedia
            component="img"
            sx={{ width: '100%', height: '50vh' }}
            image={product.image}
            alt={product.title}
          />
        </Card>
      </Grid>
      <Grid item xs={12} md={6} lg={8}>
        <CardContent>
          <Typography variant="h6" gutterBottom>Price: ${product.price}</Typography>
          <Typography variant="body1" gutterBottom>Description: {product.description}</Typography>
          <Typography variant="body1" gutterBottom>Category: {product.category}</Typography>
          <Typography variant="body2" gutterBottom>Rating: {product.rating.rate} ({product.rating.count} reviews)</Typography>
          <Box mt={2} >
            <FormControl fullWidth>
              <InputLabel id="quantity-label" sx={{ fontSize: '1.5rem'}} >Quantity</InputLabel>
              <Select
                labelId="quantity-label"
                id="quantity"
                sx={{ fontSize: '0.9rem',width:'100px' }}
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              >
                {[...Array(10).keys()].map((value) => (
                  <MenuItem key={value + 1} value={value + 1}>{value + 1}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <Box mt={2}   display="flex" alignItems="center">
            <Button variant="contained" color="primary" sx={{ mr: 1 }}  startIcon={<PaymentIcon />} style={{ backgroundColor: 'blue', color: 'white' }}>Buy Now</Button>
            <Button variant="contained" sx={{ mr: 1 }}  startIcon={<ShoppingCartIcon />} style={{ backgroundColor: 'blue', color: 'white' }}>Add to Cart</Button>
            <IconButton aria-label="remove" onClick={handleDecrement} sx={{ mr: 4 }} style={{ backgroundColor: 'black', color: 'white' }} ><RemoveIcon /></IconButton>
            <Typography variant="body1" sx={{ mr: 4 }}>{quantity}</Typography>
            <IconButton aria-label="add" onClick={handleIncrement}  style={{ backgroundColor: 'black', color: 'white' }}><AddIcon /></IconButton>
          </Box>
        </CardContent>
      </Grid>
    </Grid>
  );
};

export default ProductDetails;
