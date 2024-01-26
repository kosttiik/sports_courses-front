import { FC, useEffect, useState, useRef} from "react"
import { useSelector } from "react-redux"

import { Container,Col, Form,  Button,ListGroup, ListGroupItem,  FormLabel, Row } from "react-bootstrap"

import { getEnrollment } from "./modules/get-enrollment";
import { Enrollment } from "./modules/ds";
import { getEnrollmentGroups } from "./modules/get-enrollment-groups";
import store from "./store/store";
import cartSlice from './store/cartSlice'
import { useAppDispatch } from "./store/store";

import { addGroupToDraft } from "./modules/add-group-to-draft"
import { getGroupByTitle } from "./modules/get-group"
import { removeGroupFromEnrollment } from "./modules/remove-group-from-enrollment"
import { approveEnrollment } from "./modules/approve-enrollment"

import { useNavigate } from "react-router-dom"
import { editEnrollment } from "./modules/edit-enrollment"
import { modApproveEnrollment } from "./modules/mod-approve-enrollment"

interface InputChangeInterface {
    target: HTMLInputElement
}

const EnrollmentEditPage: FC = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    const {userToken, userName, userRole} = useSelector((state: ReturnType<typeof store.getState>) => state.auth)

    const [enrollment, setEnrollment] = useState<Enrollment>()
    const [groupTitles, setGroupTitles] = useState<string[]>()
    const [wrongEnrollment, setWrongEnrollment] = useState(false)

    const [newGroup, setNewGroup] = useState('')

    const newGroupInputRef = useRef<any>(null)

    useEffect(() => {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString)
        const enrollmentIdString = urlParams.get('enrollment_id')

        if (!enrollmentIdString || (enrollmentIdString && !parseInt(enrollmentIdString, 10))) {
            setWrongEnrollment(true)
        }

        const loadEnrollment = async () => {
            if (!enrollmentIdString) {
                return
            }
            const enrollment = await getEnrollment(+enrollmentIdString)
            setEnrollment(enrollment)

            if (userToken === null) {
                return
            }

            const groups = await getEnrollmentGroups(+enrollmentIdString, userToken)
            var groupTitles: string[] = []
            if (groups) {
                for (let group of groups) {
                    groupTitles.push(group.Title)
                }
                setGroupTitles(groupTitles)
            }
        }
        loadEnrollment()
    }, [])

    const approve = async () => {
        if (!userToken || !enrollment?.ID) {
            return
        }

        const result = await approveEnrollment(userToken, enrollment?.ID)
        if (result.status == 200) {
            dispatch(cartSlice.actions.setDraftID(null))
            navigate('/sports_courses-front/enrollments')
        }
        await editEnrollment(userToken, enrollment?.ID)
    }

    const modConfirmTrue = async() => {
        if (!userToken || !enrollment?.ID) {
            return
        }

        const result = await modApproveEnrollment(userToken, enrollment?.ID, 'True')
        if (result.status == 200) {
            navigate('/sports_courses-front/enrollments')
        }
    }

    const modConfirmFalse = async() => {
        if (!userToken || !enrollment?.ID) {
            return
        }

        const result = await modApproveEnrollment(userToken, enrollment?.ID, 'False')
        if (result.status == 200) {
            navigate('/sports_courses-front/enrollments')
        }
    }

    const removeGroup = async(event: React.MouseEvent<HTMLButtonElement>) => {
        let removedGroupTitle = event.currentTarget.id

        if (!groupTitles || !userToken || !enrollment?.ID) {
            return
        }

        let result = await getGroupByTitle(removedGroupTitle)
        if (!result.Title) {
            return
        }

        let deletion_result = await removeGroupFromEnrollment(userToken, result.ID, enrollment?.ID)
        if (deletion_result.status != 201) {
            return
        }

        setGroupTitles(groupTitles.filter(function(groupTitle) {
            return groupTitle !== removedGroupTitle
        }))
    }

    const handleNewGroupChange = (event: InputChangeInterface) => {
        setNewGroup(event.target.value)
    }

    const addGroup = async () => {
        if (!newGroup || !userToken) {
            return
        }

        if (groupTitles?.indexOf(newGroup) !== -1) {
            return
        }

        const result = await getGroupByTitle(newGroup)
        if (!result.Title) {
            return
        }

        const addition_result = await addGroupToDraft(userToken, result.ID)
        if (addition_result.status != 200) {
            return
        }

        if (!groupTitles) {
            setGroupTitles([newGroup.toString()]);
        }

        if (groupTitles === undefined) {
            return
        }

        setGroupTitles(groupTitles.concat([newGroup]))
        setNewGroup('')

        if (newGroupInputRef.current != null) {
            newGroupInputRef.current.value = ""
        }
    }

    if (wrongEnrollment) {
        return (
            <h1>Запись не существует!</h1>
        )
    }

    return(
        <Form style={{width: '600px', marginRight: 'auto', marginLeft: 'auto'}}>
            <h1>Информация о записи #{enrollment?.ID}</h1>
            <h4>Группы:</h4>
            {(enrollment?.Status == "Черновик" && (enrollment.User?.name == userName || userRole == "2")) &&
                <>
                    <ListGroup style={{width: '500px'}}>
                        {groupTitles?.map((groupTitle, groupID) => (
                            <ListGroupItem key={groupID}> {groupTitle}
                                <span className="pull-right button-group" style={{float: 'right'}}>
                                    <Button variant="danger" id={groupTitle} onClick={removeGroup}>Удалить</Button>
                                </span>
                            </ListGroupItem>
                        ))
                        }
                    </ListGroup>
                    <Row>
                        <Col>
                            <FormLabel>Добавить группу:</FormLabel>
                        </Col>
                        <Col>
                            <input ref={newGroupInputRef} onChange={handleNewGroupChange} className="form-control"></input>
                        </Col>
                        <Col>
                            <Button onClick={addGroup}>Добавить</Button>
                        </Col>
                    </Row>
                </>
            }
            {!(enrollment?.Status == "Черновик" && (enrollment.User?.name == userName || userRole == "2")) && 
                <ListGroup style={{width: '500px'}}>
                    {groupTitles?.map((groupTitle, groupID) => (
                        <ListGroupItem key={groupID}> {groupTitle}
                        </ListGroupItem>
                    ))
                    }
                </ListGroup>
            }
            <h4>Характеристики:</h4>
            <p></p>
            <FormLabel>Статус: {enrollment?.Status}</FormLabel>
            <p></p>
            <p></p>
            {(enrollment?.Status == "Черновик" && (enrollment.User?.name == userName || userRole == "2"))}
            {!(enrollment?.Status == "Черновик" && (enrollment.User?.name == userName || userRole == "2"))}

            {(enrollment?.Status == "Черновик" && enrollment.User?.name == userName) &&
                <Row>
                    <p></p>
                    <Button onClick={approve} variant="success">Сформировать</Button>
                </Row>
            }
            <p></p>
            {(enrollment?.Status == "Сформирован") &&
                <Container>
                    <Row>
                        <Col>
                            <Button onClick={modConfirmFalse} variant="danger" className="w-100">Отклонить</Button>
                        </Col>
                        <Col>
                            <Button onClick={modConfirmTrue} variant="success" className="w-100">Одобрить</Button>
                        </Col>
                    </Row>
                </Container>
            }

            <Row>
                <Button href='/sports_courses-front/enrollments'>К записям</Button>
            </Row>
            <p></p>
            <Row>
                <Button href='/sports_courses-front/'>Домой</Button>
            </Row>
            <p></p>
        </Form>
    )
}

export default EnrollmentEditPage
