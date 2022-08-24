import AsyncStorage from "@react-native-async-storage/async-storage";
import { combineReducers, configureStore, createStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import { apiSlice } from "./slices/apiSlice";
import starredReducer from './slices/starredSlice';
import searchReducer from './slices/searchSlice';
import themeReducer from './slices/themeSlice';



const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    blacklist: ['search']
}

const rootReducer = combineReducers({
    [apiSlice.reducerPath]: apiSlice.reducer,
    theme: themeReducer,
    starred: starredReducer,
    search: searchReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware({
        serializableCheck: false,
        immutableCheck: false,
    }).concat(apiSlice.middleware),
});

export const persistor = persistStore(store);