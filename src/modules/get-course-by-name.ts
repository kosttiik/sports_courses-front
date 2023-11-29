import { Course } from './ds'

export const getCourseByName = async  (courseName = ''): Promise<Course> => {
    return fetch('/api/course/' + String(courseName),{
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
                "Location": "Отсутствует",
                "Status": "Действует",
                "CoachName": "Отсутствует",
                "CoachPhone": "Отсутствует",
                "CoachEmail": "Отсутствует",
                "Capacity": 0,
                "Enrolled": 0,
                "Description": "Курса не существует. Отсутствует связь с сервером.",
                "Image": ""
            }))
}
