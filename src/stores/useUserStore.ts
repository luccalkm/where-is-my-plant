import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { UserProfile } from "../types/UserProfile";
import { syncUserToFirebase } from "../hooks/useFirebaseSync";
import { tasksCatalog } from "../data/tasksCatalog/tasksCatalog";

interface UserState {
    user: UserProfile | null;
    loading: boolean;

    setAll: (profile: UserProfile) => void;
    setLoading: (val: boolean) => void;
    update: (partial: Partial<UserProfile>) => void;
    addXp: (amount: number) => void;
    markTaskDone: (taskId: string) => void;
    markTaskDaily: (taskId: string, date?: string) => void;
    reset: () => void;
}

export const useUserStore = create<UserState>()(
    persist(
        (set, get) => ({
            user: null,
            loading: true,

            setAll: (profile) => {
                const prev = get().user;
                set({ user: prev ? { ...prev, ...profile } : profile });
            },
            setLoading: (val) => set({ loading: val }),

            update: (partial) => {
                const prev = get().user;
                if (!prev) return;
                const updated = { ...prev, ...partial };
                set({ user: updated });
                syncUserToFirebase(updated);
            },

            addXp: (amount) => {
                const prev = get().user;
                if (!prev) return;
                const updated = { ...prev, xp: prev.xp + amount };
                set({ user: updated });
                syncUserToFirebase(updated);
            },

            markTaskDone: (taskId) => {
                const prev = get().user;
                if (!prev) return;
                if (prev.tasksDone.includes(taskId)) return;
                let xpToAdd = 0;
                
                Object.values(tasksCatalog).forEach((themes: any) => {
                    themes.forEach((theme: any) => {
                        const found = theme.tasks.find((t: any) => t.id === taskId);
                        if (found) {
                            xpToAdd = found.xp;
                        }
                    });
                });
                const updated = {
                    ...prev,
                    tasksDone: [...prev.tasksDone, taskId],
                    xp: prev.xp + xpToAdd,
                };
                set({ user: updated });
                syncUserToFirebase(updated);
            },

            markTaskDaily: (taskId, date) => {
                const prev = get().user;
                if (!prev) return;
                const today = date || new Date().toISOString().slice(0, 10);
                const tasksForDay = prev.tasksDaily?.[today] || [];
                if (tasksForDay.includes(taskId)) return;
                const updatedDaily = { ...prev.tasksDaily, [today]: [...tasksForDay, taskId] };
                const updated = { 
                    ...prev, 
                    tasksDaily: updatedDaily,
                    xp: prev.xp + 10
                };
                set({ user: updated });
                syncUserToFirebase(updated);
            },

            reset: () => set({ user: null, loading: false }),
        }),
        {
            name: "user-store",
            partialize: (state) => ({
                user: state.user,
                loading: state.loading,
            }),
        }
    )
);
