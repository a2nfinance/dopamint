import { createSlice, PayloadAction } from '@reduxjs/toolkit';


export type AssetRuleState = {
    rules: any[],
}


const initialState: AssetRuleState = {
    rules: [],
}

export const assetRuleSlice = createSlice({
    name: 'assetRule',
    initialState: initialState,
    reducers: {
        updateAssetRuleState: (state: AssetRuleState, action: PayloadAction<{key: any, value: any}>) => {
            state[action.payload.key] = action.payload.value
        }
    }
})
export const { updateAssetRuleState } = assetRuleSlice.actions;
export default assetRuleSlice.reducer;