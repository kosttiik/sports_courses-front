import { Group } from "./ds"

import axios from "axios"

export const getEnrollmentGroups = async(enrollment_id = 0, userToken = ''): Promise<Group[]> => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + userToken,
        },
    }
    return axios.get(
        '/api/enrollment_groups/' +  String(enrollment_id),
        config)
        .then((response) => {
            const {data} = response
            return data
        })
}
