import { Course } from './ds'

export const getCourseByName = async  (courseName = ''): Promise<Course> => {
    return fetch('/api/course/' + String(courseName),{
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
        .then((response) => response.json());
}
