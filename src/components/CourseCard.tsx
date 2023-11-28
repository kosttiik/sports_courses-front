import {FC} from 'react'
import {Button, Card} from 'react-bootstrap'
import './CourseCard.css'

interface Props {
    imageUrl: string
    courseTitle: string
    pageUrl: string
}


const CourseCard: FC<Props> = ({ imageUrl, courseTitle, pageUrl }) => {

    const deleteRestoreCourse = async () => {
        await fetch('/api/course/delete_restore/' + courseTitle, {
            method: 'PUT'
        });
        window.location.replace('/')
    } 

    return (
        <Card>
            <Card.Img className="card-img-top" variant="top" src={imageUrl}/>
            <Card.Body>
                <div className='textStyle'>
                    <Card.Title> {courseTitle} </Card.Title>
                </div>
            </Card.Body>
            <Card.Footer>
                <div className="btn-wrapper text-center d-flex justify-content-between">
                    <Button variant="secondary" href={pageUrl}>Подробнее</Button>
                    <Button variant="warning" onClick={deleteRestoreCourse}>Изменить статус</Button>
                </div>
            </Card.Footer>
        </Card>
    )
}

export default CourseCard;
