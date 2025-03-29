import {
  DarkMode,
  LightMode,
  ShoppingCart,
} from "@mui/icons-material";
import {
  AppBar,
  Badge,
  Box,
  IconButton,
  LinearProgress,
  List,
  ListItem,
  Toolbar,
  Typography,
} from "@mui/material";
import { NavLink } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/store";
import { toggleDarkMode } from "./uiSlice";
import { useFetchCartQuery } from "../../features/cart/cartApi";
import UserMenu from "./UserMenu";
import { useUserInfoQuery } from "../../features/account/accountApi";
const midLinks = [
  {
    title: "Catalog",
    path: "/catalog",
  },
  {
    title: "About",
    path: "/about",
  },
  {
    title: "Contact",
    path: "/contact",
  },
];
const rightLinks = [
  {
    title: "login",
    path: "/login",
  },
  {
    title: "register",
    path: "/register",
  },
];
const navStyles = {
  color: "inherit",
  typography: "h6",
  textDecoration: "none",
  "&:hover": {
    color: "grey.500",
  },
  "&.active": {
    color: "#baecf9",
  },
};

const Navbar = () => {
  const {data: user} = useUserInfoQuery();
  const {isLoading, darkMode} = useAppSelector(state=> state.ui);
  const dispatch = useAppDispatch();
  const {data} = useFetchCartQuery();
  const numberOfItems = data ? data.items.reduce((acc,val)=> acc+=val.quantity,0) : 0;
  return (
    <AppBar position="fixed">
      <Toolbar sx={{ display: "flex", justifyContent: "space-between", alignItems:'center' }}>
        <Box sx={{ display: "flex", alignItems:'center'}}>
          <Typography component={NavLink} to="/" variant="h6" sx={navStyles}>
            RE-STORE
          </Typography>
          <IconButton onClick={()=> dispatch(toggleDarkMode())} color="warning">
            {darkMode ? <DarkMode /> : <LightMode sx={{ color: "yellow" }} />}
          </IconButton>
              </Box>
          <List sx={{ display: "flex" }}>
            {midLinks.map(({ title, path }, idx) => (
              <ListItem component={NavLink} to={path} key={idx} sx={navStyles}>
                {title.toUpperCase()}
              </ListItem>
            ))}
          </List>
        <Box sx={{ display: "flex", alignItems:'center' }}>
          <IconButton size="large" sx={{ color: "inherit" }} component={NavLink} to='cart'>
            <Badge badgeContent={numberOfItems} color="secondary">
              <ShoppingCart />
            </Badge>
          </IconButton>
          
          { user 
            ? (
              <Box display="flex">
                <Box display="flex" alignContent="center" justifyContent="center">
            <img src={user?.pictureUrl || "https://t4.ftcdn.net/jpg/03/32/59/65/240_F_332596535_lAdLhf6KzbW6PWXBWeIFTovTii1drkbT.jpg"} alt="profile image"style={{height:50, borderRadius:"50px"}}/>
                </Box>
            <UserMenu user={user}/>
              </Box>
          )
            : (<List sx={{ display: "flex" }}>
            {rightLinks.map(({ title, path }, idx) => (
              <ListItem component={NavLink} to={path} key={idx} sx={navStyles}>
                {title.toUpperCase()}
              </ListItem>
            ))}
          </List>)
          }
        </Box>
      </Toolbar>
      {isLoading && (
        <Box sx={{width:'100%'}}>
            <LinearProgress color="secondary"/>
        </Box>
      )}
    </AppBar>
  );
};
export default Navbar;
