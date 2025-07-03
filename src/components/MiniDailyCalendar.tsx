import { Typography, Paper, Tooltip, Box } from "@mui/material";

interface MiniDailyCalendarProps {
  tasksDaily: { [date: string]: string[] };
}

const weekDays = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];

function getMonthMatrix(year: number, month: number) {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const matrix: (string | null)[][] = [];
  let week: (string | null)[] = Array(firstDay.getDay()).fill(null);
  for (let d = 1; d <= lastDay.getDate(); d++) {
    const dateStr = new Date(year, month, d).toISOString().slice(0, 10);
    week.push(dateStr);
    if (week.length === 7) {
      matrix.push(week);
      week = [];
    }
  }
  if (week.length) matrix.push([...week, ...Array(7 - week.length).fill(null)]);
  return matrix;
}

const getColor = (done: number, max: number, isToday: boolean) => {
  if (isToday) return 'primary.main';
  if (done === max) return 'success.main';
  if (done >= max / 2) return 'primary.light';
  if (done > 0) return 'warning.light';
  return 'grey.100';
};

export const MiniDailyCalendar = ({ tasksDaily }: MiniDailyCalendarProps) => {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();
  const matrix = getMonthMatrix(year, month);
  const maxTasks = 4;
  const todayStr = today.toISOString().slice(0, 10);

  return (
    <Box>
      <Box display="flex" justifyContent="center" mb={0.5} gap={0.5}>
        {weekDays.map((w, i) => (
          <Typography key={i} fontSize={12} fontWeight={700} color="text.secondary" width={32} textAlign="center">{w}</Typography>
        ))}
      </Box>
      {matrix.map((week, wi) => (
        <Box key={wi} display="flex" justifyContent="center" gap={0.5} mb={0.5}>
          {week.map((date, di) => {
            if (!date) return <Box key={di} width={32} height={32} />;
            const done = tasksDaily?.[date]?.length || 0;
            const isToday = date === todayStr;
            return (
              <Tooltip key={date} title={`${done}/${maxTasks} feitas em ${date.slice(8, 10)}/${date.slice(5, 7)}` + (isToday ? ' (hoje)' : '')} arrow>
                <Paper
                  sx={{
                    width: 32,
                    height: 32,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    bgcolor: getColor(done, maxTasks, isToday),
                    borderRadius: 1.5,
                    border: isToday ? '2px solid #1976d2' : '1px solid #e0e0e0',
                    boxShadow: isToday ? 2 : 0,
                    color: done === 0 ? 'grey.500' : 'white',
                    fontWeight: 700,
                    transition: 'all 0.2s',
                  }}
                >
                  <Typography fontSize={11} fontWeight={700} lineHeight={1.1}>{done}/{maxTasks}</Typography>
                  <Typography fontSize={10} fontWeight={500} letterSpacing={0.5}>
                    {date.slice(8, 10)}
                  </Typography>
                </Paper>
              </Tooltip>
            );
          })}
        </Box>
      ))}
    </Box>
  );
};
