import axios, { AxiosResponse } from "axios";

export const setEnrollmentGroups = async(enrollment_id = 0, group_names: string[], userToken='') : Promise<AxiosResponse> => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + userToken,
        },
    }
    return axios.put(
        '/api/enrollment/set_groups',
        {
            enrollmentID: enrollment_id,
            groups: group_names
        },
        config
    )
    .then((response) => response)
}
