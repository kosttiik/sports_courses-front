import {FC, useEffect} from 'react'
import './CoursesPage.css'

const CoursesPage: FC = () => {
    useEffect(() => {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString)
        const courseTitle = urlParams.get('course_title')

        console.log(courseTitle)
    }, []);

    return (
        <div>
            <form method="GET" action="course" name="search">
            <label htmlFor="course_title">Введите название:</label>
            <input type="text" id="course_title" name="course_title"/>
            <input type="submit" className="button" value="Поиск"></input>
            </form>
        </div>
    )
}

export default CoursesPage
