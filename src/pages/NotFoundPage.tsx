import { Box, Button, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'

export function NotFoundPage() {
  const navigate = useNavigate()

  return (
    <Box sx={{ textAlign: 'center', mt: 8 }}>
      <Typography variant="h1" color="text.secondary">
        404
      </Typography>
      <Typography variant="h5" gutterBottom>
        Page not found
      </Typography>
      <Button variant="contained" onClick={() => navigate('/')} sx={{ mt: 2 }}>
        Go Home
      </Button>
    </Box>
  )
}
