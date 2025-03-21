import { Button, Menu, MenuItem, Fade, ListItemIcon, ListItemText } from "@mui/material";
import React, { useState } from "react";
import { User } from "../models/user";
import { History, Inventory, Logout, Person } from "@mui/icons-material";
import { useLogoutMutation } from "../../features/account/accountApi";
import { Link } from "react-router-dom";
type Props = {
    user:User
}
const UserMenu = ({user}:Props) => {
    const [logout] = useLogoutMutation();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };
  
    const handleLogout = ()=>{
        logout();
    }
    return (
      <div>
        <Button
          onClick={handleClick}
          size="large"
          sx={{fontSize: "1.1rem"}}
        >
          {user.email}
        </Button>
        <Menu
          id="fade-menu"
          MenuListProps={{
            'aria-labelledby': 'fade-button',
          }}
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          TransitionComponent={Fade}
        >
          <MenuItem>
            <ListItemIcon>
                <Person/>
            </ListItemIcon>
            <ListItemText>My Profile</ListItemText>
          </MenuItem>
          <MenuItem component={Link} to="/orders">
            <ListItemIcon>
                <History/>
            </ListItemIcon>
            <ListItemText>My Orders</ListItemText>
          </MenuItem>
          <MenuItem component={Link} to="/inventory">
            <ListItemIcon>
                <Inventory/>
            </ListItemIcon>
            <ListItemText>Inventory</ListItemText>
          </MenuItem>
          <MenuItem onClick={handleLogout}>
            <ListItemIcon>
                <Logout/>
            </ListItemIcon>
            <ListItemText>Logout</ListItemText>
          </MenuItem>
        </Menu>
      </div>
    );
}
export default UserMenu