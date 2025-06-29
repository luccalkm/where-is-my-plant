import React from "react";
import { Box, Typography, Card, CardContent, Avatar, Divider, Grid, TextField, Button } from "@mui/material";

export const Profile = () => {
    // Simulação de dados iniciais
    const [user, setUser] = React.useState({
        name: "Lucca Lima",
        email: "lucca@email.com",
        xp: 1420,
        level: 8,
        avatarUrl: "https://ui-avatars.com/api/?name=Lucca+Lima&background=76e7c1&color=fff&size=128",
        bio: "Full Stack Developer, Plant lover 🌱. Buscando sempre crescer e aprender.",
    });

    // Controle de edição (local)
    const [edited, setEdited] = React.useState(user);
    const [isDirty, setIsDirty] = React.useState(false);

    function handleChange(field: keyof typeof user, value: string) {
        setEdited((prev) => ({ ...prev, [field]: value }));
        setIsDirty(true);
    }

    function handleSave() {
        setUser(edited);
        setIsDirty(false);
    }

    return (
        <Box maxWidth="sm" mx="auto" display="flex" flexDirection="column" gap={2}>
            <Card sx={{ p: 3 }}>
                <Grid container spacing={3} alignItems="center" justifyContent="center">
                    <Grid size="auto">
                        <Avatar
                            src={user.avatarUrl}
                            alt={user.name}
                            sx={{ width: 96, height: 96, fontSize: 40, bgcolor: "primary.main" }}
                        />
                    </Grid>
                    <Grid>
                        <TextField
                            variant="standard"
                            label="Nome"
                            value={edited.name}
                            onChange={(e) => handleChange("name", e.target.value)}
                            fullWidth
                            sx={{ mb: 1 }}
                        />
                        <TextField
                            variant="standard"
                            label="Email"
                            value={edited.email}
                            onChange={(e) => handleChange("email", e.target.value)}
                            fullWidth
                            sx={{ mb: 1 }}
                        />
                    </Grid>
                </Grid>

                <Divider sx={{ my: 3 }} />

                <Grid container spacing={2}>
                    <Grid size={6}>
                        <Typography variant="subtitle2" color="text.secondary">
                            XP Total
                        </Typography>
                        <Typography variant="h6">{user.xp}</Typography>
                    </Grid>
                    <Grid size={6}>
                        <Typography variant="subtitle2" color="text.secondary">
                            Nível
                        </Typography>
                        <Typography variant="h6">{user.level}</Typography>
                    </Grid>
                </Grid>
            </Card>
            <Card sx={{ p: 3 }}>
                <Typography variant="subtitle1" fontWeight={600}>
                    Sobre
                </Typography>
                <TextField
                    variant="outlined"
                    value={edited.bio}
                    multiline
                    minRows={2}
                    maxRows={6}
                    onChange={(e) => handleChange("bio", e.target.value)}
                    fullWidth
                    sx={{ mt: 1 }}
                />
            </Card>
            <Button
                variant="contained"
                size="small"
                sx={{ mt: 1 }}
                onClick={handleSave}
                disabled={!isDirty}
            >
                Salvar
            </Button>
        </Box>
    );
};
