import { FC } from 'react'
import { useSelector } from 'react-redux'
import { Button, ButtonGroup, Card } from 'react-bootstrap'
import store from '../../store/store'

import './CourseCard.css'

interface Props {
    imageUrl: string
    courseTitle: string
    pageUrl: string
}


const CourseCard: FC<Props> = ({ imageUrl, courseTitle, pageUrl }) => {
    const { userRole } = useSelector((state: ReturnType<typeof store.getState>) => state.auth)

    const deleteRestoreCourse = async () => {
        await fetch('/api/course/delete_restore/' + courseTitle, {
            method: 'PUT'
        });
        window.location.replace('/sports_courses-front/')
    } 

    return (
        <Card className='w-75 h-100'>
            <Card.Img variant="top" src={imageUrl}/>
            <Card.Body className='d-flex flex-column'>
                <Card.Title className='mt-auto'> {courseTitle} </Card.Title>
                <ButtonGroup className='text-center'>
                    <Button variant="info" href={pageUrl}>Подробнее</Button>
                    {((userRole?.toString() == '2') || (userRole?.toString() == '3')) && 
                        <Button variant="warning" onClick={deleteRestoreCourse}>Удалить</Button>
                    }
                    <Button variant="success">Запись</Button>
                </ButtonGroup>
            </Card.Body>
        </Card>
    )
}

export default CourseCard;
