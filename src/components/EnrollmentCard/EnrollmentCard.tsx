import { FC } from 'react'
import { useSelector } from 'react-redux'
import { Button, Card } from 'react-bootstrap'
import store from '../../store/store'

interface enrollmentProps {
    courseTitle: string,
    enrollmentStatus: string,
    dateCreated: string,
    dateFinished: string,
    startDate: string,
    endDate: string
}

const EnrollmentCard: FC<enrollmentProps> = ({ courseTitle, enrollmentStatus, dateCreated, dateFinished, startDate, endDate }) => {
    const { userRole } = useSelector((state: ReturnType<typeof store.getState>) => state.auth)

    return (
        <Card>
            <Card.Body>
                <p>Курс: {courseTitle}</p>
                <p>Статус: {enrollmentStatus}</p>
                <p>Запись создана: {dateCreated}</p>
                <p>Запись завершена: {dateFinished}</p>
                <p>Дата начала: {startDate}</p>
                <p>Дата конца: {endDate}</p>
            </Card.Body>
            <Card.Footer>
                {userRole == '1' &&
                    <Button>Отменить</Button>
                }
                {(userRole == '2' || userRole == '3') &&
                    <Button>Изменить</Button>
                }
            </Card.Footer>
        </Card>
    )
}

export default EnrollmentCard
