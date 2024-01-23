import {Enrollment} from './ds'
import axios from 'axios'

export const editEnrollment = async(userToken = '', enrollment: Enrollment): Promise<string> => {
    const config = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + userToken,
        },
    }
    return axios.put(
        '/api/enrollment/edit',
        {
          'dateCreated': enrollment.DateCreated,
          'dateFinished': enrollment.DateFinished,
          'dateProcessed': enrollment.DateProcessed,
        },
        config
    )
    .then((response) => response.data)
}
