import { FC, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Button } from 'react-bootstrap'

import store, { useAppDispatch } from './store/store'
import { logoutUser } from './modules/authActions'

const AccountPage: FC = () => {
    const [userRoleString, setUserRoleString] = useState('')

    const { userToken, userName, userRole } = useSelector((state: ReturnType<typeof store.getState>) => state.auth)
    const isUserPresent = userToken !== undefined && userToken != ''

    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const sendLogout = async() => {
        if (userToken != null) {
            dispatch(logoutUser(userToken))
            navigate('/sports_courses-front/')
        }
    }

    useEffect(() => {
        if (userRole == '1') {
            setUserRoleString('Пользователь')
        } else if (userRole == '2') {
            setUserRoleString('Модератор')
        } else if (userRole == '3') {
            setUserRoleString('Администратор')
        }
    })

    return (
        <>
            {!isUserPresent &&
                <h1>Вы не зашли в систему!</h1>
            }
            {isUserPresent &&
                <>
                    <h1>Аккаунт</h1>
                    <p>Имя пользователя: { userName }</p>
                    <p>Роль пользователя: { userRoleString }</p>
                    <Button onClick={ sendLogout }>Выйти из системы</Button>
                </>
            }
        </>
    )
}

export default AccountPage
