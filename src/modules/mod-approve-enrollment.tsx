import axios, { AxiosResponse } from 'axios'

export const modApproveEnrollment = async(userToken: string, enrollment_id : number, confirm: string): Promise<AxiosResponse> => {
  const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + userToken,
      },
    }
  return axios.put(
    '/api/enrollment/moderator_confirm/' + String(enrollment_id) + "?confirm=" + confirm,
    {},
    config
  )
  .then((response) => response)
}
