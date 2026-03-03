import { Typography, Box, Button } from '@mui/material'
import { useAtom } from 'jotai'
import { counterAtom, doubleCounterAtom } from '@/store'

export function HomePage() {
  const [count, setCount] = useAtom(counterAtom)
  const [double] = useAtom(doubleCounterAtom)

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Welcome to Rutabaga 🥔
      </Typography>
      <Typography variant="body1" color="text.secondary" gutterBottom>
        React + TypeScript + Vite + MUI + TanStack Query + Jotai + Cloudflare Workers
      </Typography>

      <Box sx={{ mt: 4, display: 'flex', alignItems: 'center', gap: 2 }}>
        <Button variant="contained" onClick={() => setCount((c) => c + 1)}>
          Count: {count}
        </Button>
        <Typography variant="body2" color="text.secondary">
          (doubled: {double})
        </Typography>
      </Box>
    </Box>
  )
}
