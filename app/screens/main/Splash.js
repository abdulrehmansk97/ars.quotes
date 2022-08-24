/**
 * This is the first screen user lands after tapping on app icon.
 * For now it performs basic internet check and waits for 2 seconds
 * to navigate to either Home Screen or Starred screen based on internet connectivity.
 */

import React, { useEffect } from "react";

import { StyleSheet, Text, View } from "react-native";

import NetInfo from "@react-native-community/netinfo";

import { useSelector } from "react-redux";
import { selectColors } from "../../redux/slices/themeSlice";


export default function Splash({ navigation }) {

    useEffect(() => {
        setTimeout(() => {
            NetInfo.fetch().then(state => {
                navigation.replace(state.isConnected ? 'Home' : 'Starred');
            });
        }, 2000);
    }, []);

    const themeColors = useSelector(selectColors);

    return (
        <View
            style={styles(themeColors).splash_screen_container}>
            <Text
                style={styles(themeColors).splash_screen_title}>
                Quotes
            </Text>
        </View>
    );
}


const styles = (colors) => (StyleSheet.create({
    splash_screen_container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    splash_screen_title: {
        color: colors.text,
        fontSize: 40,
    }
}));