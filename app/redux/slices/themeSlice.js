import { createSlice } from "@reduxjs/toolkit";
import { Colors } from "../../Colors";


export const themeSlice = createSlice({
    name: 'theme',
    initialState: {
        dark: true,
        colors: { ...Colors.dark_colors, ...Colors.common },
    },
    reducers: {
        setTheme: (state, action) => action.payload,
    }
});


export const { setTheme } = themeSlice.actions;

export const selectTheme = state => state.theme;
export const selectColors = state => state.theme.colors;
export const selectIsDark = state => state.theme.dark;

export default themeSlice.reducer;