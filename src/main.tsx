import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter} from 'react-router-dom'
import { Routes, Route } from 'react-router-dom'

import GroupsPage from './GroupsPage'
import RegisterPage from './RegisterPage'
import GroupPage from './GroupPage'
import EnrollmentsPage from './EnrollmentsPage'
import Navigation from './components/Navigation'
import Breadcrumbs from './components/Breadcrumbs'
import AuthPage from './AuthPage'
import store from './store/store'
import ModGroupsPage from './ModGroupPage'

import 'bootstrap/dist/css/bootstrap.min.css'

import './index.css'

import { Provider } from 'react-redux'
import EnrollmentPage from './EnrollmentPage'
import EnrollmentEditPage from './EnrollmentEditPage'
import GroupEditPage from './GroupEditPage'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Navigation />
        <Breadcrumbs />
        <Routes>
          <Route path="/sports_courses-front/enrollments" Component={EnrollmentsPage} />
          <Route path="/sports_courses-front" Component={GroupsPage} />
          <Route path="/sports_courses-front/mod_groups" Component={ModGroupsPage} />
          <Route path="/sports_courses-front/group" Component={GroupPage} />
          <Route path="/sports_courses-front/enrollment" Component={EnrollmentPage} />
          <Route path="/sports_courses-front/auth" Component={AuthPage} />
          <Route path="/sports_courses-front/register" Component={RegisterPage} />
          <Route path="/sports_courses-front/enrollment_edit" Component={EnrollmentEditPage} />
          <Route path="/sports_courses-front/group_edit" Component={GroupEditPage} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
)
