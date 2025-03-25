import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { useUser } from '../contexts/UserContext';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const { user, logout } = useUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Welcome, {user?.name || 'Guest'}
        </Typography>
        <Box>
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
