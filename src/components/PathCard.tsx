import { Card, CardContent, Typography, Box } from '@mui/material';

interface PathCardProps {
    path: {
        id: string;
        title: string;
        description: string;
        image?: string;
    };
}

export function PathCard({ path }: PathCardProps) {
    return (
        <Card sx={{ width: 180, minHeight: 200, mx: 1, bgcolor: "#f6fff8", borderRadius: 4, boxShadow: 2 }}>
            <CardContent>
                <Box sx={{ textAlign: 'center', mb: 2 }}>
                    <img
                        src={path.image || ''}
                        alt={path.title}
                        style={{ width: 54, height: 54, objectFit: 'contain' }}
                        onError={e => (e.currentTarget.style.display = 'none')}
                    />
                </Box>
                <Typography variant="h6" gutterBottom>
                    {path.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {path.description}
                </Typography>
            </CardContent>
        </Card>
    );
}
