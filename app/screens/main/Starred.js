/**
 * This screen shows user saved/starred quotes from redux store.
 */

import { useFocusEffect } from "@react-navigation/native";
import React, { useCallback } from "react";
import { FlatList } from "react-native-gesture-handler";
import { useSelector } from "react-redux";
import QuoteCard from "../../components/QuoteCard";
import { selectAllStarred } from "../../redux/slices/starredSlice";


export default function Starred({ navigation }) {

    const starredQuotes = useSelector(selectAllStarred);


    useFocusEffect(useCallback(() => {
        navigation.setOptions({
            headerRight: () => null,
        });
    }, []))

    return (
        <FlatList
            data={starredQuotes}
            renderItem={({ item }) => (<QuoteCard quote={item} />)} />
    )
}