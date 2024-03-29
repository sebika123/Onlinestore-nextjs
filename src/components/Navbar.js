
"use client"
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useSelector } from 'react-redux';


const Navbar = () => {

  const cartItems = useSelector((state) => state.cart); 
  const totalItemsInCart = cartItems.reduce((total, item) => total + item.quantity, 0);

 
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          <Link href="/">OnlineStore</Link>
        </Typography>
        <div style={{ display: 'flex', gap: '20px' }}>
          <Link href="/cart">Cart ({totalItemsInCart})</Link> 
          <Link href="/blog">Blog</Link>
          <Link href="/login">Login</Link>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
