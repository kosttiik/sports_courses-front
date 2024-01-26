import axios from 'axios';

export const editEnrollment = async(userToken = '', enrollment_id: number): Promise<string> => {
  const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + userToken,
      },
    }
  return axios.put(
    '/api/enrollment/edit',
    {
      enrollmentID: enrollment_id,
    },
    config
  )
  .then((response) => response.data);
}
