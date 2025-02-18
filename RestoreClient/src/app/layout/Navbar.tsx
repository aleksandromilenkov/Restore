import { DarkMode, LightMode } from "@mui/icons-material";
import { AppBar, IconButton, Toolbar, Typography } from "@mui/material"
type Props = {
    setDarkMode: ()=>void;
    darkMode: boolean,
}
const Navbar = ({setDarkMode, darkMode}:Props) => {
  return (
    <AppBar position="fixed" sx={{opacity:0.6}}>
        <Toolbar>
            <Typography variant="h6">RE-STORE</Typography>
            <IconButton onClick={setDarkMode} color='warning'>
                {darkMode ? <DarkMode/> : <LightMode sx={{color:'yellow'}}/>}
            </IconButton>
        </Toolbar>
    </AppBar>
  )
}
export default Navbar