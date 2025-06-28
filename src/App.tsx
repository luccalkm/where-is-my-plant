import { ThemeProvider } from '@mui/material/styles';
import { RouterProvider } from 'react-router-dom';
import { router } from './routes';
import theme from './theme';

export default function App() {
    return (
        <ThemeProvider theme={theme}>
            <RouterProvider router={router} />
        </ThemeProvider>
    );
}