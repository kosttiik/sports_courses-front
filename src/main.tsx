import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Provider } from 'react-redux'

import 'bootstrap/dist/css/bootstrap.min.css'

import CoursesPage from './CoursesPage'
import CoursePage from './CoursePage'
import AuthPage from './AuthPage'
import AccountPage from './AccountPage'
import Navigation from './components/Navigation/Navigation'
import Breadcrumbs from './components/Breadcrumbs/Breadcrumbs'
import store from './store/store'


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Navigation />
        <Breadcrumbs />
        <Routes>
          <Route path="/sports_courses-front" Component={CoursesPage} />
          <Route path="/sports_courses-front/course" Component={CoursePage} />
          <Route path="/sports_courses-front/auth" Component={AuthPage} />
          <Route path="/sports_courses-front/account" Component={AccountPage} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
)
