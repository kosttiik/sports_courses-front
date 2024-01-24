import { Group } from './ds'

export const getGroupByName = async  (groupTitle = ''): Promise<Group> => {
    return fetch('/api/group/' + String(groupTitle),{
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
        .then((response) => response.json())
        .catch(() => (
            {
                "ID": 1,
                "Title": "Отсуствует",
                "Course": "Отсутствует",
                "Schedule": "Отсутствует",
                "Location": "Отсутствует",
                "Status": "Действует",
                "CoachName": "Отсутствует",
                "CoachPhone": "Отсутствует",
                "CoachEmail": "Отсутствует",
                "Capacity": 0,
                "Enrolled": 0,
                "Description": "Группы не существует. Отсутствует связь с сервером.",
                "ImageName": ""
            }))
}
