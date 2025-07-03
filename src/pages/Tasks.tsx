import {
    Box,
    Typography,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Chip,
    Stack,
    Divider,
    LinearProgress,
    Paper,
    Avatar,
    useTheme
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import IconButton from '@mui/material/IconButton';
import { tasksCatalog } from "../data/tasksCatalog/tasksCatalog";
import { useUserStore } from "../stores/useUserStore";
import { useChatStore } from '../stores/useChatStore';
import { Fragment } from "react/jsx-runtime";
import { useNavigate } from 'react-router-dom';

export const Tasks = () => {
    const theme = useTheme();
    const user = useUserStore((s) => s.user);
    const markTaskDone = useUserStore((s) => s.markTaskDone);
    const navigate = useNavigate();

    if (!user) {
        return (
            <Box mt={6} textAlign="center">
                <LinearProgress />
            </Box>
        );
    }

    const formatCategoryName = (name: string): string => {
        return name
            .replace(/([A-Z])/g, ' $1')       
            .replace(/^./, (str) => str.toUpperCase())  
            .trim();                         
    }

    return (
        <Box
            maxWidth="md"
            mx="auto"
            px={1}
            py={1}
            pb={9}
            sx={{
                [theme.breakpoints.down("sm")]: {
                    pb: 10,
                },
            }}
        >
            <Typography
                variant="h6"
                fontWeight={700}
                mb={1.5}
                sx={{
                    fontSize: { xs: 18, sm: 24 },
                    textAlign: { xs: "center", sm: "left" },
                }}
            >
                Suas tarefas para cultivar 🌱
            </Typography>
            <Divider sx={{ mb: { xs: 1.5, sm: 2 } }} />

            {Object.entries(tasksCatalog).map(([category, themes]) => (
                <Paper
                    elevation={0}
                    sx={{
                        mb: { xs: 2, sm: 4 },
                        p: { xs: 1, sm: 2 },
                        borderRadius: 3,
                        bgcolor: "#fcfff6",
                    }}
                    key={category}
                >
                    <Typography
                        variant="subtitle1"
                        color="primary"
                        fontWeight={700}
                        mb={0.5}
                        sx={{ fontSize: { xs: 15, sm: 18 }, pl: 1 }}
                    >
                        {formatCategoryName(category)}
                    </Typography>

                    {themes.map((theme) => {
                        const allDone = theme.tasks.every((t) =>
                            user.tasksDone?.includes(t.id)
                        );
                        const firstUndoneIdx = theme.tasks.findIndex(t => !(user.tasksDone?.includes(t.id)));
                        const unlockedTask = theme.tasks[firstUndoneIdx];
                        return (
                            <Accordion
                                key={theme.id}
                                sx={{
                                    mb: 1,
                                    bgcolor: "#f5f9ec",
                                    borderRadius: 2,
                                    boxShadow: "none",
                                    "&:before": { display: "none" },
                                }}
                                disableGutters
                            >
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    sx={{
                                        minHeight: 48,
                                        pl: 0.5,
                                        pr: 1,
                                    }}
                                >
                                    <Stack
                                        direction="row"
                                        alignItems="center"
                                        spacing={1}
                                        sx={{ width: "100%" }}
                                    >
                                        <Avatar
                                            sx={{
                                                width: 32,
                                                height: 32,
                                                bgcolor: allDone ? "primary.main" : "grey.200",
                                                color: allDone ? "white" : "primary.main",
                                                fontSize: 18,
                                            }}
                                        >
                                            <EmojiEventsIcon fontSize="inherit" />
                                        </Avatar>
                                        <Typography
                                            fontWeight={600}
                                            sx={{
                                                fontSize: { xs: 15, sm: 17 },
                                                flex: 1,
                                                overflow: "hidden",
                                                textOverflow: "ellipsis",
                                                whiteSpace: "nowrap",
                                            }}
                                        >
                                            {theme.name}
                                        </Typography>
                                        {unlockedTask && (
                                            <IconButton
                                                size="small"
                                                sx={{ ml: 0.5, color: '#fbc02d' }}
                                                onClick={e => {
                                                    e.stopPropagation();
                                                    const question = `Estou no passo: "${unlockedTask.title}". ${unlockedTask.description}\nMe ajude com esse passo?`;
                                                    useChatStore.getState().ask(question);
                                                    navigate('/chat');
                                                }}
                                            >
                                                <AutoAwesomeIcon fontSize="small" />
                                            </IconButton>
                                        )}
                                        <Chip
                                            label={`${theme.tasks.filter((t) =>
                                                user.tasksDone?.includes(t.id)
                                            ).length}/${theme.tasks.length}`}
                                            size="small"
                                            color={allDone ? "success" : "default"}
                                            sx={{
                                                fontWeight: 700,
                                                fontSize: 13,
                                                px: 1,
                                                bgcolor: allDone ? "success.light" : "grey.100",
                                            }}
                                        />
                                    </Stack>
                                </AccordionSummary>
                                <AccordionDetails sx={{ pt: 1, pb: 0.5 }}>
                                    <List dense sx={{ width: "100%", px: 0 }}>
                                        {theme.tasks.map((task, idx) => {
                                            const done = user.tasksDone?.includes(task.id) ?? false;
                                            const firstUndoneIdx = theme.tasks.findIndex(t => !(user.tasksDone?.includes(t.id)));
                                            const unlocked = done || idx === firstUndoneIdx;
                                            return (
                                                <ListItem
                                                    key={task.id}
                                                    sx={{
                                                        bgcolor: done
                                                            ? "success.lighter"
                                                            : unlocked
                                                                ? "#fff"
                                                                : "grey.100",
                                                        borderRadius: 2,
                                                        mb: 1,
                                                        px: 1,
                                                        minHeight: 48,
                                                        transition: "background 0.2s",
                                                        opacity: unlocked ? 1 : 0.6,
                                                    }}
                                                    onClick={() => {
                                                        if (unlocked && !done) markTaskDone(task.id);
                                                    }}
                                                    component={unlocked && !done ? "button" : "li"}
                                                    disabled={!unlocked || done}
                                                >
                                                    <ListItemIcon sx={{ minWidth: 32, display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                                        {done ? (
                                                            <CheckCircleIcon
                                                                fontSize="small"
                                                                color="success"
                                                            />
                                                        ) : unlocked ? (
                                                            <RadioButtonUncheckedIcon
                                                                fontSize="small"
                                                                color="action"
                                                            />
                                                        ) : (
                                                            <RadioButtonUncheckedIcon
                                                                fontSize="small"
                                                                sx={{ color: 'grey.400' }}
                                                            />
                                                        )}
                                                    </ListItemIcon>
                                                    <ListItemText
                                                        primary={
                                                            <Typography
                                                                sx={{
                                                                    textDecoration: done ? "line-through" : undefined,
                                                                    fontSize: { xs: 15, sm: 16 },
                                                                    fontWeight: 500,
                                                                    lineHeight: 1.25,
                                                                    color: unlocked ? undefined : 'grey.500',
                                                                }}
                                                            >
                                                                {task.title}
                                                            </Typography>
                                                        }
                                                        secondary={
                                                            <Fragment>
                                                                <Typography
                                                                    component="span"
                                                                    sx={{
                                                                        fontSize: { xs: 12, sm: 13 },
                                                                        color: unlocked ? "text.secondary" : 'grey.400',
                                                                        whiteSpace: "pre-line",
                                                                        display: "block",
                                                                    }}
                                                                >
                                                                    {task.description}
                                                                </Typography>
                                                                <Box textAlign={'right'} mt={0.5}>
                                                                    <Chip
                                                                        label={`+${task.xp} XP`}
                                                                        size="small"
                                                                        color={done ? "success" : unlocked ? "primary" : "default"}
                                                                        sx={{ fontWeight: 600, fontSize: { xs: 12, sm: 13 } }}
                                                                    />
                                                                </Box>
                                                            </Fragment>
                                                        }
                                                    />
                                                </ListItem>
                                            );
                                        })}
                                    </List>
                                </AccordionDetails>
                            </Accordion>
                        );
                    })}
                </Paper>
            ))}
        </Box>
    );
};
