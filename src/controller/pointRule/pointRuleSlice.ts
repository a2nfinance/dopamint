import { createSlice, PayloadAction } from '@reduxjs/toolkit';


export type PointRuleState = {
    rules: any[],
}


const initialState: PointRuleState = {
    rules: [],
}

export const pointRuleSlice = createSlice({
    name: 'pointRule',
    initialState: initialState,
    reducers: {
        updatePointRuleState: (state: PointRuleState, action: PayloadAction<{key: any, value: any}>) => {
            state[action.payload.key] = action.payload.value
        }
    }
})
export const { updatePointRuleState } = pointRuleSlice.actions;
export default pointRuleSlice.reducer;