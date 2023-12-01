import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import 'bootstrap/dist/css/bootstrap.min.css';

import CoursesPage from './CoursesPage'
import CoursePage from './CoursePage'
import Navigation from './components/Navigation/Navigation'
import Breadcrumbs from './components/Breadcrumbs/Breadcrumbs'


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Navigation />
      <Breadcrumbs />
      <Routes>
        <Route path="/sports_courses-front" Component={CoursesPage} />
        <Route path="/sports_courses-front/course" Component={CoursePage} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
