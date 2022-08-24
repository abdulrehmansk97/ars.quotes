import { createSlice } from "@reduxjs/toolkit";


export const searchSlice = createSlice({
    name: 'search',
    initialState: '',
    reducers: {
        setQuery: (state, action) => action.payload,
    }
});

export const { setQuery } = searchSlice.actions;

export const selectQuery = state => state.search;

export default searchSlice.reducer;