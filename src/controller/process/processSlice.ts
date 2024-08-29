import {
    createSlice,
    PayloadAction
} from "@reduxjs/toolkit";

export const actionNames = {
    createTemplateAction: "createTemplateAction",
    loadMyTemplatesAction: "loadMyTemplatesAction",
    mintNFTAction: "mintNFTAction",
    addPluginDataAction: "addPluginDataAction",
    checkingUserFeaturesAction: "checkingUserFeaturesAction",
    loadAllRulesAction: "loadAllRulesAction"
    
}


type Processes = {
    [key: string]: boolean
}

const initialState: Processes = {
    mintNFTAction: false,
    addPluginDataAction: false,
    createTemplateAction: false,
    loadMyTemplatesAction: false,
    checkingUserFeaturesAction: false,
    loadAllRulesAction: false
}

export const processesSlice = createSlice({
    name: 'process',
    initialState,
    reducers: {
        updateActionStatus: (state, action: PayloadAction<{ actionName: string, value: boolean }>) => {
            state[action.payload.actionName] = action.payload.value;
        },
    }
})

export const { updateActionStatus } = processesSlice.actions;
export default processesSlice.reducer;