import { Box, Typography, Stack, LinearProgress, Grid } from '@mui/material';
import { PathCard } from '../components/PathCard';
import { TasksCarousel } from '../components/TasksCarousel';
import { paths } from '../mocks/pathsData';
import { tasks } from '../mocks/tasksData';
import { useUserStore } from '../stores/useUserStore';

export const Home = () => {
    const { xp } = useUserStore();
    const level = Math.floor(xp / 100) + 1;
    const progress = (xp % 100);

    return (
        <Box sx={{ mt: 2, mb: 8 }}>
            <Box sx={{ mb: 3, px: 2 }}>
                <Stack direction="row" alignItems="center" spacing={2}>
                    <Box sx={{
                        width: 64,
                        height: 64,
                        borderRadius: '50%',
                        bgcolor: "primary.main",
                        color: "#fff",
                        fontWeight: 700,
                        fontSize: 24,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                        Nível {level}
                    </Box>
                    <Box sx={{ flex: 1 }}>
                        <Typography variant="body2" color="text.secondary">
                            Próximo nível: {100 - progress} XP
                        </Typography>
                        <LinearProgress
                            value={progress}
                            variant="determinate"
                            color="success"
                            sx={{ height: 10, borderRadius: 5, mt: 1 }}
                        />
                    </Box>
                    <Typography sx={{ minWidth: 60, fontWeight: 500 }}>XP: {xp}</Typography>
                </Stack>
            </Box>

            <Box sx={{ mb: 3, px: 2 }}>
                <Typography variant="h6" gutterBottom>
                    Explore caminhos:
                </Typography>
                <Grid sx={{ overflowX: 'auto', py: 1 }} container spacing={2} justifyContent="flex-start">
                    
         <Stack direction="row" spacing={2}>
                    {paths.map((path) => (
                        <Grid key={path.id} size={{xs: 6, sm: 4, md: 3}}>
                            <PathCard path={path} />
                        </Grid>
                    ))}</Stack>
                </Grid>
            </Box>

            <Box sx={{ px: 2 }}>
                <Typography variant="h6" gutterBottom>
                    Minhas tarefas:
                </Typography>
                <TasksCarousel tasks={tasks} />
            </Box>
        </Box>
    );
};
