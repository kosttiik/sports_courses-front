import { FC, useEffect, useState } from 'react'
import { Button, Card } from 'react-bootstrap'

import './CoursePage.css'

import { getCourseByName } from './modules/get-course-by-name'
import { Course } from './modules/ds'

import defaultImage from '/fitness.png'

const CoursePage: FC = () => {

    const [course, setCourse] = useState<Course>()

    useEffect(() => {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString)
        const courseTitle = urlParams.get('course_title')
    
        const loadCourse = async () => {
            const result = await getCourseByName(String(courseTitle))
            setCourse(result)
        }
    
        loadCourse()

    }, []);

    return (
        <div className='card_container'>
            <Card className='page_card'>
                <Card.Img src={(course?.Image == '' ? defaultImage?.toString() : "data:image/jpg;base64, " + course?.Image)} className="card-img-top" variant="top"/>
                <Card.Body>
                    <p><b>{ course?.Description }</b></p>
                    <p><b>Статус курса:</b> { course?.Status }</p>
                    <p><b>Место:</b> { course?.Location }</p>
                    <p><b>Количество мест:</b> { course?.Capacity } чел.</p>
                    <p><b>Зарегистрировано:</b> { course?.Enrolled } чел.</p>
                    <p><b>Курс проводит:</b> { course?.CoachName }</p>
                    <p><b>E-Mail:</b> { course?.CoachEmail }</p>
                    <p><b>Телефон:</b> { course?.CoachPhone }</p>
                </Card.Body>
                <Card.Footer>
                    <Button href="/sports_courses-front/">Домой</Button>
                </Card.Footer>
            </Card>
        </div>        
    )
}

export default CoursePage
