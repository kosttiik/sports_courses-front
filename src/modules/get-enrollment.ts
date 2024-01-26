import {Enrollment} from './ds'
import axios from 'axios'

export const getEnrollment = async  (id = 1): Promise<Enrollment> => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    }

    return axios.get(
        '/api/enrollment?enrollment_id=' + String(id),
        config)
        .then((response) => response.data);
}
