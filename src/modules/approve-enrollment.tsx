import axios, { AxiosResponse } from 'axios'

export const approveEnrollment = async(userToken: string, enrollment_id : number): Promise<AxiosResponse> => {
  const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + userToken,
      },
    }
  return axios.put(
    '/api/enrollment/user_confirm/' + String(enrollment_id),
    {},
    config

  )
  .then((response) => response)
}
