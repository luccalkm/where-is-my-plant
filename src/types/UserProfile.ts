export type UserProfile = {
    id: string;
    name: string;
    email: string;
    avatarBase64?: string;
    bio?: string;
    xp: number;
    tasksDone: string[];
    tasksDaily: { [date: string]: string[] };
    feedback?: { rating: number; text: string };
};