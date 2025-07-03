import { CardContent, Typography, Paper, useTheme, Grid, IconButton, Tooltip } from '@mui/material';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';

interface PathCardProps {
    path: {
        id: string;
        title: string;
        description: string;
        image?: string;
    };
}

export function PathCard({ path }: PathCardProps) {
    const theme = useTheme();
    return (
        <Paper sx={{}}>
            <CardContent>
                <Grid size={12} container direction={'column'} spacing={2}>
                    <Grid size={12} container justifyContent={'space-between'}>
                        <Typography variant="h6" gutterBottom>
                            {path.title}
                        </Typography>
                        <Tooltip title={`Explorar ideias de ${path.title}`}>
                            <IconButton size="small" color="primary">
                                <ManageSearchIcon />
                            </IconButton>
                        </Tooltip>

                    </Grid>
                    <Grid>
                        <Typography variant="body2" fontWeight={"bold"} color={theme.palette.primary.main}>
                            {path.description}
                        </Typography>
                    </Grid>
                </Grid>
            </CardContent>
        </Paper>
    );
}
