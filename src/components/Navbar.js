import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  InputBase,
  Menu,
  MenuItem,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { Link } from 'react-router-dom';

const Navbar = ({ isLoggedIn }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMobileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
    setMobileMenuOpen(true);
  };

  const handleMobileMenuClose = () => {
    setAnchorEl(null);
    setMobileMenuOpen(false);
  };

  const menuItems = isLoggedIn
    ? [
        { label: 'Home', to: '/' },
        { label: 'Account', to: '/account' },
        { label: 'Cart', to: '/cart' },
        { label: 'User Profile', to: '/profile' },
      ]
    : [{ label: 'Home', to: '/' }, { label: 'Login', to: '/login' }];

  return (
    <AppBar position="sticky">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          ApexMarket
        </Typography>

        <div className="hidden md:flex md:items-center md:ml-6">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search"
              classes={{
                root: 'pl-10',
                input: 'py-2',
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
          </div>
        </div>

        <div className="md:hidden flex items-center">
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            onClick={handleMobileMenuOpen}
          >
            {mobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
          </IconButton>
        </div>

        <Menu
          anchorEl={anchorEl}
          open={mobileMenuOpen}
          onClose={handleMobileMenuClose}
        >
          {menuItems.map((item) => (
            <MenuItem key={item.label} onClick={handleMobileMenuClose}>
              <Link to={item.to}>{item.label}</Link>
            </MenuItem>
          ))}
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
