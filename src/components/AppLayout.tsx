import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Box } from '@mui/material';
import { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import BottomNav from './BottomNav';

const NAV = [
    { label: 'Home', path: '/', index: 0 },
    { label: 'Tasks', path: '/tasks', index: 1 },
    { label: 'Chat', path: '/chat', index: 2 },
    { label: 'Profile', path: '/profile', index: 3 },
];

export default function AppLayout() {
    const location = useLocation();
    const navigate = useNavigate();
    const [authChecked, setAuthChecked] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const currentTab = NAV.findIndex(nav => location.pathname === nav.path);

    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setAuthChecked(true);
            setIsAuthenticated(!!user);
            if (!user) {
                navigate('/login');
            }
        });
        return () => unsubscribe();
    }, [navigate]);

    const handleLogout = () => {
        const auth = getAuth();
        signOut(auth).then(() => {
            localStorage.removeItem('user-store');
            localStorage.removeItem('task-store');
            localStorage.removeItem('userId');
            navigate('/login');
        });
    };

    // Enquanto verifica autenticação, não renderiza nada
    if (!authChecked) return null;

    // Esconde BottomNav e conteúdo se não autenticado ou na página de login
    const isLoginPage = location.pathname === '/login';
    const showBottomNav = isAuthenticated && !isLoginPage;

    return (
        <Box>
            <Box
                sx={{
                    width: '100vw',
                    display: 'flex',
                    flexDirection: 'column',
                    minHeight: '100vh',
                }}
            >
                <Box p={2}>
                    {isAuthenticated && !isLoginPage && (
                        <Box display="flex" justifyContent="flex-end" mb={1}>
                            <button
                                onClick={handleLogout}
                                style={{
                                    background: '#eee',
                                    border: 'none',
                                    borderRadius: 6,
                                    padding: '6px 16px',
                                    cursor: 'pointer',
                                    fontWeight: 600
                                }}
                            >
                                Logout
                            </button>
                        </Box>
                    )}
                    {(isAuthenticated || isLoginPage) && <Outlet />}
                </Box>
            </Box>
            {showBottomNav && (
                <BottomNav
                    value={currentTab === -1 ? 0 : currentTab}
                    onChange={(_, newValue) => navigate(NAV[newValue].path)}
                />
            )}
        </Box>
    );
}
