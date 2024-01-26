export interface Group {
    ID: number,
    Course: string,
    Title: string,
    Schedule: string,
    Status: string,
    Description: string,
    CoachName: string,
    CoachPhone: string,
    CoachEmail: string,
    Capacity: number,
    Enrolled: number,
    ImageName: string
}

export interface User {
    UUID: string,
    Role: number,
    name: string,
    Pass: string
}

export interface Enrollment {
    ID: number,
    Status: string,
    DateCreated?: string,
    DateProcessed?: string,
    DateFinished?: string,
    ModeratorRefer?: string,
    UserRefer?: string,
    Moderator?: User,
    User?: User
}
