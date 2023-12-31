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
    ImageName: string
}

export interface User {
    UUID: string,
    Role: number,
    Name: string,
    Pass: string
}

export interface Enrollment {
    ID: number,
    Status: string,
    DateCreated: string,
    DateProcessed: string,
    DateFinished: string,
    StartDate: string,
    EndDate: string,
    ModeratorRefer: string,
    UserRefer: string,
    Moderator: User,
    User: User
}
