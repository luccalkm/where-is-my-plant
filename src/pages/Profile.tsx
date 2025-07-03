
import React from "react";
import { Box, Typography, Card, Avatar, Divider, Grid, TextField, Button, CircularProgress } from "@mui/material";
import { useUserStore } from "../stores/useUserStore";
import { useFirebaseUserSync } from "../hooks/useFirebaseSync";
import { getLevelByXp } from "../utils/primeLevel";

const userId = (() => {
    let id = localStorage.getItem("userId");
    if (!id) {
        id = crypto.randomUUID();
        localStorage.setItem("userId", id);
    }
    return id;
})();

export const Profile = () => {
    useFirebaseUserSync(userId);
    const { level } = getLevelByXp(useUserStore(s => s.user!.xp ?? 0));
    const user = useUserStore(s => s.user);
    const loading = useUserStore(s => s.loading);
    const update = useUserStore(s => s.update);

    const [edited, setEdited] = React.useState(user);
    const [isDirty, setIsDirty] = React.useState(false);

    function handleChange(field: string, value: string) {
        setEdited((prev) => prev ? { ...prev, [field]: value } : prev);
        setIsDirty(true);
    }
    
    function handleSave() {
        if (edited) {
            update(edited);
            setIsDirty(false);
        }
    }

    if (loading || !edited) {
        return <Box mt={6} textAlign="center"><CircularProgress /></Box>;
    }

    return (
        <Box maxWidth="sm" mx="auto" display="flex" flexDirection="column" gap={2}>
            <Card sx={{ p: 3 }}>
                <Grid container spacing={3} alignItems="center" justifyContent="center">
                    <Grid>
                        <Avatar src={edited.avatarUrl || undefined} alt={edited.name || "Avatar"} sx={{ width: 96, height: 96, fontSize: 40, bgcolor: "primary.main" }} />
                    </Grid>
                    <Grid>
                        <TextField variant="standard" label="Nome" value={edited.name} onChange={e => handleChange("name", e.target.value)} fullWidth sx={{ mb: 1 }} />
                        <TextField variant="standard" label="Email" value={edited.email} onChange={e => handleChange("email", e.target.value)} fullWidth sx={{ mb: 1 }} />
                    </Grid>
                </Grid>
                <Divider sx={{ my: 3 }} />
                <Grid container spacing={2}>
                    <Grid size={6}>
                        <Typography variant="subtitle2" color="text.secondary">XP Total</Typography>
                        <Typography variant="h6">{edited.xp}</Typography>
                    </Grid>
                    <Grid size={6}>
                        <Typography variant="subtitle2" color="text.secondary">Nível</Typography>
                        <Typography variant="h6">{level}</Typography>
                    </Grid>
                </Grid>
            </Card>
            <Card sx={{ p: 3 }}>
                <Typography variant="subtitle1" fontWeight={600}>Sobre</Typography>
                <TextField
                    variant="outlined"
                    value={edited.bio}
                    multiline
                    minRows={2}
                    maxRows={6}
                    onChange={e => handleChange("bio", e.target.value)}
                    fullWidth sx={{ mt: 1 }}
                />
            </Card>
            <Button variant="contained" size="small" sx={{ mt: 1 }} onClick={handleSave} disabled={!isDirty}>
                Salvar
            </Button>
        </Box>
    );
};