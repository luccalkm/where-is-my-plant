import { createTheme } from '@mui/material/styles';

const PALETTE = {
    darkGreen: '#277642',
    green: '#43a047',
    lightGreen: '#a8e063',
    neonGreen: '#b7ff50',
    yellow: '#ffeb3b',
    brown: '#d7ccc8',
    white: '#fff',
    waterBlue: '#50b2c0',
    defaultGray: '#495057',
    black: '#181a1b',
};

const theme = createTheme({
    palette: {
        primary: {
            main: PALETTE.green,
            dark: PALETTE.darkGreen,
            light: PALETTE.lightGreen,
            contrastText: PALETTE.white,
        },
        secondary: {
            main: PALETTE.yellow,
            light: PALETTE.neonGreen,
            dark: PALETTE.brown,
            contrastText: PALETTE.darkGreen,
        },
        success: {
            main: PALETTE.neonGreen,
            contrastText: PALETTE.darkGreen,
        },
        warning: {
            main: '#ffd600',
            contrastText: PALETTE.black,
        },
        info: {
            main: PALETTE.waterBlue,
            contrastText: PALETTE.white,
        },
        background: {
            default: PALETTE.white,
            paper: '#ffffff',
        },
        text: {
            primary: PALETTE.defaultGray,
            secondary: PALETTE.darkGreen,
        },
        divider: PALETTE.brown,
    },
    typography: {
        fontFamily: [
            '"Montserrat"',
            '"Roboto"',
            '"Helvetica"',
            'Arial',
            'sans-serif',
        ].join(','),
        h1: { fontWeight: 700 },
        h2: { fontWeight: 700 },
        h3: { fontWeight: 700 },
        h4: { fontWeight: 600 },
        h5: { fontWeight: 600 },
        h6: { fontWeight: 500 },
        body1: { fontWeight: 400 },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 14,
                    textTransform: 'none',
                    fontWeight: 600,
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    borderRadius: 16,
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: 20,
                },
            },
        },
    },
});

export default theme;
