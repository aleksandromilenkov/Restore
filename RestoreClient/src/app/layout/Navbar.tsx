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
  List,
  ListItem,
  Toolbar,
  Typography,
} from "@mui/material";
import { NavLink } from "react-router-dom";
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
type Props = {
  setDarkMode: () => void;
  darkMode: boolean;
};
const Navbar = ({ setDarkMode, darkMode }: Props) => {
  return (
    <AppBar position="fixed">
      <Toolbar sx={{ display: "flex", justifyContent: "space-between", alignItems:'center' }}>
        <Box sx={{ display: "flex", alignItems:'center'}}>
          <Typography component={NavLink} to="/" variant="h6" sx={navStyles}>
            RE-STORE
          </Typography>
          <IconButton onClick={setDarkMode} color="warning">
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
          <IconButton size="large" sx={{ color: "inherit" }}>
            <Badge badgeContent="4" color="secondary">
              <ShoppingCart />
            </Badge>
          </IconButton>
          <List sx={{ display: "flex" }}>
            {rightLinks.map(({ title, path }, idx) => (
              <ListItem component={NavLink} to={path} key={idx} sx={navStyles}>
                {title.toUpperCase()}
              </ListItem>
            ))}
          </List>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
export default Navbar;
