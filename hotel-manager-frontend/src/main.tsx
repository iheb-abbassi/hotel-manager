import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import './index.css'
import App from './pages/App'
import RoomsPage from './pages/RoomsPage'
import NewRoomPage from './pages/NewRoomPage'
import EditRoomPage from './pages/EditRoomPage'
import ViewRoomPage from './pages/ViewRoomPage'

const router = createBrowserRouter([
  { path: '/', element: <App />, children: [
    { index: true, element: <RoomsPage /> },
    { path: 'rooms/new', element: <NewRoomPage /> },
    { path: 'rooms/:number', element: <ViewRoomPage /> },
    { path: 'rooms/:number/edit', element: <EditRoomPage /> },
  ]}
])

const qc = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={qc}>
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </React.StrictMode>
)
