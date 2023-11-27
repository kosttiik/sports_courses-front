import {FC, useEffect, useState} from 'react'
import './CoursePage.css'
import {Course, getCourseByName } from './modules/get-course-by-name'

const CoursePage: FC = () => {

    const [course, setCourse] = useState<Course>()

    useEffect(() => {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString)
        const courseName = urlParams.get('course_title')
    
        const getCourse = async () => {
            const result = await getCourseByName(String(courseName))
            console.log(result)
            setCourse(result)
        }
    
        getCourse()

    }, []);
    
    return (
        <div>
            <img src={"data:image/jpg;base64, " + course?.Image} className="card_image" />
            <p>{course?.Description}</p>
            <p className="course_line"><b>Статус курса:</b> { course?.Status }</p>
            <p className="course_line"><b>Место:</b> { course?.Location }</p>
            <p className="course_line"><b>Количество мест:</b> { course?.Capacity } чел.</p>
            <p className="course_line"><b>Зарегистрировано:</b> { course?.Enrolled } чел.</p>
            <p className="course_line"><b>Курс проводит:</b> { course?.CoachName }</p>
            <p className="course_line"><b>E-Mail:</b> { course?.CoachEmail }</p>
            <p className="course_line"><b>Телефон:</b> { course?.CoachPhone }</p>
            <p className="course_line"><b>{ course?.Description }</b></p>
            <form method="POST" action="delete_course/{{ .Title }}" name="delete_course">
                <input type="hidden" name="card_title" id="card_title" value="{{ .Title }}" />
                <input type="submit" className="button page_button" value="Сменить статус" />
            </form>
            <a className="button page_button" href="..">Домой</a>
        </div>
    )
}

export default CoursePage
