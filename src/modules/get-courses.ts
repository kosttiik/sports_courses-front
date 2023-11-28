import { Course } from './ds'

export const getCourses = async (titlePattern = '') : Promise<Course[]> => {
    return fetch('/api/courses?title_pattern=' + String(titlePattern))
        .then((response) => response.json())
        .catch(() => ({ resultCount: 0, results:[]}));
}
