import axios from "axios";

export const enroll = async(groups: string[], userToken: string,
    dateFinished: string, dateCreated: string, dateProcessed: string): Promise<string> => {
    const config = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + userToken,
        },
      }
    return axios.put(
        '/api/enrollment/edit',
        {
          'dateCreated': dateCreated,
          'dateFinished': dateFinished,
          'dateProcessed': dateProcessed,
        },
        config

    )
    .then((response) => response.data);
}
