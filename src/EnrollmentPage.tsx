import { FC } from "react"

import { useEffect, useState } from "react"

import { Form, FormControl, FormGroup, Button, FormSelect } from "react-bootstrap"

import { getEnrollment } from "./modules/get-enrollment"
import { Enrollment } from "./modules/ds"

const EnrollmentPage: FC = () => {

    const [enrollmentId, setEnrollmentId] = useState(0)
    const [enrollment, setEnrollment] = useState<Enrollment>()

    useEffect(() => {
        const queryString = window.location.search
        const urlParams = new URLSearchParams(queryString)
        const enrollmentIdString = urlParams.get('enrollment_id')
        if (enrollmentIdString != null) {
            setEnrollmentId(+enrollmentIdString)
        }

        const loadEnrollment = async () => {
            const enrollment = await getEnrollment(enrollmentId)
            setEnrollment(enrollment)
        }

        loadEnrollment()
    })

    return(
        <>
        <h1>Редактирование записи #{enrollmentId}</h1>
        <Form>
            <FormGroup>
                <label htmlFor="statusInput">Статус</label>
                <FormSelect id="statusInput" defaultValue={enrollment?.Status}>
                    <option>Черновик</option>
                    <option>Удалён</option>
                    <option>Сформирован</option>
                    <option>Завершён</option>
                    <option>Отклонён</option>
                </FormSelect>
            </FormGroup>
            <FormGroup>
                <label htmlFor="dateCreatedInput">Дата создания</label>
                <FormControl id="dateCreatedInput" defaultValue={enrollment?.DateCreated}></FormControl>
            </FormGroup>
            <FormGroup>
                <label htmlFor="dateProcessedInput">Дата обработки</label>
                <FormControl id="dateProcessedInput" defaultValue={enrollment?.DateProcessed}></FormControl>
            </FormGroup>
            <FormGroup>
                <label htmlFor="dateFinishedInput">Дата завершения</label>
                <FormControl id="dateFinishedInput" defaultValue={enrollment?.DateFinished}></FormControl>
            </FormGroup>
        </Form>
        <Button>Сохранить изменения</Button>
        <p></p>
        <Button href='/sports_courses-front/enrollments'>К записям</Button>
        <p></p>
        <Button href='/sports_courses-front/'>Домой</Button>
        <p></p>
        </>
    )
}

export default EnrollmentPage
