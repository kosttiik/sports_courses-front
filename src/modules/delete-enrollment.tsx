import axios, { AxiosResponse } from 'axios';

export const deleteEnrollment = async(userToken: string, enrollment_id : number): Promise<AxiosResponse> => {
  const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + userToken,
      },
    }
  return axios.delete(
    '/api/enrollment/delete/' + String(enrollment_id),
    config

  )
  .then((response) => response);
}
