import { useNavigation, useTheme } from "@react-navigation/native";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/Feather";
import { useDispatch, useSelector } from "react-redux";
import { setQuery } from "../redux/slices/searchSlice";
import { selectColors } from "../redux/slices/themeSlice";


export default function SearchHeader() {

    const colors = useSelector(selectColors);

    const navigation = useNavigation();

    const [query, _setQuery] = useState('');

    const dispatch = useDispatch();


    return (
        <View style={styles(colors).search_header_container}>
            <Icon
                name="arrow-left"
                size={25}
                color={colors.primary}
                onPress={() => navigation.goBack()}
                style={{ marginStart: 4, }} />
            <TextInput
                value={query}
                onChangeText={(text) => _setQuery(text)}
                onSubmitEditing={() => {
                    let trimmedQuery = query.trim();
                    if (trimmedQuery)
                        dispatch(setQuery(trimmedQuery));
                }}
                placeholder="Search by keywords, tags, author"
                placeholderTextColor='lightgray'
                autoFocus={true}
                style={{
                    flex: 1,
                    color: colors.text,
                }} />
            <Icon
                name="delete"
                size={25}
                color={colors.primary}
                style={{
                    marginEnd: 8,
                }}
                onPress={() => _setQuery('')} />
        </View>
    );

}


const styles = (colors) => (StyleSheet.create({
    search_header_container: {
        backgroundColor: colors.card,
        paddingStart: 12,
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 15,
    }
}));