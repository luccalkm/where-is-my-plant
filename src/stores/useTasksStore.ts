import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Task {
    id: number;
    title: string;
    xp: number;
    done: boolean;
}

interface TasksState {
    tasks: Task[];
    markTaskDone: (id: number) => void;
    resetTasks: () => void;
    setTasks: (tasks: Task[]) => void;
}

const initialTasks: Task[] = [
    { id: 1, title: 'Regue suas mudas', xp: 10, done: false },
    { id: 2, title: 'Plante novas sementes de manjericão', xp: 15, done: false },
    { id: 3, title: 'Adube sua horta', xp: 12, done: false },
];

export const useTasksStore = create<TasksState>()(
    persist(
        (set, get) => ({
            tasks: initialTasks,
            markTaskDone: (id) => set((state) => ({
                tasks: state.tasks.map(t => t.id === id ? { ...t, done: true } : t)
            })),
            resetTasks: () => set({ tasks: initialTasks }),
            setTasks: (tasks) => set({ tasks }),
        }),
        { name: 'tasks-store' }
    )
);
