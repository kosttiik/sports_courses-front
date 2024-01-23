import { Group } from './ds'

export const getGroups = async (titlePattern = '') : Promise<Group[]> => {
    return fetch('/api/groups?title_pattern=' + String(titlePattern))
        .then((response) => response.json())
        .catch(() => ([
            {
                "ID": 1,
                "Title": "Группа №1",
                "Course": "Отсутствует",
                "Schedule": "Отсутствует",
                "Location": "Отсутствует",
                "Status": "Действует",
                "CoachName": "Отсутствует",
                "CoachPhone": "Отсутствует",
                "CoachEmail": "Отсутствует",
                "Capacity": 0,
                "Enrolled": 0,
                "Description": "Группы не существует. Отсутствует связь с сервером.",
                "ImageName": ""
            },
            {
                "ID": 2,
                "Title": "Группа №2",
                "Course": "Отсутствует",
                "Schedule": "Отсутствует",
                "Location": "Отсутствует",
                "Status": "Действует",
                "CoachName": "Отсутствует",
                "CoachPhone": "Отсутствует",
                "CoachEmail": "Отсутствует",
                "Capacity": 0,
                "Enrolled": 0,
                "Description": "Группы не существует. Отсутствует связь с сервером.",
                "ImageName": ""
            },
            {
                "ID": 3,
                "Title": "Группа №3",
                "Course": "Отсутствует",
                "Schedule": "Отсутствует",
                "Location": "Отсутствует",
                "Status": "Действует",
                "CoachName": "Отсутствует",
                "CoachPhone": "Отсутствует",
                "CoachEmail": "Отсутствует",
                "Capacity": 0,
                "Enrolled": 0,
                "Description": "Группы не существует. Отсутствует связь с сервером.",
                "ImageName": ""
            },
        ]));
}
