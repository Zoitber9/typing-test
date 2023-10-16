import { configureStore } from '@reduxjs/toolkit';

import testReducer from './testSlice';
import textSlice from "./textSlice.ts";
import timerSlice from "./timerSlice.ts";


const store = configureStore({
    reducer: {
        testSlice: testReducer,
        textSlice,
        timerSlice
    },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
