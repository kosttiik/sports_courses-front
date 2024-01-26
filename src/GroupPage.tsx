import { FC, useEffect, useState } from 'react'
import { Button, Card } from 'react-bootstrap'

import './GroupPage.css'
import defaultImage from './assets/empty-group.png'

import { getGroupByTitle } from './modules/get-group'
import { Group } from './modules/ds'

const GroupPage: FC = () => {
    const [group, setGroup] = useState<Group>()
    const [imageUrl, setImageUrl] = useState('sports_courses-front/src/assets/empty-group.png')

    useEffect(() => {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString)
        const groupTitle = urlParams.get('group_title')
    
        const loadGroup = async () => {
            const result = await getGroupByTitle(String(groupTitle))
            setGroup(result)

            if (result?.ImageName.toString()) {
                setImageUrl(result?.ImageName.toString())
            } else {
                setImageUrl(defaultImage?.toString())
            }
        }
        loadGroup()
    }, [])

    return (
        <div className='card_container'>
            <Card style={{width: '300px'}}>
                <Card.Img src={imageUrl} variant="top" />
                <Card.Body>
                    <p><b>Статус: {group?.Status}</b></p>
                    <p>Курс: {group?.Course}</p>
                    <p>Расписание: {group?.Schedule}</p>
                    <p>Количество участников: {group?.Capacity} чел.</p>
                    <p>Зарегистрировано: {group?.Enrolled} чел.</p>
                    <p>Преподаватель: {group?.CoachName}</p>
                    <p>Email преподавателя: {group?.CoachEmail}</p>
                    <p>Телефон преподавателя: {group?.CoachPhone}</p>
                    <p>{group?.Description}</p>
                </Card.Body>
                <Card.Footer>
                    <Button href="/sports_courses-front/">Домой</Button>
                </Card.Footer>
            </Card>
        </div>
    )
}

export default GroupPage
