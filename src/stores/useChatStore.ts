import { create } from "zustand";
import { askGemini } from "../utils/gemini";

interface ChatMessage {
    role: "user" | "bot";
    content: string;
}

interface ChatState {
    messages: ChatMessage[];
    loading: boolean;
    ask: (question: string) => Promise<void>;
    clear: () => void;
}

export const useChatStore = create<ChatState>((set, get) => ({
    messages: [],
    loading: false,
    ask: async (question) => {
        set((s) => ({ ...s, loading: true, messages: [...s.messages, { role: "user", content: question }] }));
        const context =
            "Você é um assistente de botânica. Responda dúvidas sobre plantas, cultivo, cuidados, pragas, solo, rega, iluminação, espécies, dicas para iniciantes e curiosidades. Seja didático, amigável e objetivo.";
        try {
            const answer = await askGemini(`${context}\nPergunta: ${question}`);
            set((s) => ({
                ...s,
                loading: false,
                messages: [...s.messages, { role: "bot", content: answer }],
            }));
        } catch (e) {
            set((s) => ({
                ...s,
                loading: false,
                messages: [...s.messages, { role: "bot", content: "Erro ao buscar resposta. Tente novamente." }],
            }));
        }
    },
    clear: () => set({ messages: [] }),
}));
