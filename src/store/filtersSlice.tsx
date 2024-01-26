import { createSlice } from "@reduxjs/toolkit"

const groupTitle = localStorage.getItem('groupTitle')
    ? localStorage.getItem('groupTitle')
    : ''

const groupCourse = localStorage.getItem('groupCourse')
    ? localStorage.getItem('groupCourse')
    : ''

const groupSchedule = localStorage.getItem('groupSchedule')
    ? localStorage.getItem('groupSchedule')
    : ''

const enrollmentStatus = localStorage.getItem('enrollmentStatus')
    ? localStorage.getItem('enrollmentStatus')
    : ''

const startDate = localStorage.getItem('startDate')
    ? localStorage.getItem('startDate')
    : ''

const endDate = localStorage.getItem('endDate')
    ? localStorage.getItem('endDate')
    : ''

const enrollmentCreator = localStorage.getItem('enrollmentCreator')
    ? localStorage.getItem('enrollmentCreator')
    : ''

const initialState = {
    groupTitle,
    groupCourse,
    groupSchedule,
    enrollmentStatus,
    startDate,
    endDate,
    enrollmentCreator
}

const filtersSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        setGroupTitle(state, {payload}) {
            state.groupTitle = payload
            localStorage.setItem('groupTitle', payload)
        },
        setGroupCourse(state, {payload}) {
            state.groupCourse = payload
            localStorage.setItem('groupCourse', payload)
        },
        setGroupSchedule(state, {payload}) {
            state.groupSchedule = payload
            localStorage.setItem('groupSchedule', payload)
        },
        setEnrollmentStatus(state, {payload}) {
            state.enrollmentStatus = payload
            localStorage.setItem('enrollmentStatus', payload)
        },
        setStartDate(state, {payload}) {
            state.startDate = payload
            localStorage.setItem('startDate', payload)
        },
        setEndDate(state, {payload}) {
            state.endDate = payload
            localStorage.setItem('endDate', payload)
        },
        setEnrollmentCreator(state, {payload}) {
            state.enrollmentCreator = payload
            localStorage.setItem('enrollmentCreator', payload)
        }
    }
})

export default filtersSlice
