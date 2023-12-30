import axios from 'axios'

import { Enrollment } from './ds'

export const getEnrollments = async (userToken = '', status = ''): Promise<Enrollment[]> => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + userToken,
        },
    }
    return axios.get(
        `/api/enrollments?status=` + status,
        config,
    )
    .then((response) => {
        const { data } = response

        return data
    })
}
