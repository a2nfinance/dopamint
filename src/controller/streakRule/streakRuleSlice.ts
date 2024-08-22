import { createSlice, PayloadAction } from '@reduxjs/toolkit';


export type StreakRuleState = {
    rules: any[],
}


const initialState: StreakRuleState = {
    rules: [],
}

export const streakRuleSlice = createSlice({
    name: 'streakRule',
    initialState: initialState,
    reducers: {
        updateStreakRuleState: (state: StreakRuleState, action: PayloadAction<{key: any, value: any}>) => {
            state[action.payload.key] = action.payload.value
        }
    }
})
export const { updateStreakRuleState } = streakRuleSlice.actions;
export default streakRuleSlice.reducer;