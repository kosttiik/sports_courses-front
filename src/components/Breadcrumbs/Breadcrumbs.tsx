import Breadcrumb from 'react-bootstrap/Breadcrumb'

import './Breadcrumbs.css'

function Breadcrumbs() {

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString)
    const course_title = urlParams.get('course_title')
    const title_pattern = urlParams.get('title_pattern')

    return (
        <Breadcrumb>
            <Breadcrumb.Item href="/sports_courses-front/">Домашняя страница</Breadcrumb.Item>
            {(course_title != null && title_pattern === null) && 
                <>
                    <Breadcrumb.Item active>Курс</Breadcrumb.Item>
                    <Breadcrumb.Item href = {window.location.search}>{course_title}</Breadcrumb.Item>
                </>
            }
            {(title_pattern != null && course_title === null) &&
                <>
                    <Breadcrumb.Item active>Поиск</Breadcrumb.Item>
                    <Breadcrumb.Item href = {window.location.search}>{title_pattern}</Breadcrumb.Item>
                </>
            }
        </Breadcrumb>
    )
}

export default Breadcrumbs
