import { createSlice } from "@reduxjs/toolkit";


export const starredSlice = createSlice({
    name: 'starred',
    initialState: [],
    reducers: {
        starQuote: (state, action) => {
            state.unshift(action.payload);
        },
        unStarQuote: (state, action) => {
            state.splice(state.findIndex(q => q._id === action.payload), 1)
        }
    }
});


export const { starQuote, unStarQuote } = starredSlice.actions;

export const selectAllStarred = state => state.starred;

export default starredSlice.reducer;