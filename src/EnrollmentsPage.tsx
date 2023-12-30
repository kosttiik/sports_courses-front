import { FC, useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Table, Button } from 'react-bootstrap'

import store from './store/store'
import { getEnrollments } from './modules/get-enrollments'
import { Enrollment } from './modules/ds'

const EnrollmentsPage: FC = () => {
    const { userToken, userRole } = useSelector((state: ReturnType<typeof store.getState>) => state.auth)

    const [enrollmentsArray, setEnrollmentsArray] = useState<string[][]>([])

    useEffect(() => {
        var enrollments: Enrollment[] = []
        const loadEnrollments = async()  => {
            if (userToken !== undefined) {
                enrollments = await getEnrollments(userToken?.toString(), '')
                var arr: string[][] = []
                for (let enrollment of enrollments) {
                    var enrollmentArray:string[] = []
                    enrollmentArray.push(enrollment.ID.toString())
                    enrollmentArray.push(enrollment.Status)
                    enrollmentArray.push(enrollment.DateCreated)
                    enrollmentArray.push(enrollment.DateProcessed)
                    enrollmentArray.push(enrollment.DateFinished)
                    enrollmentArray.push(enrollment.StartDate)
                    enrollmentArray.push(enrollment.EndDate)

                    arr.push(enrollmentArray)
                }
                setEnrollmentsArray(arr)
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
            {userToken && enrollmentsArray.length == 0 &&
                <h3>Записи не найдены.</h3>
            }
            <Table>
                <thead>
                    <tr>
                        <th scope='col'>ID</th>
                        <th scope='col'>Статус</th>
                        <th scope='col'>Дата создания</th>
                        <th scope='col'>Дата обработки</th>
                        <th scope='col'>Дата завершения</th>
                        <th scope='col'>Дата начала записи</th>
                        <th scope='col'>Дата конца записи</th>
                        {((userRole?.toString() == '2') || (userRole?.toString() == '3')) &&
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
                                <Button href={'/sports_courses-front/enrollment?enrollment_id=' + enrollmentsArray[rowID][0]}>Изменить</Button>
                            }
                        </tr>
                    ))}
                </tbody>
            </Table>
        </>
    )
}

export default EnrollmentsPage
