import { FC, useEffect, useState } from 'react'
import { Col, Row, Modal, Button } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import './GroupsPage.css'

import { Group } from './modules/ds'
import { getGroups } from './modules/get-groups'
import GroupCard from './components/GroupCard/GroupCard'

import store, { useAppDispatch } from './store/store';
import cartSlice from './store/cartSlice';

const GroupsPage: FC = () => {
    const dispatch = useAppDispatch()

    const [groups, setGroups] = useState<Group[]>([])
    const {enrolled} = useSelector((state: ReturnType<typeof store.getState> ) => state.cart)

    useEffect(() => {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString)
        var groupTitle = urlParams.get('title_pattern')
        if (groupTitle == null) {
            groupTitle = ""
        }

        const loadGroups = async()  => {
            const result = await getGroups(String(groupTitle))
            console.log(result)
            setGroups(result)
        }

        loadGroups()
    }, []);

    const handleModalClose= () => {
        dispatch(cartSlice.actions.disableEnrolled())
    }

    return (
        <div>
            <Modal show = {enrolled} onHide={() => { handleModalClose }}>
                <Modal.Header closeButton>
                    <Modal.Title>Группа добавлена в корзину</Modal.Title>
                </Modal.Header>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => {dispatch(cartSlice.actions.disableEnrolled())}}>
                      Ок
                    </Button>
                </Modal.Footer>
            </Modal>

            <div>
                <form method="GET" action="" name="search">
                <input type="text" id="group_search" name="title_pattern"/>
                <input type="submit" className="button" value="Поиск"></input>
                </form>
            </div>

            <Row xs={4} md={4} className='g-4' >
                {groups.map((item, index) => (
                    <Col key={index}>
                        <GroupCard {...{
                             imageUrl: (item.ImageName == '' ? '/group_image/fitness.png' : "/group_image/" + item.ImageName?.toString()),
                             groupTitle: item.Title,
                             groupCourse: item.Course,
                             groupSchedule: item.Schedule,
                             pageUrl: window.location.href.split('?')[0] + "group?group_title=" + item.Title
                        }}></GroupCard>
                    </Col>
                ))}
            </Row>
        </div>
    )
}

export default GroupsPage
