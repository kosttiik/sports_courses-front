export interface Course {
    ID: number,
    Title: string,
    Location: string,
    Status: string,
    CoachName: string,
    CoachPhone: string,
    CoachEmail: string,
    Capacity: number,
    Enrolled: number,
    Description: string,
    Image: string 
}

export const getCourseByName = async  (courseName = ''): Promise<Course> => {
    return fetch('/api/course/' + String(courseName),{
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
        .then((response) => response.json());
}
