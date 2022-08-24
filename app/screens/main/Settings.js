/**
 * This is the settings or user preferences screen.
 * It provides toggles for different available customisations
 * (Currently only theme toggle availabe (Dark/Light))
 * and stores those preferences in redux store which then persists it.
 */

import { useFocusEffect } from "@react-navigation/native";
import React, { useCallback } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Colors } from "../../Colors";
import { selectColors, selectIsDark, selectTheme, setTheme } from "../../redux/slices/themeSlice";
import Icon from 'react-native-vector-icons/Feather';


export default function Settings({ navigation }) {

    useFocusEffect(useCallback(() => {
        navigation.setOptions({
            headerRight: null,
        });
    }, []));

    const isDark = useSelector(selectIsDark);

    const themeColors = useSelector(selectColors);

    const dispatch = useDispatch();

    return (
        <View style={styles(themeColors).dark_mode_container}>
            <Text style={styles(themeColors).dark_mode_title}>
                Dark Mode
            </Text>
            <Icon
                name={isDark ? 'toggle-right' : 'toggle-left'}
                size={35}
                color={isDark ? themeColors.primary : 'gray'}
                onPress={() => {
                    let colors = isDark ? Colors.light_colors : Colors.dark_colors;
                    let mTheme = {
                        dark: !isDark,
                        colors: {
                            ...colors,
                            ...Colors.common,
                        }
                    }
                    dispatch(setTheme(mTheme));
                }} />
        </View>
    );
}


const styles = (colors) => (StyleSheet.create({
    container: {

    },
    dark_mode_container: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        justifyContent: 'space-between',
        marginEnd: 16,
    },
    dark_mode_title: {
        fontSize: 20,
        color: colors.text,
    }
}));