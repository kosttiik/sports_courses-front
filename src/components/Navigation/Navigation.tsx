import { FC } from 'react';
import { useSelector } from 'react-redux';
import store from '../../store/store'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'

const Navigation: FC = () => {
  const { userToken } = useSelector((state: ReturnType<typeof store.getState>) => state.auth)
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="/sports_courses-front/">Спортивные курсы МГТУ</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
          <Nav.Link href="/sports_courses-front/enrollments">Записи</Nav.Link>
            {!userToken &&
              <Nav.Link href="/sports_courses-front/auth">Вход</Nav.Link>
            }
            {userToken &&
              <>
                <Nav.Link href="/sports_courses-front/account">Аккаунт</Nav.Link>
                <Nav.Link href="/sports_courses-front/enroll">Запись</Nav.Link>
              </>
            }
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Navigation
