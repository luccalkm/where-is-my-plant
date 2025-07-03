import { useEffect } from "react";
import { db } from "../firebase";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { useUserStore } from "../stores/useUserStore";
import type { UserProfile } from "../types/UserProfile";

export function useFirebaseUserSync(userId: string) {
    const setAll = useUserStore((s) => s.setAll);
    const setLoading = useUserStore((s) => s.setLoading);

    useEffect(() => {
        async function fetchProfile() {
            setLoading(true);
            const ref = doc(db, "users", userId);
            const snap = await getDoc(ref);
            if (snap.exists()) {
                setAll({ id: userId, ...snap.data() } as UserProfile);
            } else {
                const initial: UserProfile = {
                    id: userId,
                    name: "",
                    email: "",
                    avatarBase64: "",
                    bio: "",
                    xp: 0,
                    tasksDone: [],
                    tasksDaily: {}, 
                };
                await setDoc(ref, initial);
                setAll(initial);
            }
            setLoading(false);
        }
        fetchProfile();
    }, [userId]);
}

export async function syncUserToFirebase(user: UserProfile) {
    const ref = doc(db, "users", user.id);
    await updateDoc(ref, { ...user });
}
