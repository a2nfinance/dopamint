import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';

import assetReducer from './assetrule/assetRuleSlice';
import imageReducer from './image/imageSlice';
import pluginReducer from './plugin/pluginSlice';
import pointRuleReducer from './pointRule/pointRuleSlice';
import processReducer from './process/processSlice';
import streakRuleReducer from './streakRule/streakRuleSlice';
import templateReducer from './template/templateSlice';
import userReducer from './user/userSlice';
export function makeStore() {
    return configureStore({
        reducer: {
            process: processReducer,
            template: templateReducer,
            user: userReducer,
            pointRule: pointRuleReducer,
            streakRule: streakRuleReducer,
            asset: assetReducer,
            plugin: pluginReducer,
            image: imageReducer
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