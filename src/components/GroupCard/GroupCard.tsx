import { FC } from 'react'
import { useSelector } from 'react-redux'
import { Button, ButtonGroup, Card } from 'react-bootstrap'
import store, { useAppDispatch } from '../../store/store'
import cartSlice from '../../store/cartSlice'

import './GroupCard.css'

interface Props {
    imageUrl: string
    groupTitle: string
    groupCourse: string
    groupSchedule: string
    pageUrl: string
}

const GroupCard: FC<Props> = ({ imageUrl, groupTitle, groupCourse, groupSchedule, pageUrl }) => {
    const dispatch = useAppDispatch()

    const { userRole } = useSelector((state: ReturnType<typeof store.getState>) => state.auth)

    const addGroupToCard = () => {
        dispatch(cartSlice.actions.addGroup(groupTitle))
    }

    const deleteRestoreGroup = async () => {
        await fetch('/api/group/delete_restore/' + groupTitle, {
            method: 'PUT'
        });
        window.location.replace('/sports_courses-front/')
    } 

    return (
        <Card className='w-80 h-100'>
            <Card.Img variant="top" src={imageUrl}/>
            <Card.Body className='d-flex flex-column'>
                <Card.Title className='mt-auto'>{ groupTitle }</Card.Title>
                <Card.Body className='mt-auto'>Курс:<b> { groupCourse }</b></Card.Body>
                <Card.Body className='mt-auto'>Расписание:<b> { groupSchedule }</b></Card.Body>
                <ButtonGroup className='text-center'>
                    <Button variant="info" href={pageUrl}>Подробнее</Button>
                    {((userRole?.toString() == '2') || (userRole?.toString() == '3')) && 
                        <Button variant="warning" onClick={ deleteRestoreGroup }>Удалить</Button>
                    }
                    <Button variant="success"onClick={ addGroupToCard }>Записаться</Button>
                </ButtonGroup>
            </Card.Body>
        </Card>
    )
}

export default GroupCard
