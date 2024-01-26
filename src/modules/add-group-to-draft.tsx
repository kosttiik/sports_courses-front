import axios, { AxiosResponse } from 'axios'

export const addGroupToDraft = async(userToken = '', group_id : number): Promise<AxiosResponse> => {
  const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + userToken,
      },
    }
  return axios.post(
    '/api/group/add_to_enrollment/' + String(group_id),
    {},
    config

  )
  .then((response) => response)
}
