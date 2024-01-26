import axios, { AxiosResponse } from "axios"

export const enroll = async(groups: string[], userToken: string, status: string): Promise<AxiosResponse> => {
    const config = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + userToken,
        },
      }
    return axios.put(
      '/api/enroll',
      {
        'groups': groups,
        'status': status,
      },
      config
    )
    .then((response) => response);
}
