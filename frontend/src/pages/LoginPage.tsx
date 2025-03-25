import { Button, TextField, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';
import { useState } from 'react';

const LoginPage = () => {
  const { login } = useUser();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');

  const handleLogin = () => {
    login({ name: username, email });
    navigate('/home');
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" gap={2} mt={4}>
      <TextField
        label="Email"
        variant="outlined"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        label="Username"
        variant="outlined"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <TextField
        label="Password"
        type="password"
        variant="outlined"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button variant="contained" onClick={handleLogin}>
        Login
      </Button>
    </Box>
  );
};

export default LoginPage;
