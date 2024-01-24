import { FC } from "react"

import { useEffect, useState, useRef } from "react"
import { useSelector } from "react-redux"

import { Form, FormControl, FormGroup, Button, FormSelect, ListGroup, ListGroupItem, FormLabel } from "react-bootstrap"

import { getEnrollment } from "./modules/get-enrollment"
import { Enrollment, Group } from "./modules/ds"
import { getEnrollmentGroups } from "./modules/get-enrollment-groups"
import store from "./store/store"

interface InputChangeInterface {
    target: HTMLInputElement;
}

const EnrollmentPage: FC = () => {
    const newGroupInputRef = useRef<any>(null)

    const {userToken} = useSelector((state: ReturnType<typeof store.getState>) => state.auth)

    const [enrollment, setEnrollment] = useState<Enrollment>()
    const [groupTitles, setGroupTitles] = useState<string[]>()
    const [newGroup, setNewGroup] = useState('')

    useEffect(() => {
        const queryString = window.location.search
        const urlParams = new URLSearchParams(queryString)
        const enrollmentIdString = urlParams.get('enrollment_id')

        const loadEnrollment = async () => {
            if (enrollmentIdString === null) {
                return
            }
            const enrollment = await getEnrollment(+enrollmentIdString)
            setEnrollment(enrollment)

            if (userToken === null) {
                return
            }

            const groups = await getEnrollmentGroups(+enrollmentIdString, userToken)
            var groupTitles: string[] = []
            for (let group of groups) {
                groupTitles.push(group.Title)
            }
            setGroupTitles(groupTitles)
        }
        loadEnrollment()
    }, [])

    const removeGroup = (removedGroupName: string) => {
        return (event: React.MouseEvent) => {
            if (!groupTitles) {
                return
            }

            setGroupTitles(groupTitles.filter(function(groupName) {
                return groupName !== removedGroupName
            }))

            event.preventDefault()
        }
    }

    const addGroup = () => {
        if (!groupTitles || !newGroup) {
            return
        }

        setGroupTitles(groupTitles.concat([newGroup]))
        setNewGroup('')

        if (newGroupInputRef.current != null) {
            newGroupInputRef.current.value = ""
        }
    }

    const handleNewGroupChange = (event: InputChangeInterface) => {
        setNewGroup(event.target.value)
    }

    return(
        <>
        <h1>Редактирование записи #{enrollment?.ID}</h1>
        <h4>Группы:</h4>
        <ListGroup style={{width: '500px'}}>
            {regionNames?.map((regionName, regionID) => (
                <ListGroupItem key={regionID}> {regionName}
                    <span className="pull-right button-group" style={{float: 'right'}}>
                        <Button variant="danger" onClick={removeRegion(regionName)}>Удалить</Button>
                    </span>
                </ListGroupItem>
            ))
            }
        </ListGroup>
        <span>
            <input ref={newRegionInputRef} onChange={handleNewRegionChange}></input>
            <Button onClick={addRegion}>Добавить</Button>
        </span>
        <h4>Характеристики:</h4>
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
