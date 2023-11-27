import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider} from 'react-router-dom'

import 'bootstrap/dist/css/bootstrap.min.css';

import CoursesPage from './CoursesPage'
import CoursePage from './CoursePage'

const router = createBrowserRouter([
  {
    path: '/',
    element: <CoursesPage />
  },
  {
    path: '/course',
    element: <CoursePage />
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <div>
        <h1>Запись на спортивные курсы МГТУ им. Н. Э. Баумана</h1>
      </div>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
