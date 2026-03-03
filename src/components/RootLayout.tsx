import { Outlet } from 'react-router-dom'
import { AppBar, Box, Container, Toolbar, Typography } from '@mui/material'

export function RootLayout() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Rutabaga
          </Typography>
        </Toolbar>
      </AppBar>

      <Container component="main" sx={{ flex: 1, py: 4 }}>
        <Outlet />
      </Container>
    </Box>
  )
}
