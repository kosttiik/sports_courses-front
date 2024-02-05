import { FC } from 'react'
import { useSelector } from 'react-redux'
import { Button, ButtonGroup, Card } from 'react-bootstrap'
import store, { useAppDispatch } from '../store/store'

import { addGroupToDraft } from '../modules/add-group-to-draft'

import './GroupCard.css'
import cartSlice from '../store/cartSlice'
import { useNavigate, Link } from 'react-router-dom'
interface Props {
    imageUrl: string
    groupTitle: string
    groupCourse: string
    groupSchedule: string
    pageUrl: string
    groupID: number
}

const GroupCard: FC<Props> = ({imageUrl, groupTitle, groupSchedule, groupCourse, pageUrl, groupID}) => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const {userToken} = useSelector((state: ReturnType<typeof store.getState>) => state.auth)

    const addGroupToCard = async () => {
        if (!userToken) {
            return
        }

        dispatch(cartSlice.actions.addGroup(groupTitle))
        await addGroupToDraft(userToken, groupID)

        navigate('/sports_courses-front/')
    }

    return (
        <Card className="rounded border-primary" style={{width: 'auto'}}>
            <Card.Img className="card-img" variant="top" src={imageUrl}/>
            <Card.Body className='d-flex flex-column'>
                <Card.Title className='mt-auto'><b>{groupTitle}</b></Card.Title>
                <Card.Text className='mt-auto'>Курс: <b>{groupCourse}</b> <br /> Расписание: <b>{groupSchedule}</b></Card.Text>
                <ButtonGroup vertical className='text-center'>
                <Link to={pageUrl} className='btn btn-primary react-button'>Подробнее</Link>
                    { userToken &&
                        <Button variant="warning" onClick={addGroupToCard} className='react-button-inverse'>В запись</Button>
                    }
                </ButtonGroup>
            </Card.Body>
        </Card>
    )
}

export default GroupCard
