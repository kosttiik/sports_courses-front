import { FC, useEffect, useState } from 'react'
import { Button, Card } from 'react-bootstrap'

import './GroupPage.css'

import { getGroupByName } from './modules/get-group'
import { Group } from './modules/ds'

const GroupPage: FC = () => {

    const [group, setGroup] = useState<Group>()

    useEffect(() => {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString)
        const groupTitle = urlParams.get('group_title')
    
        const loadGroup = async () => {
            const result = await getGroupByName(String(groupTitle))
            setGroup(result)
        }

        loadGroup()
    }, []);

    return (
        <div className='card_container'>
            <Card className='h-1'>
            <Card.Img src={(group?.ImageName == '' ? '/group_image/fitness.png' : "/group_image/" + group?.ImageName)} className="card_image" variant="top" />
                <Card.Body>
                    <Card.Text>
                        <p>Курс:<b> { group?.Course }</b></p>
                        <p>Время:<b> { group?.Schedule }</b></p>
                        <p><b>{ group?.Description }</b></p>
                        <p><b>Статус:</b> { group?.Status }</p>
                        <p><b>Место:</b> { group?.Location }</p>
                        <p><b>Количество мест:</b> { group?.Capacity } чел.</p>
                        <p><b>Зарегистрировано:</b> { group?.Enrolled } чел.</p>
                        <p><b>Преподаватель:</b> { group?.CoachName }</p>
                        <p><b>E-Mail преподавателя:</b> { group?.CoachEmail }</p>
                        <p><b>Телефон преподавателя:</b> { group?.CoachPhone }</p>
                    </Card.Text>
                </Card.Body>
                <Card.Footer>
                    <Button href="/sports_courses-front/">Домой</Button>
                </Card.Footer>
            </Card>
        </div>        
    )
}

export default GroupPage
