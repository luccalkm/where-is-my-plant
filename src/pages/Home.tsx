import { Box, Typography, Stack, LinearProgress, Paper, Avatar } from '@mui/material';
import { useUserStore } from '../stores/useUserStore';
import { tasksCatalog } from '../data/tasksCatalog/tasksCatalog';
import { getLevelByXp } from '../utils/primeLevel';

export const Home = () => {
    const user = useUserStore(s => s.user);
    const loading = useUserStore(s => s.loading);

    if (loading || !user) {
        return (
            <Box mt={6} textAlign="center">
                <LinearProgress />
            </Box>
        );
    }

    const { level, progress, required } = getLevelByXp(user.xp ?? 0);
    const firstName = user.name?.split(' ')[0] || user.name || 'Planteiro';

    const nextTasks: { title: string; theme: string; category: string; id: string; xp: number }[] = [];
    Object.entries(tasksCatalog).forEach(([category, themes]) => {
        themes.forEach(theme => {
            if (nextTasks.length >= 3) return;
            const nextTask = theme.tasks.find(task => !user.tasksDone?.includes(task.id));
            if (nextTask) {
                nextTasks.push({
                    title: nextTask.title,
                    theme: theme.name,
                    category,
                    id: nextTask.id,
                    xp: nextTask.xp,
                });
            }
        });
    });

    const dailyTasks = [
        { id: 'water', title: 'Regar plantinhas' },
        { id: 'learn', title: 'Aprender nova plantinha' },
        { id: 'check_soil', title: 'Verificar umidade do solo' },
        { id: 'share_photo', title: 'Compartilhar foto da planta' },
    ];

    const today = new Date().toISOString().slice(0, 10);
    const dailyDone = user.tasksDaily?.[today] || [];
    const markDailyTaskDone = useUserStore(s => s.markTaskDaily);

    return (
        <Box
            sx={{
                mt: 2,
                mb: 10,
                px: { xs: 1, sm: 0 },
                maxWidth: { xs: '100%', md: 500 },
                mx: { xs: 0, md: 'auto' },
            }}
        >
            <Typography variant="h5" fontWeight={700} mb={1} textAlign={{ xs: 'left', md: 'center' }}>
                Olá, {firstName}! 👋
            </Typography>
            <Typography color="text.secondary" mb={3} textAlign={{ xs: 'left', md: 'center' }}>
                Pronto para cultivar novos hábitos hoje?
            </Typography>

            <Paper elevation={2} sx={{ p: { xs: 2, md: 3 }, mb: 3, borderRadius: 3, maxWidth: 600, mx: 'auto' }}>
                <Stack direction="row" alignItems="center" spacing={2}>
                    <Avatar sx={{ width: 56, height: 56, bgcolor: 'primary.main', color: '#fff', fontWeight: 700, fontSize: 28 }}>
                        {level}
                    </Avatar>
                    <Box sx={{ flex: 1 }}>
                        <Typography fontWeight={600} color="primary" mb={0.5}>
                            Nível {level}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Próximo nível ({level + 1}): {required - progress}xp
                        </Typography>
                        <LinearProgress value={required > 0 ? (progress / required) * 100 : 0} variant="determinate" color="primary" sx={{ height: 10, borderRadius: 5, mt: 1 }} />
                    </Box>
                </Stack>
            </Paper>

            <Paper elevation={1} sx={{ p: { xs: 2, md: 3 }, mb: 3, borderRadius: 3, maxWidth: 600, mx: 'auto' }}>
                <Typography fontWeight={600} mb={1} textAlign={{ xs: 'left', md: 'center' }}>
                    Suas próximas tarefas
                </Typography>
                {nextTasks.length === 0 ? (
                    <Typography color="text.secondary" textAlign={{ xs: 'left', md: 'center' }}>Você concluiu todas as tarefas! 🎉</Typography>
                ) : (
                    <Stack spacing={1}>
                        {nextTasks.map((task) => (
                            <Box key={task.id} sx={{ p: 1, borderRadius: 2, bgcolor: 'background.default', boxShadow: 0, border: '1px solid #f0f0f0' }}>
                                <Typography fontWeight={500} fontSize={15}>{task.title}</Typography>
                                <Typography variant="caption" color="text.secondary">
                                    {task.theme} • {task.xp} XP
                                </Typography>
                            </Box>
                        ))}
                    </Stack>
                )}
            </Paper>

            <Paper elevation={1} sx={{ p: { xs: 2, md: 3 }, mb: 3, borderRadius: 3, maxWidth: 600, mx: 'auto' }}>
                <Typography fontWeight={600} mb={1} textAlign={{ xs: 'left', md: 'center' }}>
                    Tarefas diárias <Typography component="span" color="text.secondary" fontWeight={400} fontSize={14}>({today.split('-').reverse().join('/')})</Typography>
                </Typography>
                <Stack spacing={1}>
                    {dailyTasks.map(task => {
                        const done = dailyDone.includes(task.id);
                        return (
                            <Box
                                key={task.id}
                                sx={{
                                    p: 1,
                                    borderRadius: 2,
                                    bgcolor: done ? 'success.lighter' : 'background.default',
                                    boxShadow: 0,
                                    border: '1px solid #f0f0f0',
                                    opacity: done ? 0.6 : 1,
                                    cursor: done ? 'default' : 'pointer',
                                    maxWidth: { xs: '100%', md: 400 },
                                    mx: { xs: 0, md: 'auto' },
                                }}
                                onClick={() => { if (!done) markDailyTaskDone(task.id, today); }}
                            >
                                <Typography fontWeight={500} fontSize={15} sx={{ textDecoration: done ? 'line-through' : undefined }}>
                                    {task.title}
                                </Typography>
                                <Typography variant="caption" color="primary.main" fontWeight={600}>
                                    +10 XP
                                </Typography>
                            </Box>
                        );
                    })}
                </Stack>
            </Paper>
        </Box>
    );
};
