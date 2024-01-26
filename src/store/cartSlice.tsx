import { createSlice } from "@reduxjs/toolkit"

const groups = localStorage.getItem('groups')
    ? localStorage.getItem('groups')?.split(',')
    : [];
const draftID = localStorage.getItem('draftID')
    ? localStorage.getItem('draftID')
    : '';
const initialState = {
    groups,
    draftID,
    enrolled: false
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers:{
        addGroup(state, {payload}) {
            if (state.groups == null) {
                state.groups = []
            }

            if (state.groups.indexOf(payload.toString()) === -1) {
                state.groups.push(payload.toString())
                localStorage.setItem('groups', state.groups.toString())
            }
            state.enrolled = true 
        },
        removeGroup(state, {payload}) {
            if (state.groups == null) {
                state.groups = []
            }

            if (state.groups.length == 0) {
                return
            }
            
            const groupIndex = state.groups.indexOf(payload.toString())
            if (groupIndex > -1) {
                state.groups.splice(groupIndex, 1)
                localStorage.setItem('groups', state.groups.toString())
            }
        },
        setDraftID(state, {payload}) {
            state.draftID = payload,
            localStorage.setItem('draftID', payload)
        },
        disableEnrolled(state) {
            state.enrolled = false
        }
    }
})

export default cartSlice
