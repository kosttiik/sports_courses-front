import Breadcrumb from 'react-bootstrap/Breadcrumb'

import './Breadcrumbs.css'

function Breadcrumbs() {

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString)
    const group_title = urlParams.get('group_title')
    const title_pattern = urlParams.get('title_pattern')

    return (
        <Breadcrumb>
            <Breadcrumb.Item href="/sports_courses-front/">Домашняя страница</Breadcrumb.Item>
            {window.location.pathname == '/sports_courses-front/auth' &&
                <Breadcrumb.Item>Вход</Breadcrumb.Item>
            }
            {window.location.pathname == '/sports_courses-front/account' &&
                <Breadcrumb.Item>Аккаунт</Breadcrumb.Item>
            }
            {window.location.pathname == '/sports_courses-front/flights' &&
                <Breadcrumb.Item>Записи</Breadcrumb.Item>
            }
            {(group_title != null && title_pattern === null) && 
                <>
                    <Breadcrumb.Item active>Группа</Breadcrumb.Item>
                    <Breadcrumb.Item href = {window.location.search}>{group_title}</Breadcrumb.Item>
                </>
            }
            {(title_pattern != null && group_title === null) &&
                <>
                    <Breadcrumb.Item active>Поиск</Breadcrumb.Item>
                    <Breadcrumb.Item href = {window.location.search}>{title_pattern}</Breadcrumb.Item>
                </>
            }
            {window.location.pathname == '/sports_courses-front/enroll' &&
                <Breadcrumb.Item>Запись</Breadcrumb.Item>
            }
        </Breadcrumb>
    )
}

export default Breadcrumbs
