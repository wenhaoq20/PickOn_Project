import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  MenuItem,
} from "@mui/material";
import { AccountCircle, ArrowBack } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";

/**
 * Component for the navbar.
 *
 * @component
 * @param {Object} props Component props
 * @param {string} props.name Name of the page
 * @param {boolean} props.redirect Whether to show back button
 * @returns {React.ReactElement} The top navbar.
 */
const Navbar = ({ name, redirect }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const { logout, userRole } = useAuth();
  const navigator = useNavigate();

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCourse = () => {
    handleClose();
    navigator("/managecourse");
  };

  const handleLogout = () => {
    handleClose();
    logout();
  };

  const onClickBack = () => {
    navigator(-1);
  };

  return (
    <AppBar position="static">
      <Toolbar>
        {redirect && (
          <IconButton aria-label="back" color="inherit" onClick={onClickBack}>
            <ArrowBack />
          </IconButton>
        )}
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          {name}
        </Typography>
        <div>
          <IconButton
            aria-controls="menu-appbar"
            color="inherit"
            aria-label="user"
            onClick={handleMenu}
          >
            <AccountCircle />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose}>Profile</MenuItem>
            {userRole === "instructor" && (
              <MenuItem onClick={handleCourse}>Manage Courses</MenuItem>
            )}
            <MenuItem onClick={handleClose}>Settings</MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
