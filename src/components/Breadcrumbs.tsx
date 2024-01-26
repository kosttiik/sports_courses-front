import Breadcrumb from 'react-bootstrap/Breadcrumb'

import './Breadcrumbs.css'

function Breadcrumbs() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString)
    const group_title = urlParams.get('group_title')
    const name = urlParams.get('name')
    let enrollment_id = urlParams.get('enrollment_id')
    if (!enrollment_id) {
        enrollment_id = '-'
    }

    return (
        <Breadcrumb>
            {(window.location.pathname == "/sports_courses-front/"
            || window.location.pathname == "/sports_courses-front/mod_groups"
            || window.location.pathname == "/sports_courses-front/group"
            || window.location.pathname == "/sports_courses-front/group_edit") &&
                <Breadcrumb.Item href="/sports_courses-front/">Группы</Breadcrumb.Item>
            }
            {(window.location.pathname == "/sports_courses-front/group"
            || window.location.pathname == "/sports_courses-front/group_edit") &&
                <Breadcrumb.Item active>{group_title ? group_title : name}</Breadcrumb.Item>
            }

            {window.location.pathname == '/sports_courses-front/auth' &&
                <Breadcrumb.Item>Вход</Breadcrumb.Item>
            }
            {window.location.pathname == '/sports_courses-front/register' &&
                <Breadcrumb.Item>Регистрация</Breadcrumb.Item>
            }

            {window.location.pathname == '/sports_courses-front/account' &&
                <Breadcrumb.Item>Аккаунт</Breadcrumb.Item>
            }
            {(window.location.pathname == '/sports_courses-front/enrollments'
            || window.location.pathname == '/sports_courses-front/enrollment'
            || window.location.pathname == '/sports_courses-front/enrollment_edit') &&
                <Breadcrumb.Item href="/sports_courses-front/enrollments">Записи</Breadcrumb.Item>
            }
            {(window.location.pathname == '/sports_courses-front/enrollment'
            || window.location.pathname == '/sports_courses-front/enrollment_edit') &&
                <Breadcrumb.Item active>{parseInt(enrollment_id, 10) ? enrollment_id : '-'}</Breadcrumb.Item>
            }
            {window.location.pathname == '/sports_courses-front/enroll' &&
                <Breadcrumb.Item>Корзина</Breadcrumb.Item>
            }
        </Breadcrumb>
    )
}

export default Breadcrumbs
