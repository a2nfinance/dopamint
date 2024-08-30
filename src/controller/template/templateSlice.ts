import { createSlice, PayloadAction } from '@reduxjs/toolkit';


export type TemplateState = {
    templates: any[],
    template: any
}


const initialTemplateState: TemplateState = {
    templates: [],
    template: null
}

export const templateSlice = createSlice({
    name: 'template',
    initialState: initialTemplateState,
    reducers: {
        setTemplateList: (state: TemplateState, action: PayloadAction<any[]>) => {
            state.templates = action.payload
        },
        setTemplate: (state: TemplateState, action: PayloadAction<any>) => {
            state.template = action.payload
        },
    }
})
export const { setTemplateList, setTemplate } = templateSlice.actions;
export default templateSlice.reducer;