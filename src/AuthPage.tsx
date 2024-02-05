import {FC, useEffect, useState} from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import {Button, Spinner, Modal, FormGroup, Form, FormLabel, Row, Col} from 'react-bootstrap'

import store, { useAppDispatch } from './store/store'
import { loginUser } from './modules/authActions'
import { Link } from 'react-router-dom'



interface InputChangeInterface {
    target: HTMLInputElement
}

const AuthPage: FC = () => {

    const {userToken, loading, userName, success} = useSelector(
        (state: ReturnType<typeof store.getState> ) => state.auth
    )

    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')

    const [showRegisterModal, setShowRegisterModal] = useState(true)

    const handleRegisterModalClose = () => {
        setShowRegisterModal(false)
    }
    const handleLoginChange = (event: InputChangeInterface) => {
        setLogin(event.target.value)
    }

    const handlePasswordChange = (event: InputChangeInterface) => {
        setPassword(event.target.value)
    }

    const sendLogin = async () => {
        setShowRegisterModal(false)
        await dispatch(loginUser({login: login, password: password}))
        window.location.reload()
    }
 
    useEffect(() => {
        if (userToken && userName) {
            navigate('/sports_courses-front/')
        }
    }, [navigate, userToken, userName])

    return (
        <div>
            <Modal show = {success && showRegisterModal && !loading} onHide={handleRegisterModalClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Регистрация прошла успешно!</Modal.Title>
                </Modal.Header>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleRegisterModalClose}>
                      Закрыть
                    </Button>
                </Modal.Footer>
            </Modal>
            <Form style={{width: '400px', marginLeft: 'auto', marginRight: 'auto'}}>
                <h1>Вход в систему</h1>
                <FormGroup>
                    <Row>
                        <Col>
                            <FormLabel>Логин:</FormLabel>
                        </Col>
                        <Col>
                            <input
                                value={login}
                                onChange={handleLoginChange}
                                className="form-control"
                            />
                        </Col>   
                    </Row>
                </FormGroup>
                <p></p>
                <FormGroup>
                    <Row>
                        <Col>
                            <FormLabel>Пароль:</FormLabel>
                        </Col>
                        <Col>
                        <input
                            type='password'
                            value={password}
                            onChange={handlePasswordChange}
                            className="form-control"
                        />
                        </Col>
                    </Row>
                </FormGroup>
                <p></p>
                <Row>
                    <Button onClick={sendLogin} disabled={loading} className='react-button'>Войти</Button>
                </Row>
                <p></p>
                <Row>
                    <Link to={"/sports_courses-front/register"} className='btn btn-primary react-button'>Регистрация</Link>
                </Row>
                <p></p>
                {loading ? <Spinner /> : ''}    
            </Form>
        </div>
    )
}

export default AuthPage
