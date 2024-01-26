import axios, { AxiosResponse } from "axios";

export const sendImage = async (userToken = '', group_id: string, file: File): Promise<AxiosResponse> => {
    const formData = new FormData();
    formData.append('file', file)
    formData.append('Authorization', 'Bearer ' + userToken)

    return axios.post(
        `/api/group/add_image/` + group_id,
        formData
    )
    .then((response) => response.data)
}
