import { createBrowserRouter } from 'react-router-dom';
import AppLayout from './components/AppLayout';
import { Calendar } from './pages/Calendar';
import { Profile } from './pages/Profile';
import { Tasks } from './pages/Tasks';
import { Home } from './pages/Home';
import Chat from './pages/Chat';

export const router = createBrowserRouter([
    {
        element: <AppLayout />,
        children: [
            { path: '/', element: <Home /> },
            { path: '/tasks', element: <Tasks /> },
            { path: '/calendar', element: <Calendar /> },
            { path: '/profile', element: <Profile /> },
            { path: '/chat', element: <Chat /> },
        ],
    },
]);
