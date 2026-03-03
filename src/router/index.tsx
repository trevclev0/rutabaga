import { createBrowserRouter } from 'react-router-dom'
import { RootLayout } from '@/components/RootLayout'
import { HomePage } from '@/pages/HomePage'
import { NotFoundPage } from '@/pages/NotFoundPage'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      // Add more routes here, e.g.:
      // {
      //   path: 'about',
      //   element: <AboutPage />,
      // },
    ],
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
])
