import { create } from 'zustand';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import type { UserCredential } from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { useUserStore } from './useUserStore';

interface AuthState {
    loading: boolean;
    error: string;
    login: (email: string, password: string) => Promise<UserCredential | null>;
    register: (name: string, email: string, password: string) => Promise<UserCredential | null>;
    setError: (msg: string) => void;
    setLoading: (val: boolean) => void;
}

let login: AuthState['login'];
let register: AuthState['register'];

export const useAuthStore = create<AuthState>((set, get) => {
    login = async (email, password) => {
        set({ error: '', loading: true });
        const auth = getAuth();
        try {
            const userCred = await signInWithEmailAndPassword(auth, email, password);
            const userDoc = await getDoc(doc(db, 'users', userCred.user.uid));
            if (userDoc.exists()) {
                const data = userDoc.data();
                const userProfile = {
                    id: data.id,
                    name: data.name,
                    email: data.email,
                    avatarBase64: data.avatarBase64 || '',
                    bio: data.bio || '',
                    xp: data.xp || 0,
                    tasksDone: data.tasksDone || [],
                    tasksDaily: data.tasksDaily || {},
                    feedback: data.feedback,
                };
                useUserStore.getState().setAll(userProfile);
                useUserStore.getState().setLoading(false);
            }
            set({ loading: false });
            return userCred;
        } catch (err: any) {
            let msg = 'E-mail ou senha inválidos.';
            if (err.code === 'auth/too-many-requests') msg = 'Muitas tentativas. Tente novamente mais tarde.';
            set({ error: msg, loading: false });
            return null;
        }
    };

    register = async (name, email, password) => {
        set({ error: '', loading: true });
        if (!name.trim()) {
            set({ error: 'O nome é obrigatório.', loading: false });
            return null;
        }
        const auth = getAuth();
        try {
            const userCred = await createUserWithEmailAndPassword(auth, email, password);
            await updateProfile(userCred.user, { displayName: name });
            const userProfile = {
                id: userCred.user.uid,
                name,
                email,
                avatarBase64: '',
                bio: '',
                xp: 0,
                tasksDone: [],
                tasksDaily: {},
            };
            await setDoc(doc(db, 'users', userCred.user.uid), userProfile);
            const loginResult = await get().login(email, password);
            set({ loading: false });
            return loginResult;
        } catch (err: any) {
            let msg = 'Erro ao registrar. Verifique o e-mail e senha.';
            if (err.code === 'auth/email-already-in-use') msg = 'Este e-mail já está em uso.';
            if (err.code === 'auth/invalid-email') msg = 'E-mail inválido.';
            if (err.code === 'auth/weak-password') msg = 'A senha deve ter pelo menos 6 caracteres.';
            set({ error: msg, loading: false });
            return null;
        }
    };

    return {
        loading: false,
        error: '',
        setError: (msg) => set({ error: msg }),
        setLoading: (val) => set({ loading: val }),
        login,
        register,
    };
});
