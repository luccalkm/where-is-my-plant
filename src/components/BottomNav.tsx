import { BottomNavigation, Paper, useTheme, Box, BottomNavigationAction } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import ListAltIcon from '@mui/icons-material/ListAlt';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PersonIcon from '@mui/icons-material/Person';
import { motion } from 'framer-motion';

const NAV_ITEMS = [
    { label: 'Home', icon: <HomeIcon /> },
    { label: 'Tasks', icon: <ListAltIcon /> },
    { label: 'Calendar', icon: <CalendarMonthIcon /> },
    { label: 'Profile', icon: <PersonIcon /> },
];

export default function BottomNav({
    value,
    onChange,
}: {
    value: number;
    onChange: (event: React.SyntheticEvent, newValue: number) => void;
}) {
    const theme = useTheme();

    return (
        <Paper
            sx={{
                position: 'fixed',
                bottom: 16,
                left: '50%',
                transform: 'translateX(-50%)',
                width: '90vw',
                maxWidth: 450,
                borderRadius: 5,
                bgcolor: theme.palette.background.paper,
                boxShadow: '0px 4px 24px rgba(80, 176, 96, 0.15)',
                zIndex: 10,
                px: 1,
            }}
            elevation={0}
        >
            <Box sx={{ position: 'relative', width: '100%', height: 64 }}>
                <Box
                    sx={{
                        position: 'absolute',
                        top: 8,
                        left: 0,
                        width: '100%',
                        height: 48,
                        pointerEvents: 'none',
                        zIndex: 1,
                    }}
                >
                    <motion.div
                        layout
                        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                        style={{
                            position: 'absolute',
                            left: `calc(25% * ${value})`,
                            width: '25%',
                            height: '100%',
                            borderRadius: 12,
                            background: theme.palette.primary.dark,
                            boxShadow: '0px 2px 10px rgba(100, 200, 100, 0.09)',
                            zIndex: 2,
                        }}
                    />
                </Box>
                <BottomNavigation
                    value={value}
                    onChange={onChange}
                    showLabels
                    sx={{
                        bgcolor: 'transparent',
                        borderRadius: 20,
                        height: 64,
                        '.MuiBottomNavigationAction-root': {
                            minWidth: 0,
                            maxWidth: 'none',
                            flex: 1,
                            zIndex: 3,
                            transition: 'color 0.2s',
                        },
                    }}
                >
                    {NAV_ITEMS.map((item, i) => (
                        <BottomNavigationAction
                            key={item.label}
                            label={item.label}
                            icon={item.icon}
                            sx={{
                                color: `${value === i ? theme.palette.primary.contrastText : theme.palette.text.secondary}!important`,
                                zIndex: 3,
                                '& .MuiBottomNavigationAction-label': {
                                    color: value === i ? theme.palette.primary.contrastText : theme.palette.text.secondary,
                                    transition: 'color 0.2s',
                                },
                            }}
                        />
                    ))}
                </BottomNavigation>
            </Box>
        </Paper>
    );
}
