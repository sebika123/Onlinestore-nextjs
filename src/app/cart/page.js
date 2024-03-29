"use client"
import React from 'react';
import { remove, increaseQuantity, decreaseQuantity } from '@/Redux/Cartslice';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, Typography, IconButton, styled ,Box} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteIcon from '@mui/icons-material/Delete';

const CartItemContainer = styled('div')({
  display: 'flex',
  marginBottom: '20px',
  borderBottom: '0px solid #e0e0e0',
  padding: '50px',
});

const CartImage = styled('img')({
  width: '320px',
  height: '320px',
  marginRight: '20px',
});

const CartDescription = styled('div')({
  flexGrow: 1,
  padding:'40px',
});

const IconContainer = styled('div')({
  display: 'flex',
  alignItems: 'center',
  marginRight: '500px',
});


const CartPage = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart);

  const handleRemove = (id) => {
    dispatch(remove(id));
  };

  const handleIncreaseQuantity = (item) => {
    dispatch(increaseQuantity(item));
  };
  
  const handleDecreaseQuantity = (item) => {
    dispatch(decreaseQuantity(item));
  };

  const totalPrice = cartItems.reduce((total, item) => {
    const itemPrice = item.price || 0;
    const itemQuantity = item.quantity || 0;
    return total + (itemPrice * itemQuantity);
  }, 0);

  return (
    <>
     
      <Grid container spacing={3}>
        {cartItems.map((item) => (
          <Grid item xs={12} key={item.id}>
            <CartItemContainer>
              <CartImage src={item.image} alt="img" />
              <CartDescription>
                <Typography variant="h5">{item.title}</Typography>
                <Typography variant="h5">{item.price || 0}</Typography>
                <Typography variant="body1">Quantity: {item.quantity || 0}</Typography>
              </CartDescription>
              <IconContainer>
                <IconButton aria-label="remove" onClick={() => handleDecreaseQuantity(item)}>
                  <RemoveIcon />
                </IconButton>
                <Typography variant="body1">{item.quantity || 0}</Typography>
                <IconButton aria-label="add" onClick={() => handleIncreaseQuantity(item)}>
                  <AddIcon />
                </IconButton>
                <IconButton aria-label="delete" onClick={() => handleRemove(item.id)}>
                  <DeleteIcon />
                </IconButton>
              </IconContainer>
            </CartItemContainer>
          </Grid>
        ))}
      </Grid>
      <Box display="flex" justifyContent="flex-end" mr={25} mt={2} mb={10}>
        <Typography variant="h5">Total Price: {totalPrice}</Typography>
      </Box>
    </>
  );
};

export default CartPage;
