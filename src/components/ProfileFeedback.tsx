import { Paper, Typography, Rating, TextField, Button, Box } from '@mui/material';
import React from 'react';

export function ProfileFeedback({ onSend }: { onSend: (rating: number, feedback: string) => void }) {
    const [feedback, setFeedback] = React.useState("");
    const [rating, setRating] = React.useState<number | null>(null);
    const [sent, setSent] = React.useState(false);

    const handleSend = () => {
        if (!feedback || !rating) return;
        onSend(rating, feedback);
        setSent(true);
    };

    if (sent) {
        return (
            <Paper sx={{ p: 3, mt: 2, mb: 2, borderRadius: 3, bgcolor: 'success.lighter', textAlign: 'center' }}>
                <Typography fontWeight={700} color="success.main" mb={1}>
                    Obrigado pelo seu feedback! 🌱
                </Typography>
                <Typography color="text.secondary" fontSize={15}>
                    Sua opinião é muito importante para nós.
                </Typography>
            </Paper>
        );
    }

    return (
        <Paper sx={{
            p: 3, mt: 2, mb: 2, borderRadius: 4, bgcolor: '#f4fff7',
            boxShadow: '0 2px 12px 0 rgba(80,176,96,0.07)',
            border: '1.5px solid #d0f5e0',
            maxWidth: 420, mx: 'auto',
        }}>
            <Typography fontWeight={700} fontSize={18} color="primary.main" mb={1} textAlign="center">
                Avalie o aplicativo
            </Typography>
            <Box display="flex" justifyContent="center" mb={1.5}>
                <Rating
                    value={rating}
                    onChange={(_, val) => setRating(val)}
                    size="large"
                    sx={{ fontSize: 36 }}
                />
            </Box>
            <TextField
                label="Deixe seu feedback"
                multiline
                minRows={3}
                maxRows={6}
                value={feedback}
                onChange={e => setFeedback(e.target.value)}
                fullWidth
                sx={{ mb: 2, bgcolor: '#fff', borderRadius: 2 }}
                InputProps={{ style: { fontSize: 15 } }}
            />
            <Button
                variant="contained"
                disabled={!feedback || !rating}
                onClick={handleSend}
                size="large"
                sx={{ borderRadius: 2, fontWeight: 700, px: 4 }}
                fullWidth
            >
                Enviar avaliação
            </Button>
        </Paper>
    );
}
