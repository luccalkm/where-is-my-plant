import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UserState {
    xp: number;
    addXp: (amount: number) => void;
    reset: () => void;
}

export const useUserStore = create<UserState>()(
    persist(
        (set, get) => ({
            xp: 0,
            addXp: (amount: number) => set((state) => ({ xp: state.xp + amount })),
            reset: () => set({ xp: 0 }),
        }),
        {
            name: 'user-store',
        }
    )
);
