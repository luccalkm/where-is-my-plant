export type UserProfile = {
    id: string;
    name: string;
    email: string;
    avatarUrl?: string;
    bio?: string;
    xp: number;
    tasksDone: string[];
    tasksDaily: { [date: string]: string[] };
};