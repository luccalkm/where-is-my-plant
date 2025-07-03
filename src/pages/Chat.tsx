import React, { useRef, useEffect } from "react";
import { Box, Typography, Paper, TextField, IconButton, CircularProgress, Stack } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { useChatStore } from "../stores/useChatStore";
import { MarkdownRenderer } from '../components/MarkdownRenderer';

export default function Chat() {
  const { messages, ask, loading, clear } = useChatStore();
  const [input, setInput] = React.useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim()) return;
    await ask(input);
    setInput("");
  };

  return (
    <Box maxWidth="sm" mx="auto" py={2} display="flex" flexDirection="column" height="80vh">
      <Typography variant="h6" fontWeight={700} mb={2} textAlign="center">
        Chat Botânico 🌱
      </Typography>
      <Paper sx={{ flex: 1, p: 2, mb: 2, overflowY: "auto", bgcolor: "#f8fafc" }}>
        <Stack spacing={1}>
          {messages.length === 0 && (
            <Typography color="text.secondary" fontSize={15} textAlign="center">
              Pergunte sobre plantas, cultivo, pragas, dicas, espécies...
            </Typography>
          )}
          {messages.map((msg, i) => (
            <Box key={i} alignSelf={msg.role === "user" ? "flex-end" : "flex-start"}>
              <Paper
                sx={{
                  p: 1.2,
                  px: 2,
                  bgcolor: msg.role === "user" ? "primary.main" : "grey.100",
                  color: msg.role === "user" ? "#fff" : "#222",
                  borderRadius: 2,
                  maxWidth: 320,
                  fontSize: 15,
                  boxShadow: 0,
                }}
              >
                {msg.role === 'bot' ? <MarkdownRenderer>{msg.content}</MarkdownRenderer> : msg.content}
              </Paper>
            </Box>
          ))}
          {loading && (
            <Box alignSelf="flex-start" display="flex" alignItems="center" gap={1}>
              <CircularProgress size={18} />
              <Typography fontSize={14} color="text.secondary">Pensando...</Typography>
            </Box>
          )}
          <div ref={bottomRef} />
        </Stack>
      </Paper>
      <form onSubmit={handleSend} style={{ display: "flex", gap: 8 }}>
        <TextField
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Digite sua dúvida botânica..."
          fullWidth
          size="small"
          autoFocus
          disabled={loading}
        />
        <IconButton type="submit" color="primary" disabled={loading || !input.trim()}>
          <SendIcon />
        </IconButton>
      </form>
      <Box mt={1} textAlign="center">
        <Typography variant="caption" color="text.secondary" sx={{ cursor: 'pointer' }} onClick={clear}>
          Limpar conversa
        </Typography>
      </Box>
    </Box>
  );
}
