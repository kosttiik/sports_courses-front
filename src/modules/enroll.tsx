import axios from "axios";

export const enroll = async(groups: string[], userToken: string): Promise<string> => {
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
        },
        config
    )
    .then((response) => response.data);
}
