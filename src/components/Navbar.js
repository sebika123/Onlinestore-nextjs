import React from 'react';
import Link from 'next/link';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

const Navbar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          <Link href="/">OnlineStore</Link>
        </Typography>
        <div style={{ display: 'flex', gap: '20px' }}>
          <Link href="/cart">Cart</Link>
          <Link href="/blog">Blog</Link>
          <Link href="/login">Login</Link>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
