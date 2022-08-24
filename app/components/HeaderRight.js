import React from "react";
import { StyleSheet, View } from "react-native";
import Icon from 'react-native-vector-icons/Feather';
import { useSelector } from "react-redux";
import { selectColors } from "../redux/slices/themeSlice";


export default function HeaderRight({ navigation }) {

    const colors = useSelector(selectColors);

    return (
        <View style={styles.header_right_container}>
            <Icon
                name='search'
                size={23}
                color={colors.primary}
                style={styles.header_right_icons}
                onPress={() => navigation.navigate('Search')} />
            <Icon
                name='star'
                size={23}
                color={colors.primary}
                style={styles.header_right_icons}
                onPress={() => navigation.navigate('Starred')} />
            <Icon
                name='settings'
                size={23}
                color={colors.primary}
                onPress={() => navigation.navigate('Settings')} />
        </View>
    );
}


const styles = StyleSheet.create({
    header_right_container: {
        flexDirection: 'row',
        marginEnd: 16,
    },
    header_right_icons: {
        marginEnd: 16,
    }
});