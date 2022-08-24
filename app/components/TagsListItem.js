import React from "react";
import { Pressable, StyleSheet, Text } from "react-native";
import { useSelector } from "react-redux";

import { selectColors } from "../redux/slices/themeSlice";


export default function TagsListItem({ tag, navigation }) {

    const themeColors = useSelector(selectColors);

    return (
        <Pressable
            style={styles(themeColors).item_container}
            android_ripple={{
                color: themeColors.notification,
            }}
            onPress={() => {
                if (!tag.quoteCount)
                    return;
                navigation.navigate('Quotes', { param: 'tags', value: tag.name });
            }}>
            <Text style={styles(themeColors).item_title}>
                {`#${tag.name}`}
            </Text>
            <Text style={styles(themeColors).item_sub_title}>
                {`(${tag.quoteCount}) quotes`}
            </Text>
        </Pressable>
    );
}

const styles = (colors) => (StyleSheet.create({
    item_container: {
        padding: 16,
    },
    item_title: {
        fontSize: 28,
        fontStyle: 'italic',
        color: colors.primary,
    },
    item_sub_title: {
        color: colors.text,
    }
}));