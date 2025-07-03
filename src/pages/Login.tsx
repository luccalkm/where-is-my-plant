import { Box, Button, TextField, Typography, Tabs, Tab, Avatar } from '@mui/material';
import { useState } from 'react';
import { useAuthStore } from '../stores/useAuthStore';
import SpaIcon from '@mui/icons-material/Spa';

export default function Login() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [tab, setTab] = useState(0);

  const { login, register, loading, error, setError } = useAuthStore();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const userCred = await login(email, password);
    if (userCred) window.location.href = '/';
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const userCred = await register(name, email, password);
    if (userCred) window.location.href = '/';
  };

  return (
    <Box minHeight="100vh" display="flex" alignItems="center" justifyContent="center">
      <Box
        sx={{
          width: '100%',
          maxWidth: 350,
          mx: 'auto',
          px: 2,
          py: 4,
          borderRadius: 4,
          boxShadow: 3,
          bgcolor: '#fff',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ bgcolor: '#43a047', width: 56, height: 56, mb: 1 }}>
          <SpaIcon sx={{ fontSize: 32 }} />
        </Avatar>
        <Typography variant="h6" fontWeight={700} color="#388e3c" mb={2} textAlign="center">
          Cadê minha planta?!
        </Typography>
        <Tabs
          value={tab}
          onChange={(_, v) => {
            setTab(v);
            setError('');
          }}
          centered
          sx={{ mb: 2, width: '100%' }}
          TabIndicatorProps={{ style: { background: '#43a047' } }}
        >
          <Tab label="Entrar" sx={{ fontWeight: 700, color: '#388e3c' }} />
          <Tab label="Registrar" sx={{ fontWeight: 700, color: '#388e3c' }} />
        </Tabs>
        {tab === 0 ? (
          <form onSubmit={handleLogin} style={{ width: '100%' }}>
            <TextField
              label="E-mail"
              value={email}
              onChange={e => setEmail(e.target.value)}
              fullWidth
              sx={{ mb: 1.5, bgcolor: '#f1f8e9', borderRadius: 2 }}
              type="email"
              autoFocus
              size="small"
            />
            <TextField
              label="Senha"
              value={password}
              onChange={e => setPassword(e.target.value)}
              fullWidth
              sx={{ mb: 1.5, bgcolor: '#f1f8e9', borderRadius: 2 }}
              type="password"
              size="small"
            />
            {error && <Typography color="error" fontSize={13} mb={1}>{error}</Typography>}
            <Button
              type="submit"
              variant="contained"
              fullWidth
              size="medium"
              sx={{ fontWeight: 700, borderRadius: 2, bgcolor: '#43a047', ':hover': { bgcolor: '#388e3c' }, mt: 1, mb: 1 }}
              disabled={loading}
            >
              Entrar
            </Button>
          </form>
        ) : (
          <form onSubmit={handleRegister} style={{ width: '100%' }}>
            <TextField
              label="Nome"
              value={name}
              onChange={e => setName(e.target.value)}
              fullWidth
              sx={{ mb: 1.5, bgcolor: '#f1f8e9', borderRadius: 2 }}
              autoFocus
              size="small"
            />
            <TextField
              label="E-mail"
              value={email}
              onChange={e => setEmail(e.target.value)}
              fullWidth
              sx={{ mb: 1.5, bgcolor: '#f1f8e9', borderRadius: 2 }}
              type="email"
              size="small"
            />
            <TextField
              label="Senha"
              value={password}
              onChange={e => setPassword(e.target.value)}
              fullWidth
              sx={{ mb: 1.5, bgcolor: '#f1f8e9', borderRadius: 2 }}
              type="password"
              size="small"
            />
            {error && <Typography color="error" fontSize={13} mb={1}>{error}</Typography>}
            <Button
              type="submit"
              variant="contained"
              fullWidth
              size="medium"
              sx={{ fontWeight: 700, borderRadius: 2, bgcolor: '#43a047', ':hover': { bgcolor: '#388e3c' }, mt: 1, mb: 1 }}
              disabled={loading}
            >
              Registrar
            </Button>
          </form>
        )}
      </Box>
    </Box>
  );
}
