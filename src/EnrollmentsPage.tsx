import { FC, useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Table, Button } from 'react-bootstrap'

import store from './store/store'
import { getEnrollments } from './modules/get-enrollments'
import { getEnrollmentGroups } from "./modules/get-enrollment-groups"
import { Enrollment } from './modules/ds'

const EnrollmentsPage: FC = () => {
    const { userToken, userRole } = useSelector((state: ReturnType<typeof store.getState>) => state.auth)

    const [enrollmentsArray, setEnrollmentsArray] = useState<string[][]>([])

    useEffect(() => {
        var enrollments: Enrollment[] = []
        const loadEnrollments = async()  => {
            if (userToken !== undefined) {
                enrollments = await getEnrollments(userToken?.toString(), '')

                if (!userToken) {
                    return
                }

                var arr: string[][] = []
                for (let enrollment of enrollments) {
                    const groups = await getEnrollmentGroups(enrollment.ID, userToken)
                    const group_titles = []
                    for (let group of groups) {
                        group_titles.push(group.Title)
                    }

                    var enrollmentArray:string[] = []
                    enrollmentArray.push(enrollment.ID.toString())
                    enrollmentArray.push(enrollment.Status)
                    enrollmentArray.push(group_titles.toString().replace(new RegExp(',', 'g'), '\n'))
                    enrollmentArray.push(enrollment.DateCreated)
                    enrollmentArray.push(enrollment.DateProcessed)
                    enrollmentArray.push(enrollment.DateFinished)

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
                <thead className='thead-dark'>
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
                                <td>
                                    <Button href={'/sports_courses-front/enrollment?enrollment_id=' + enrollmentsArray[rowID][0]}>Изменить</Button>
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
