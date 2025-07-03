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

    if (!authChecked) return null;

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
                                    background: 'linear-gradient(90deg, #43a047 0%, #66bb6a 100%)',
                                    color: '#fff',
                                    border: 'none',
                                    borderRadius: 20,
                                    padding: '7px 22px',
                                    cursor: 'pointer',
                                    fontWeight: 700,
                                    fontSize: 15,
                                    boxShadow: '0 2px 8px 0 rgba(67,160,71,0.10)',
                                    transition: 'background 0.2s',
                                    outline: 'none',
                                }}
                                onMouseOver={e => (e.currentTarget.style.background = 'linear-gradient(90deg, #388e3c 0%, #43a047 100%)')}
                                onMouseOut={e => (e.currentTarget.style.background = 'linear-gradient(90deg, #43a047 0%, #66bb6a 100%)')}
                            >
                                Sair
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
