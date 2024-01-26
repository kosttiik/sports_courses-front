import { FC, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import './GroupsPage.css'
import defaultImage from './assets/empty-group.png'

import { Group } from './modules/ds'
import { GetGroupsResponse, getGroups } from './modules/get-groups'

import { Row, Col, Modal, Button, Container } from 'react-bootstrap'
import GroupCard from './components/GroupCard'
import GroupsFilter from './components/GroupsFilter'

import store, { useAppDispatch } from './store/store'
import cartSlice from './store/cartSlice'



const GroupsPage: FC = () => {
    const {userToken} = useSelector((state: ReturnType<typeof store.getState>) => state.auth)

    const dispatch = useAppDispatch()

    const [groups, setGroups] = useState<Group[]>([])
    const {enrolled} = useSelector((state: ReturnType<typeof store.getState> ) => state.cart)
    const {groupTitle, groupCourse} = useSelector((state: ReturnType<typeof store.getState> ) => state.filters)

    useEffect(() => {
        const loadGroups = async()  => {
            const result : GetGroupsResponse = await getGroups(String(userToken), String(groupTitle), 'Действует', String(groupCourse))
            if (result.groups) {
                setGroups(result.groups)
            }
            if (result.draft_enrollment && result.draft_enrollment.ID != 0) {
                console.log(result.draft_enrollment.ID)
                dispatch(cartSlice.actions.setDraftID(result.draft_enrollment.ID))
            } else {
                dispatch(cartSlice.actions.setDraftID(null))
            }
        }
        loadGroups()
    }, [groupTitle, groupCourse, enrolled])

    const handleModalClose= () => {
        dispatch(cartSlice.actions.disableEnrolled())
    }

    return (
        <div>
            <Modal show={enrolled} onHide={handleModalClose} centered>
                <Modal.Header closeButton className="bg-primary text-white">
                    <Modal.Title>Группа добавлена в корзину</Modal.Title>
                </Modal.Header>
                <Modal.Footer className="bg-light">
                    <Button variant="success" onClick={() => dispatch(cartSlice.actions.disableEnrolled())}>
                        Закрыть
                    </Button>
                </Modal.Footer>
            </Modal>

            <GroupsFilter />
            <p></p>
            <Container className="mt-5">
                <Row xs={4} md={4} className='justify-content-center'>
                    {groups.map((item, index) => (
                        <Col key={index} md={3} className="mb-4"> 
                            <GroupCard {...{
                                 imageUrl: (item.ImageName == '' ? defaultImage?.toString() : "/group_image/" + item.ImageName?.toString()),
                                 groupTitle: item.Title,
                                 groupCourse: item.Course,
                                 groupSchedule: item.Schedule,
                                 pageUrl: window.location.href.split('?')[0] + "group?group_title=" + item.Title,
                                 groupID: item.ID
                            }}></GroupCard>
                        </Col>
                    ))}
                </Row>
            </Container>
        </div>
    )
}

export default GroupsPage
