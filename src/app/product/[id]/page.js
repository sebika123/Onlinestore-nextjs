

"use client"

import { useState, useEffect } from 'react';
import axios from 'axios';
import { Typography, Box, Card, CardContent, CardMedia, CircularProgress, Button, Grid, IconButton, FormControl, InputLabel, Select, MenuItem, Snackbar } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PaymentIcon from '@mui/icons-material/Payment';
import { useDispatch } from 'react-redux';
import { add } from '@/Redux/Cartslice';
import { useSession } from 'next-auth/react';

const ProductDetails = () => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1); // Define and initialize quantity state
  const [alertMessage, setAlertMessage] = useState(null);
  const dispatch = useDispatch();
  const { data: session, status } = useSession();

  useEffect(() => {
    const fetchData = async () => {
      const id = window.location.pathname.split('/').pop();
      
      if (id) {
        try {
          const response = await axios.get(`https://fakestoreapi.com/products/${id}`);
          setProduct(response.data);
          setLoading(false);
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

  const handleAddToCart = () => {
    if (!session) {
      setAlertMessage("Please log in first."); 
      return;
    }
    const productWithQuantity = { ...product, quantity };
    dispatch(add(productWithQuantity));
  };

  if (status === 'loading') {
    return (
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh', 
        }}
      >
        <CircularProgress size={80} />
      </Box>
    );
  }

  return (
    <>
   
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h4" align="center" gutterBottom>{product ? product.title : "Product Title"}</Typography>
      </Grid>
      <Grid item xs={12} md={6} lg={4}>
        <Card>
          <CardMedia
            component="img"
            sx={{ width: '100%', height: '50vh' }}
            image={product ? product.image : ""}
            alt={product ? product.title : ""}
          />
        </Card>
      </Grid>
      <Grid item xs={12} md={6} lg={8}>
        <CardContent>
          <Typography variant="h6" gutterBottom>Price: ${product && product.price ? product.price : "N/A"}</Typography>
          <Typography variant="body1" gutterBottom>Description: {product ? product.description : "N/A"}</Typography>
          <Typography variant="body1" gutterBottom>Category: {product ? product.category : "N/A"}</Typography>
          <Typography variant="body2" gutterBottom>Rating: {product && product.rating ? `${product.rating.rate} (${product.rating.count} reviews)` : "N/A"}</Typography>
          <Box mt={2}>
            <FormControl fullWidth>
              <InputLabel id="quantity-label" sx={{ fontSize: '1.5rem'}} >Quantity</InputLabel>
              <Select
                labelId="quantity-label"
                id="quantity"
                sx={{ fontSize: '0.9rem', width:'100px' }}
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)} // Update quantity using setQuantity
              >
                {[...Array(10).keys()].map((value) => (
                  <MenuItem key={value + 1} value={value + 1}>{value + 1}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <Box mt={2} display="flex" alignItems="center">
            <Button
              variant="contained"
              color="primary"
              sx={{ mr: 1 }}
              startIcon={<PaymentIcon />}
              style={{ backgroundColor: 'blue', color: 'white' }}
            >
              Buy Now
            </Button>
            <Button
              variant="contained"
              // disabled={!session}
              sx={{ mr: 1 }}
              startIcon={<ShoppingCartIcon />}
              style={{ backgroundColor: 'blue', color: 'white' }}
              onClick={handleAddToCart}
            >
              Add to Cart
            </Button>
            <IconButton aria-label="remove" onClick={handleDecrement} sx={{ mr: 4 }} style={{ backgroundColor: 'black', color: 'white' }}><RemoveIcon /></IconButton>
            <Typography variant="body1" sx={{ mr: 4 }}>{quantity}</Typography>
            <IconButton aria-label="add" onClick={handleIncrement} style={{ backgroundColor: 'black', color: 'white' }}><AddIcon /></IconButton>
          </Box>
        </CardContent>
      </Grid>
    </Grid>
     <Snackbar
     open={Boolean(alertMessage)}
     autoHideDuration={6000}
     onClose={() => setAlertMessage(null)}
     message={alertMessage}
   />
    </>
  );
};

export default ProductDetails;
