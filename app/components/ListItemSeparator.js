import React from "react";
import { View } from "react-native";
import { useSelector } from "react-redux";
import { selectColors, selectIsDark } from "../redux/slices/themeSlice";


export default function ListItemSeparator() {

    const isDark = useSelector(selectIsDark);
    const colors = useSelector(selectColors);

    return (
        <View
            style={{
                width: '100%',
                height: 1,
                backgroundColor: isDark ? colors.item_separator_dark : colors.notification,
            }} />
    );
}