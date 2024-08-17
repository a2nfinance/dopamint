import { createSlice, PayloadAction } from '@reduxjs/toolkit';


export type TemplateState = {
    templates: any[],
}


const initialTemplateState: TemplateState = {
    templates: [],
}

export const templateSlice = createSlice({
    name: 'template',
    initialState: initialTemplateState,
    reducers: {
        setTemplateList: (state: TemplateState, action: PayloadAction<any[]>) => {
            state.templates = action.payload
        }
    }
})
export const { setTemplateList } = templateSlice.actions;
export default templateSlice.reducer;