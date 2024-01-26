import { FC, useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Container, Table, Button, Row, Col, Form, FormLabel, FormSelect} from 'react-bootstrap'

import store from './store/store'
import { getEnrollments } from './modules/get-enrollments'
import { getEnrollmentGroups } from './modules/get-enrollment-groups'
import { Enrollment } from './modules/ds'
import filtersSlice from './store/filtersSlice'
import { useAppDispatch } from "./store/store"
import { useRef } from "react"
import { deleteEnrollment } from './modules/delete-enrollment'
import { useNavigate } from 'react-router-dom'


const EnrollmentsPage: FC = () => {
    const {userToken, userRole} = useSelector((state: ReturnType<typeof store.getState>) => state.auth)
    const {enrollmentStatus, startDate, endDate, enrollmentCreator} = useSelector((state: ReturnType<typeof store.getState>) => state.filters)

    const [enrollmentsArray, setEnrollmentsArray] = useState<string[][]>([])

    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const statusRef = useRef<any>(null)
    const startDateRef = useRef<any>(null)
    const endDateRef = useRef<any>(null)
    const enrollmentCreatorRef = useRef<any>(null)

    useEffect(() => {
        const applyFilters = () => {
            let status = statusRef.current.value
            let startDate = startDateRef.current.value
            let endDate = endDateRef.current.value
    
            dispatch(filtersSlice.actions.setEnrollmentStatus(status))
            dispatch(filtersSlice.actions.setStartDate(startDate))
            dispatch(filtersSlice.actions.setEndDate(endDate))
            
            if (status == "Все") {
                status = ""
            }
        }

        const loadEnrollments = async()  => {

            applyFilters()

            let status = statusRef.current.value
            let startDate = startDateRef.current.value
            let endDate = endDateRef.current.value

            if (status == "Все") {
                status = ""
            }

            var enrollments: Enrollment[] = []
            if (userToken) {
                if (enrollmentStatus == null) {
                    return
                }

                console.log(status)
                enrollments = await getEnrollments(userToken, status, startDate, endDate)
                console.log(enrollments)

                if (!userToken) {
                    return
                }

                let arr: string[][] = []
                for (let enrollment of enrollments) {
                    let enrollmentArray:string[] = []

                    if (userRole?.toString() == '2') {
                        if (enrollment.User && enrollment.User["name"]) {
                            enrollmentArray.push(enrollment.User["name"])
                        } else {
                            enrollmentArray.push('-')
                        }
                    }

                    enrollmentArray.push(enrollment.ID.toString())
                    enrollmentArray.push(enrollment.Status)

                    const groups = await getEnrollmentGroups(enrollment.ID, userToken)
                    if (groups) {
                        const group_titles = []
                        for (let group of groups) {
                            group_titles.push(group.Title)
                        }
                        enrollmentArray.push(group_titles.toString().replace(new RegExp(',', 'g'), '\n'))
                    } else {
                        enrollmentArray.push('')
                    }

                    if (enrollment.DateCreated) {
                        enrollment.DateCreated = enrollment.DateCreated.substring(0,  enrollment.DateCreated.indexOf('+'))
                        enrollmentArray.push(enrollment.DateCreated.replace('T', ' '))
                    }
                    if (enrollment.DateProcessed) {
                        if (enrollment.DateProcessed == "0001-01-01T00:00:00Z") {
                            enrollmentArray.push("-")
                        } else {
                            enrollment.DateProcessed = enrollment.DateProcessed.substring(0,  enrollment.DateProcessed.indexOf('+'))
                            enrollmentArray.push(enrollment.DateProcessed.replace('T', ' '))
                        }
                    }
                    if (enrollment.DateFinished) {
                        if (enrollment.DateFinished == "0001-01-01T00:00:00Z") {
                            enrollmentArray.push("-")
                        } else {
                            enrollment.DateFinished = enrollment.DateFinished.substring(0,  enrollment.DateFinished.indexOf('+'))
                            enrollmentArray.push(enrollment.DateFinished.replace('T', ' '))
                        }
                    }
                    arr.push(enrollmentArray)
                }
                setEnrollmentsArray(arr)
            }       
        }

        loadEnrollments()

        const intervalId = setInterval(() => {
            loadEnrollments()
        }, 1000)
    
        // Очистка интервала при размонтировании компонента
        return () => clearInterval(intervalId)
    }, [])

    if (!userToken) {
        return (
            <>
                <h3>Для просмотра записей вам необходимо войти в систему!</h3>
            </>
        )
    }

    const cancelEnrollment = async(event: React.MouseEvent<HTMLButtonElement>) => {
        console.log(event.currentTarget.id)
        const enrollment_id = parseInt(event.currentTarget.id, 10)
        if (!enrollment_id) {
            return
        }

        const result = await deleteEnrollment(userToken, enrollment_id)
        if (result.status == 200) {
            navigate('/sports_courses-front/enrollments')
        }
    }

    return (
        <>
            <Container>
                <Row className="justify-content-center">
                  <Col xs="auto">
                    <h1 className="text-center">Записи</h1>
                  </Col>
                </Row>
            </Container>
            <p></p>
            <div>
            <Form>
                <Row>
                    <Col>
                        <FormLabel>Статус:</FormLabel>
                        <FormSelect ref={statusRef} defaultValue={enrollmentStatus?.toString()}>
                            <option>Черновик</option>
                            <option>Удалён</option>
                            <option>Сформирован</option>
                            <option>Завершён</option>
                            <option>Отклонён</option>
                            <option>Все</option>
                        </FormSelect>
                    </Col>
                    {userRole?.toString() == '2' && 
                        <Col>
                            <FormLabel>Создатель:</FormLabel>
                            <input
                                className="form-control"
                                defaultValue={enrollmentCreator?.toString()}
                                ref={enrollmentCreatorRef}
                            />
                        </Col>
                    }
                    <Col>
                        <FormLabel>Сформировано с:</FormLabel>
                        <input
                            className="form-control"
                            type="datetime-local"
                            defaultValue={startDate?.toString().slice(0, -4)}
                            ref={startDateRef}
                        />
                    </Col>
                    <Col>
                        <FormLabel>По:</FormLabel>
                        <input
                            className="form-control"
                            type="datetime-local"
                            defaultValue={endDate?.toString().slice(0, -4)}
                            ref={endDateRef}
                        />
                    </Col>
                </Row>
            </Form>
        </div>
            <p></p>
            <Table>
                <thead className='thead-dark'>
                    <tr>
                        {(userRole?.toString() == '2') &&
                            <th scope='col'>Создатель</th>
                        }
                        <th scope='col'>ID</th>
                        <th scope='col'>Статус</th>
                        <th scope='col'>Группы</th>
                        <th scope='col'>Дата создания</th>
                        <th scope='col'>Дата обработки</th>
                        <th scope='col'>Дата завершения</th>
                        <th scope='col'></th>
                        {(userRole?.toString() == '1') && 
                            <th scope='col'></th>
                        }
                    </tr>
                </thead>
                <tbody>
                    {enrollmentsArray.map((rowContent, rowID) => (
                        <tr key={rowID}>
                            {rowContent.map((val, rowID) => (
                                <td key={rowID}>{val}</td>
                            ))
                            }
                            {((userRole?.toString() == '2') || (userRole?.toString() == '3')) &&
                                <td>
                                    <Button href={'/sports_courses-front/enrollment_edit?enrollment_id=' + enrollmentsArray[rowID][1]}>Изменить</Button>
                                </td>
                            }
                            {(userRole?.toString() == '1') && 
                                <td>
                                    <Button href={'/sports_courses-front/enrollment?enrollment_id=' + enrollmentsArray[rowID][0]}>Просмотр</Button>
                                </td>
                            }
                            {(userRole?.toString() == '1') && 
                            <td>
                                <Button variant='danger'
                                id={enrollmentsArray[rowID][Number((userRole?.toString() == '2'))]}
                                onClick={cancelEnrollment}>
                                    Отменить
                                </Button>
                            </td>
                            }
                        </tr>
                    ))}
                </tbody>
            </Table>
        </>
    )
}

export default EnrollmentsPage
