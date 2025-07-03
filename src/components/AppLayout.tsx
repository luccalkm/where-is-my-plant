import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Box } from '@mui/material';
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

    const currentTab = NAV.findIndex(nav => location.pathname === nav.path);

    return (
        <Box>
            <Box
                sx={{
                    width: '100vw',
                    display: 'flex',
                    flexDirection: 'column',
                    minHeight: '100vh',
                    paddingBottom: "36px",
                }}
            >
                <Box p={2}>
                    <Outlet />
                </Box>
            </Box>

            <BottomNav
                value={currentTab === -1 ? 0 : currentTab}
                onChange={(_, newValue) => navigate(NAV[newValue].path)}
            />
        </Box>
    );
}
