import { useEffect, useState } from "react";
import { db } from "../firebase";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import type { UserProfile } from "firebase/auth";

export function useFirebaseProfile(userId: string) {
    const [user, setUser] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchProfile() {
            setLoading(true);
            const ref = doc(db, "users", userId);
            const snap = await getDoc(ref);
            if (snap.exists()) {
                setUser({ id: userId, ...snap.data() } as UserProfile);
            } else {
                const initial: UserProfile = {
                    id: userId,
                    name: "",
                    email: "",
                    avatarBase64: "",
                    bio: "",
                    xp: 0,
                    level: 1,
                    tasksDone: [],
                    tasksDaily: {},
                };
                await setDoc(ref, initial);
                setUser(initial);
            }
            setLoading(false);
        }
        fetchProfile();
    }, [userId]);

    async function saveProfile(edited: Partial<UserProfile>) {
        const ref = doc(db, "users", userId);
        await updateDoc(ref, edited as Record<string, any>);
        setUser((old) => old ? { ...old, ...edited } : null);
    }


    return { user, setUser, saveProfile, loading };
}
