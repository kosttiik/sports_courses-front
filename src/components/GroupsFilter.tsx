import { FC } from "react"
import { FormLabel, Button, Row, Col, Container} from "react-bootstrap"
import { useSelector } from "react-redux"
import store from "../store/store"
import filtersSlice from "../store/filtersSlice"
import { useAppDispatch } from "../store/store"
import { useRef } from "react"

const GroupsFilter: FC = () => {
    const dispatch = useAppDispatch()

    const titleRef = useRef<any>(null)
    const courseRef = useRef<any>(null)

    const {groupTitle, groupCourse} = useSelector((state: ReturnType<typeof store.getState>) => state.filters)

    const applyFilters = () => {
        let title = titleRef.current.value
        let course = courseRef.current.value
        
        dispatch(filtersSlice.actions.setGroupTitle(title))
        dispatch(filtersSlice.actions.setGroupCourse(course))
    }

    return (
        <Container fluid="lg">
            <Row xs={1} md={3} className="row justify-content-center">
                <Col xs lg="2">
                    <FormLabel>Название группы:</FormLabel>
                    <input ref={titleRef} defaultValue={groupTitle?.toString()} className="form-control" style={{width: '250px'}} />
                </Col>
                <Col>
                    <FormLabel style={{marginLeft: '50px'}}>Курс:</FormLabel>
                    <input ref={courseRef} defaultValue={groupCourse?.toString()} className="form-control" style={{width: '250px', marginLeft: '50px'}} />
                </Col>
                <Col className="justify-content-center">
                    <Button onClick={applyFilters} style={{marginTop: '31px', marginLeft: '-125px'}}>Поиск</Button>
                </Col>
            </Row>
        </Container>
    )
}

export default GroupsFilter
