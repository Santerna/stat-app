import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';


export const Header = () => {
    return (
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static">
            <Toolbar>
              <Typography variant="h6" color="inherit" component="div">
                Average price per square meter statistics in Norway
              </Typography>
            </Toolbar>
          </AppBar>
        </Box>
      );
}
