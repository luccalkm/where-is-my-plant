import { Box, Card, CardContent, Typography, Button, Stack } from '@mui/material';
import { useUserStore } from '../stores/useUserStore';
import { CompleteTaskButton } from './CompleteTaskButton';


interface Task {
    id: number;
    title: string;
    xp: number;
    done: boolean;
}

interface TasksCarouselProps {
    tasks: Task[];
}

export function TasksCarousel({ tasks }: TasksCarouselProps) {
    return (
        <Box sx={{ overflowX: 'auto', py: 1 }}>
            <Stack direction="row" spacing={2}>
                {tasks.map(task => (
                    <Card
                        key={task.id}
                        sx={{
                            minWidth: 220,
                            bgcolor: task.done ? '#a8e063' : '#fff',
                            opacity: task.done ? 0.6 : 1,
                            borderRadius: 4,
                            boxShadow: 1,
                            px: 1,
                        }}
                    >
                        <CardContent>
                            <Typography variant="subtitle1" fontWeight={600} mb={1}>
                                {task.title}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" mb={1}>
                                XP: {task.xp}
                            </Typography>
                            {!task.done && (
                                <CompleteTaskButton taskId={task.id} taskXp={task.xp} />
                            )}
                            {task.done && (
                                <Typography color="success.main" variant="caption">
                                    Concluída!
                                </Typography>
                            )}
                        </CardContent>
                    </Card>
                ))}
            </Stack>
        </Box>
    );
}
