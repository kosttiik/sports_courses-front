import { FC, useEffect, useState } from "react"
import {Container, Button, Table, Modal, Row, Col } from "react-bootstrap"
import { useSelector } from "react-redux"

import store from "./store/store"
import { useAppDispatch } from "./store/store"
import cartSlice from "./store/cartSlice"
import GroupsFilter from "./components/GroupsFilter"

import { GetGroupsResponse, getGroups } from './modules/get-groups'

import defaultImage from './assets/empty-group.png'

const ModGroupsPage : FC = () => {
    const dispatch = useAppDispatch()

    const {userToken, userRole} = useSelector((state: ReturnType<typeof store.getState>) => state.auth)
    const {enrolled} = useSelector((state: ReturnType<typeof store.getState> ) => state.cart)
    const {groupTitle, groupCourse} = useSelector((state: ReturnType<typeof store.getState> ) => state.filters)

    const [groupsArray, setGroupsArray] = useState<string[][]>([])

    useEffect(() =>  {
        const loadGroups = async()  => {

            const result : GetGroupsResponse = await getGroups(String(userToken), String(groupTitle), '', String(groupCourse))

            if (result.groups) {
                var arr: string[][] = []
                for (let group of result.groups) {
                    var groupArray:string[] = []
                    groupArray.push(group.ImageName.toString())
                    groupArray.push(group.ID.toString())
                    groupArray.push(group.Title)
                    groupArray.push(group.Status)

                    arr.push(groupArray)
                }
                setGroupsArray(arr)
            }
        }
        loadGroups()
    }, [groupTitle, groupCourse])

    const handleModalClose= () => {
        dispatch(cartSlice.actions.disableEnrolled())
    }

    const addGroupToCard = (groupTitle: string) => {
        dispatch(cartSlice.actions.addGroup(groupTitle))
    }

    if (!userToken || !userRole || (userRole?.toString() != '2' && userRole?.toString() != '3') ) {
        return (
            <>
                <p>У вас недостатоно прав для просмотра данной страницы.</p>
            </>
        )
    }
    return (
        <>
            <Modal show = {enrolled} onHide={handleModalClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Группа добавлена в корзину</Modal.Title>
                </Modal.Header>
                <Modal.Footer>
                    <Button variant="success" onClick={() => {dispatch(cartSlice.actions.disableEnrolled())}}>
                      Ок
                    </Button>
                </Modal.Footer>
            </Modal>
            <Container>
                <Row className="justify-content-center">
                  <Col xs="auto">
                    <h1 className="text-center">Группы</h1>
                  </Col>
                </Row>
            </Container>
            <GroupsFilter></GroupsFilter>
            <Table>
                <thead className="thead-dark">
                    <tr>
                        <th scope="col">Изображение</th>
                        <th scope="col">ID</th>
                        <th scope="col">Название</th>
                        <th scope="col">Статус</th>
                        <th scope="col"></th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    {groupsArray.map((rowContent, rowID) => (
                        <tr key={rowID}>
                            <td>
                                <img 
                                    src={(rowContent[0] == '' ? defaultImage.toString() : "/group_image/" + rowContent[0])}
                                    style={{width: '100px'}}
                                />
                            </td>
                            {rowContent.slice(1).map((val, rowID) => (
                                <td key={rowID + 1}>{val}</td>
                            ))
                            }
                            <td>
                                <Button href={"/sports_courses-front/group_edit?title=" + rowContent[2]}>
                                    Изменить
                                </Button>
                            </td>
                            <td>
                                <Button variant="success" onClick={() => {addGroupToCard(rowContent[2])}}>В запись</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <Button href="/sports_courses-front/group_edit?title=new">
                Создать группу
            </Button>
        </>
    )
}

export default ModGroupsPage
