import { FC, useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Row, Col } from 'react-bootstrap'

import EnrollmentCard from './components/EnrollmentCard/EnrollmentCard'
import store from './store/store'
import { getEnrollments } from './modules/get-enrollments'
import { Enrollment } from './modules/ds'

const EnrollmentsPage: FC = () => {
    const { userToken, userRole } = useSelector((state: ReturnType<typeof store.getState>) => state.auth)

    const [enrollments, setEnrollments] = useState<Enrollment[]>([])

    useEffect(() => {
        const loadEnrollments = async()  => {
            if (userToken !== undefined) {
                const result = await getEnrollments(userToken?.toString(), '')
                console.log(result)
                setEnrollments(result)
            }
        }
        loadEnrollments()
    }, [])

    return (
        <>
            <h1>Записи</h1>
            {!userToken &&
                <h3> Вам необходимо войти в систему! </h3>
            }
            {userToken && enrollments.length == 0 &&
                <h3>Записи не найдены.</h3>
            }
            <Row xs={4} md={4} className='g-4' >
                {enrollments.map((item, index) => (
                    <Col key={index}> 
                        <EnrollmentCard {...{
                            courseTitle: 'пусто',
                            enrollmentStatus: item.Status,
                            dateCreated: item.DateCreated,
                            dateFinished: item.DateFinished,
                            startDate: item.StartDate,
                            endDate: item.EndDate
                        }}></EnrollmentCard>
                    </Col>
                ))}
            </Row>
        </>
    )
}

export default EnrollmentsPage
