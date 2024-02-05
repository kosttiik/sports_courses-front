import { FC } from 'react'
import { useSelector } from 'react-redux'
import store from '../store/store'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import { Button } from 'react-bootstrap'

import { logoutUser } from '../modules/authActions'
import { useAppDispatch } from '../store/store'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'

const Navigation: FC = () => {
  const {userToken, userName, userRole} = useSelector((state: ReturnType<typeof store.getState>) => state.auth)
  const {draftID} = useSelector((state: ReturnType<typeof store.getState>) => state.cart)

  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const sendLogout = async() => {
    if (userToken != null) {
        dispatch(logoutUser(userToken))
        navigate('/sports_courses-front/')
    }
  }

  return (
    <Navbar expand="lg" data-bs-theme="dark" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/sports_courses-front/">Еженедельные группы</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        {userRole?.toString() == '2' &&
            <Nav className="me-auto">
              <Nav.Link href="/sports_courses-front/mod_groups">Список групп</Nav.Link>
            </Nav>
          }
        <Navbar.Collapse id="basic-navbar-nav">
          {userToken &&
            <Nav className="me-auto">
              <Nav.Link href="/sports_courses-front/enrollments">Записи</Nav.Link>
            </Nav>
          }
        </Navbar.Collapse>
      </Container>
      {userToken &&
        <Navbar.Collapse className='justify-content-end'>
          <Nav.Link style={{ width: 'auto', color: '#FFFFFF' }} href={"/sports_courses-front/enrollment?enrollment_id=" + String(draftID)}>Корзина</Nav.Link>
          <Nav.Item style={{ marginLeft: '17px', marginRight: '10px', width: 'auto', color: '#FFFFFF' }}>Пользователь: {userName}</Nav.Item>
          <Button onClick={sendLogout} style={{ marginRight: '20px', width: 'auto', color: '#FFFFFF' }} className='react-button-inverse'>Выход</Button>
        </Navbar.Collapse>
      }
      {!userToken &&
          <Navbar.Collapse className='justify-content-end'>
            <Link to={"/sports_courses-front/auth"} style={{ marginRight: '20px', width: 'auto', color: '#FFFFFF' }} className='btn btn-primary react-button'>Вход</Link>
            <Link to={"/sports_courses-front/register"} style={{ marginRight: '20px', width: 'auto', color: '#FFFFFF' }} className='btn btn-primary react-button'>Регистрация</Link>
          </Navbar.Collapse>
      }
    </Navbar>
  )
}

export default Navigation
