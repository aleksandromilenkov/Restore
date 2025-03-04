import { Button, Menu, MenuItem, Fade, ListItemIcon, ListItemText } from "@mui/material";
import React, { useState } from "react";
import { User } from "../models/user";
import { History, Logout, Person } from "@mui/icons-material";
import { useLogoutMutation } from "../../features/account/accountApi";
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
  
    const handleLogout = (e:unknown)=>{
        console.log(e);
        logout();
    }
    return (
      <div>
        <Button
          onClick={handleClick}
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
          <MenuItem>
            <ListItemIcon>
                <History/>
            </ListItemIcon>
            <ListItemText>My Orders</ListItemText>
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