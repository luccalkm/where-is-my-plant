import ReactMarkdown from "react-markdown";
import { Typography } from "@mui/material";

export function MarkdownRenderer({ children }: { children: string }) {
  return (
    <Typography component="div" fontSize={15} sx={{
      '& code': { bgcolor: '#f5f5f5', px: 0.5, borderRadius: 1, fontSize: 14 },
      '& pre': { bgcolor: '#f5f5f5', p: 1, borderRadius: 2, overflowX: 'auto' },
      '& ul': { pl: 2, mb: 1 },
      '& ol': { pl: 2, mb: 1 },
      '& strong': { color: 'primary.main' },
      '& blockquote': { borderLeft: '3px solid #c8e6c9', pl: 1, color: 'grey.700', fontStyle: 'italic', mb: 1 },
    }}>
      <ReactMarkdown>{children}</ReactMarkdown>
    </Typography>
  );
}
