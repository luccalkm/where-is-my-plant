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
                        {level}
                    </Box>
                    <Box sx={{ flex: 1 }}>
                        <Typography fontWeight={'bold'} variant="body2" color="text.secondary">
                            Próximo nível ({level + 1}): {100 - progress}xp
                        </Typography>
                        <LinearProgress
                            value={40}
                            variant="determinate"
                            color="primary"
                            sx={{ height: 10, borderRadius: 5, mt: 1 }}

                        />
                    </Box>
                </Stack>
            </Box>

            <Box sx={{ mb: 3 }}>
                <Typography variant="h6" gutterBottom>
                    Explore caminhos:
                </Typography>
                <Grid sx={{ overflowX: 'auto', py: 1 }} container spacing={2}>
                    <Stack spacing={2}>
                        {paths.map((path) => (
                            <Grid key={path.id} size={12}>
                                <PathCard path={path} />
                            </Grid>
                        ))}</Stack>
                </Grid>
            </Box>

            <Box>
                <Typography variant="h6" gutterBottom>
                    Tarefas diárias
                </Typography>
                <TasksCarousel tasks={tasks} showCompleted={false} />
            </Box>
        </Box>
    );
};
