import { Group } from './ds'
import axios, { AxiosResponse } from 'axios';

export const createGroup = async(userToken = '', group: Group): Promise<AxiosResponse> => {
  const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + userToken,
      },
    }
  return axios.post(
    '/api/group/add',
    {
        ID: group.ID,
        Course: group.Course,
        Title: group.Title,
        Schedule: group.Schedule,
        Status: group.Status,
        Description: group.Description,
        CoachName: group.CoachName,
        CoachPhone: group.CoachPhone,
        CoachEmail: group.CoachEmail,
        Capacity: group.Capacity,
        Enrolled: group.Enrolled,
        ImageName: group.ImageName,
    },
    config
  )
  .then((response) => response);
}
