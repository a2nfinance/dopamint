import { createSlice, PayloadAction } from '@reduxjs/toolkit';


export type ImageState = {
    images: any[],
    image: any
}


const initialState: ImageState = {
    images: [],
    image: null
}

export const imageSlice = createSlice({
    name: 'image',
    initialState: initialState,
    reducers: {
        updateImageState: (state: ImageState, action: PayloadAction<{key: any, value: any}>) => {
            state[action.payload.key] = action.payload.value
        }
    }
})
export const { updateImageState } = imageSlice.actions;
export default imageSlice.reducer;