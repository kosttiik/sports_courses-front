import {Enrollment} from './ds'

export const getEnrollment = async  (id = 1): Promise<Enrollment> => {
    return fetch('/api/enrollment?enrollment_id=' + String(id),{
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
        .then((response) => response.json());
}
