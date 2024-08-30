import { createSlice, PayloadAction } from '@reduxjs/toolkit';


export type PluginSettingState = {
    settings: any[],
}


const initialState: PluginSettingState = {
    settings: [],
}

export const pluginSettingSlice = createSlice({
    name: 'pluginSetting',
    initialState: initialState,
    reducers: {
        updatePluginSettingState: (state: PluginSettingState, action: PayloadAction<{key: any, value: any}>) => {
            state[action.payload.key] = action.payload.value
        }
    }
})
export const { updatePluginSettingState } = pluginSettingSlice.actions;
export default pluginSettingSlice.reducer;