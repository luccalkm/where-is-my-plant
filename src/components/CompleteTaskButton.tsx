import { Button } from '@mui/material';
import { useTasksStore } from '../stores/useTasksStore';
import { useUserStore } from '../stores/useUserStore';

export function CompleteTaskButton({ taskId, taskXp }: { taskId: number, taskXp: number }) {
    const markTaskDone = useTasksStore(s => s.markTaskDone);
    const addXp = useUserStore(s => s.addXp);

    const handleComplete = () => {
        markTaskDone(taskId);
        addXp(taskXp);
    };

    return (
        <Button variant="contained" size="small"  onClick={handleComplete}>
            Concluir
        </Button>
    );
}
