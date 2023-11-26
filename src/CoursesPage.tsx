import {FC, useState} from 'react'

import './CoursesPage.css'

const CoursesPage: FC = () => {
    const [searchValue, setSearchValue] = useState('')

    const [loading, setLoading] = useState(false)


    return (
        <h1>Hello, world!</h1>
    )
}

export default CoursesPage
