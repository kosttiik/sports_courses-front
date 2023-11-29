import { Course } from './ds'

export const getCourses = async (titlePattern = '') : Promise<Course[]> => {
    return fetch('/api/courses?title_pattern=' + String(titlePattern))
        .then((response) => response.json())
        .catch(() => ([
            {
                "ID": 1,
                "Title": "Курс №1",
                "Location": "Отсутствует",
                "Status": "Действует",
                "CoachName": "Отсутствует",
                "CoachPhone": "Отсутствует",
                "CoachEmail": "Отсутствует",
                "Capacity": 0,
                "Enrolled": 0,
                "Description": "Курса не существует. Отсутствует связь с сервером.",
                "Image": ""
            },
            {
                "ID": 2,
                "Title": "Курс №2",
                "Location": "Отсутствует",
                "Status": "Действует",
                "CoachName": "Отсутствует",
                "CoachPhone": "Отсутствует",
                "CoachEmail": "Отсутствует",
                "Capacity": 0,
                "Enrolled": 0,
                "Description": "Курса не существует. Отсутствует связь с сервером.",
                "Image": ""
            },
            {
                "ID": 3,
                "Title": "Курс №3",
                "Location": "Отсутствует",
                "Status": "Действует",
                "CoachName": "Отсутствует",
                "CoachPhone": "Отсутствует",
                "CoachEmail": "Отсутствует",
                "Capacity": 0,
                "Enrolled": 0,
                "Description": "Курса не существует. Отсутствует связь с сервером.",
                "Image": ""
            },
        ]));
}
