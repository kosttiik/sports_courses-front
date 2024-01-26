import axios from 'axios'

import {Enrollment} from './ds'

export const getEnrollments = async (userToken = '', status = '', startDate = '', endDate = ''): Promise<Enrollment[]> => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + userToken,
        },
    }
    return axios.get(
        `/api/enrollments?status=` + status + '&startDate=' + startDate + '&endDate=' + endDate,
        config,
    )
    .then((response) => response.data) 
}
