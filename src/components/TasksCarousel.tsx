import { Box, Card, CardContent, Typography, Stack, Grid } from '@mui/material';
import { CompleteTaskButton } from './CompleteTaskButton';

export interface Task {
    id: number;
    title: string;
    xp: number;
    done: boolean;
}

export interface TasksCarouselProps {
    tasks: Task[];
    showCompleted?: boolean;
}

export function TasksCarousel({ tasks, showCompleted = true }: TasksCarouselProps) {
    if (!tasks?.length) return null;

    return (
        <Box sx={{ overflowX: 'auto', py: 2, px: 1 }}>
            <Stack direction="row" spacing={2}>
                {tasks.map((task) => {
                    if (!task) return null;
                    if (!showCompleted && task.done) return null;

                    return (
                        <Card
                            key={task.id}
                            sx={{
                                minWidth: 250,
                                bgcolor: task.done ? '#d7ffe0' : 'background.paper',
                                opacity: task.done ? 0.55 : 1,
                                border: task.done ? '1.5px solid #a8e063' : '1.5px solid transparent',
                                borderRadius: 4,
                                boxShadow: task.done ? 0 : 2,
                                transition: 'all 0.2s',
                                filter: task.done ? 'grayscale(0.2)' : 'none',
                                textOverflow: "ellipsis"
                            }}
                        >
                            <CardContent sx={{ minWidth: 220, py: 2 }}>
                                <Grid container spacing={1} direction="column">
                                    <Grid size={12}>
                                        <Typography variant="subtitle1" fontWeight={600} gutterBottom noWrap>
                                            {task.title}
                                        </Typography>
                                    </Grid>
                                    <Grid size={12}>
                                        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                                            XP: {task.xp}
                                        </Typography>
                                    </Grid>
                                    <Grid size={12}>
                                        {!task.done && (
                                            <CompleteTaskButton taskId={task.id} taskXp={task.xp} />
                                        )}
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                    );
                })}
            </Stack>
        </Box>
    );
}
