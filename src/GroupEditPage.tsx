import { FC, useEffect, useState, useRef, ChangeEvent } from "react"
import { Card, Form, FormGroup, FormSelect, FormControl, Button, Modal, Row, Col } from "react-bootstrap"
import { Group } from "./modules/ds"
import { getGroupByTitle } from "./modules/get-group"
import { useSelector } from "react-redux"
import store from "./store/store"
import { editGroup } from "./modules/edit-group"
import { sendImage } from "./modules/send-image"
import { createGroup } from "./modules/create-group"

const GroupEditPage: FC = () =>{
    const courseRef = useRef<any>(null)
    const titleRef = useRef<any>(null)
    const descriptionRef = useRef<any>(null)
    const statusRef = useRef<any>(null)
    const capacityRef = useRef<any>(null)
    const enrolledRef = useRef<any>(null)
    const coachNameRef = useRef<any>(null)
    const coachEmailRef = useRef<any>(null)
    const coachPhoneRef = useRef<any>(null)
    const scheduleRef = useRef<any>(null)

    const [selectedFile, setSelectedFile] = useState<File | null>(null)

    const [group, setGroup] = useState<Group>()

    const [newGroup, setNewGroup] = useState(false)

    const {userToken} = useSelector((state: ReturnType<typeof store.getState>) => state.auth)

    const [showSuccess, setShowSuccess] = useState(false)
    const [showError, setShowError] = useState(false)

    useEffect(() => {
        const queryString = window.location.search
        const urlParams = new URLSearchParams(queryString)
        const groupTitle = urlParams.get('title')

        const loadGroup = async () => {
            const result = await getGroupByTitle(String(groupTitle))
            setGroup(result)
        }
        if (groupTitle != 'new') {
            loadGroup()
        } else {
            setNewGroup(true)
        }
        
    }, [])

    const sendChanges = async () => {
        if (!userToken) {
            return
        }

        var course = courseRef.current.value
        var description = descriptionRef.current.value
        var capacity = capacityRef.current.value
        var enrolled = enrolledRef.current.value
        var coachName = coachNameRef.current.value
        var coachPhone = coachPhoneRef.current.value
        var coachEmail = coachEmailRef.current.value
        var schedule = scheduleRef.current.value
        var status = statusRef.current.value
        var title = titleRef.current.value

        const group_str = {
            ID: group?.ID ? group?.ID : 0,
            Course: course ? course : group?.Course,
            Description: description ? description : group?.Description,
            Capacity: capacity ? capacity : group?.Capacity,
            Enrolled: enrolled ? enrolled : group?.Enrolled,
            CoachName: coachName ? coachName : group?.CoachName,
            CoachPhone: coachPhone ? coachPhone : group?.CoachPhone,
            CoachEmail: coachEmail ? coachEmail : group?.CoachEmail,
            Schedule: schedule ? schedule : group?.Schedule,
            ImageName: group?.ImageName ? group?.ImageName : "",
            Title: title ? title : group?.Title,
            Status: status ? status : group?.Status
        }

        if (newGroup) {
            const creationResult = await createGroup(userToken, group_str)

            if (creationResult.status == 201) {
                setShowSuccess(true)
            } else {
                setShowError(true)
            }

            const new_group = await getGroupByTitle(group_str.Title)
            if (selectedFile) {
                const imageResult = await sendImage(userToken, String(new_group.ID), selectedFile)
                console.log(imageResult.status)
            }

        } else {
            const editResult = await editGroup(userToken, group_str)

            if (editResult.status == 201) {
                setShowSuccess(true)
            } else {
                setShowError(true)
            }

            if (selectedFile) {
                const imageResult = await sendImage(userToken, String(group?.ID), selectedFile)
                console.log(imageResult.status)
            }
        }
    }

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0] || null
        setSelectedFile(file)
    }

    const handleErrorClose= () => {
        setShowError(false)
    }
    const handleSuccessClose = () => {
        setShowSuccess(false)
    }

    return (
        <>
            <Modal show = {showError} onHide={handleErrorClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Произошла ошибка, группа не была обновлена</Modal.Title>
                </Modal.Header>
                <Modal.Footer>
                    <Button variant="danger" onClick={handleErrorClose}>
                      Закрыть
                    </Button>
                </Modal.Footer>
            </Modal>
            <Modal show = {showSuccess} onHide={handleSuccessClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Редактирование группы прошло успешно!</Modal.Title>
                </Modal.Header>
                <Modal.Footer>
                    <Button variant="success" onClick={handleSuccessClose}>
                      Закрыть
                    </Button>
                </Modal.Footer>
            </Modal>
            <Form style={{width: '500px', marginRight: 'auto', marginLeft: 'auto', alignItems: 'center', justifyContent: 'center'}}>
                <Row className="justify-content-center">
                    <Card.Img
                        style={{width: '200px'}}
                        src={(group?.ImageName == '' ? '/group_image/empty.webp' : "/group_image/" + group?.ImageName)}
                        variant="top"
                        />
                </Row>
                <FormGroup>
                    <label htmlFor="status">Название</label>
                    <FormControl id="title" defaultValue={group?.Title} ref={titleRef}></FormControl>
                </FormGroup>
                <FormGroup>
                    <label htmlFor="status">Статус</label>
                    <FormSelect id="status" defaultValue={group?.Status} ref={statusRef}>
                        <option>Действует</option>
                        <option>Недоступен</option>
                    </FormSelect>
                </FormGroup>
                <FormGroup>
                    <label htmlFor="course">Курс</label>
                    <FormControl id="course" defaultValue={group?.Course} ref={courseRef}></FormControl>
                </FormGroup>
                <FormGroup>
                    <label htmlFor="description">Описание</label>
                    <FormControl id="description" defaultValue={group?.Description} ref={descriptionRef}></FormControl>
                </FormGroup>
                <FormGroup>
                    <label htmlFor="capacity">Количество участников</label>
                    <FormControl id="capacity" defaultValue={group?.Capacity} ref={capacityRef}></FormControl>
                </FormGroup>
                <FormGroup>
                    <label htmlFor="enrolled">Зарегистрировано</label>
                    <FormControl id="enrolled" defaultValue={group?.Enrolled} ref={enrolledRef}></FormControl>
                </FormGroup>
                <FormGroup>
                    <label htmlFor="coachName">Преподаватель</label>
                    <FormControl id="coachName" defaultValue={group?.CoachName} ref={coachNameRef}></FormControl>
                </FormGroup>
                <FormGroup>
                    <label htmlFor="coachPhone">Телефон преподавателя</label>
                    <FormControl id="coachPhone" defaultValue={group?.CoachPhone} ref={coachPhoneRef}></FormControl>
                </FormGroup>
                <FormGroup>
                    <label htmlFor="coachEmail">Почта преподавателя</label>
                    <FormControl id="coachEmail" defaultValue={group?.CoachEmail} ref={coachEmailRef}></FormControl>
                </FormGroup>
                <FormGroup>
                    <label htmlFor="schedule">Расписание</label>
                    <FormControl id="schedule" defaultValue={group?.Schedule} ref={scheduleRef}></FormControl>
                </FormGroup>
                <FormGroup>
                    <Row>
                        <Col>
                            <label htmlFor="imageName">Изображение</label>
                        </Col>
                        <Col>
                            <input id="imageName" defaultValue={group?.ImageName} onChange={handleFileChange} type="file"  accept="image/*"></input>
                        </Col>
                    </Row>
                </FormGroup>
            <p></p>
            <Row>
                <Button onClick={sendChanges}>Сохранить изменения</Button>
            </Row>
            <p></p>
            <Row>
                <Button href='/sports_courses-front/'>Домой</Button>
            </Row>
            <p></p>
        </Form>
        </>
    )
}

export default GroupEditPage
