import { createBrowserRouter } from 'react-router-dom';
import AppLayout from './components/AppLayout';
import { Profile } from './pages/Profile';
import { Tasks } from './pages/Tasks';
import { Home } from './pages/Home';
import Chat from './pages/Chat';
import Login from './pages/Login';

export const router = createBrowserRouter([
    {
        element: <AppLayout />,
        children: [
            { path: '/', element: <Home /> },
            { path: '/login', element: <Login /> },
            { path: '/tasks', element: <Tasks /> },
            { path: '/profile', element: <Profile /> },
            { path: '/chat', element: <Chat /> },
        ],
    },
]);
