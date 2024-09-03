import { createSlice, PayloadAction } from '@reduxjs/toolkit';


export type UserState = {
    isContentCreator: boolean,
    user: any,
    appliedRules: any,
    creatorId: any
}


const initialUserState: UserState = {
    isContentCreator: false,
    user: {},
    appliedRules: [],
    creatorId: ""
}

export const userSlice = createSlice({
    name: 'user',
    initialState: initialUserState,
    reducers: {
        updateUserState: (state: UserState, action: PayloadAction<{key: any, value: any}[]>) => {
            for(let i = 0; i < action.payload.length; i++) {
                state[action.payload[i].key] = action.payload[i].value
            }
           
        }
    }
})
export const { updateUserState } = userSlice.actions;
export default userSlice.reducer;