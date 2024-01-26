import axios, { AxiosResponse } from 'axios';

export const removeGroupFromEnrollment = async(userToken: string, group_id : number, enrollment_id: number): Promise<AxiosResponse> => {
  const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + userToken,
      },
    }
  return axios.delete(
    '/api/enrollment_to_group/delete?group_id=' + group_id + '&enrollment_id=' + enrollment_id,
    config

  )
  .then((response) => response)
}
