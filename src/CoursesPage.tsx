import { FC, useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import './CoursesPage.css'

import { Course } from './modules/ds'
import { getCourses } from './modules/get-courses'
import CourseCard from './components/CourseCard'

import defaultImage from '../public/vite.svg'

const CoursesPage: FC = () => {

    const [courses, setCourses] = useState<Course[]>([])

    useEffect(() => {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString)
        var courseTitle = urlParams.get('title_pattern')
        if (courseTitle == null) {
            courseTitle = ""
        }

        const loadCourses = async()  => {
            const result = await getCourses(String(courseTitle))
            console.log(result)
            setCourses(result)
        }

        loadCourses()

    }, []);

    return (
        <div>
            <div>
                <form method="GET" action="" name="search">
                <input type="text" id="course_search" name="title_pattern"/>
                <input type="submit" className="button" value="Поиск"></input>
                </form>
            </div>

            <Row xs={5} md={5} className='g-5' >
                {courses.map((item, index) => (
                    <Col key={index}> 
                        <CourseCard {...{
                             imageUrl: (item.Image == '' ? defaultImage?.toString() : "data:image/jpg;base64, " + item.Image),
                             courseTitle: item.Title,
                             pageUrl: window.location.href.split('?')[0] + "course?course_title=" + item.Title
                        }}></CourseCard>
                    </Col>
                ))}
            </Row>
        </div>
    )
}

export default CoursesPage
