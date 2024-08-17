import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';


import processReducer from './process/processSlice';
import templateReducer from './template/templateSlice';
export function makeStore() {
    return configureStore({
        reducer: {
            process: processReducer,
            template: templateReducer,
        },
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware({
                serializableCheck: false,
            }),
    })
}

export const store = makeStore()

export type AppState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    AppState,
    unknown,
    Action<string>
>  