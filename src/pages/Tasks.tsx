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
import { tasksCatalog } from "../data/tasksCatalog/tasksCatalog";
import { useUserStore } from "../stores/useUserStore";
import { Fragment } from "react/jsx-runtime";

export const Tasks = () => {
    const theme = useTheme();
    const user = useUserStore((s) => s.user);
    const markTaskDone = useUserStore((s) => s.markTaskDone);

    if (!user) {
        return (
            <Box mt={6} textAlign="center">
                <LinearProgress />
            </Box>
        );
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
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                    </Typography>

                    {themes.map((theme) => {
                        const allDone = theme.tasks.every((t) =>
                            user.tasksDone?.includes(t.id)
                        );
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
                                        {theme.tasks.map((task) => {
                                            const done = user.tasksDone?.includes(task.id) ?? false;
                                            return (
                                                <ListItem
                                                    key={task.id}
                                                    sx={{
                                                        bgcolor: done
                                                            ? "success.lighter"
                                                            : "#fff",
                                                        borderRadius: 2,
                                                        mb: 1,
                                                        px: 1,
                                                        minHeight: 48,
                                                        transition: "background 0.2s",
                                                    }}
                                                    onClick={() => {
                                                        if (!done) markTaskDone(task.id);
                                                    }}
                                                    component={!done ? "button" : "li"}
                                                    disabled={done}
                                                >
                                                    <ListItemIcon sx={{ minWidth: 32 }}>
                                                        {done ? (
                                                            <CheckCircleIcon
                                                                fontSize="small"
                                                                color="success"
                                                            />
                                                        ) : (
                                                            <RadioButtonUncheckedIcon
                                                                fontSize="small"
                                                                color="action"
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
                                                                        color: "text.secondary",
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
                                                                        color={done ? "success" : "primary"}
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
