import React from 'react'
import ReactDOM from 'react-dom/client'

import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'
import CoursesPage from './CoursesPage'


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <CoursesPage />
  </React.StrictMode>,
)
