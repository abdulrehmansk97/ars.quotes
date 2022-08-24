/* 

This screen shows quotes filtered by
Specific tags or authors.

*/

import { useFocusEffect } from "@react-navigation/native";
import React, { useCallback, useEffect, useState } from "react";
import { BackHandler, FlatList, Text } from "react-native";
import ContentLoadingIndicator from "../../components/ContentLoadingIndicator";
import QuoteCard from "../../components/QuoteCard";
import { useGetQuotesQuery } from "../../redux/slices/apiSlice";


export default function Quotes({ route, navigation }) {

    const { param, value } = route.params;

    const [quotes, setQuotes] = useState([]);
    const [nextPage, setNextPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    const {
        data: _quotes,
        isFetching,
        isLoading,
    } = useGetQuotesQuery({
        param: param,
        value: value,
        page: nextPage,
    });

    let backConfigured = false;

    useFocusEffect(useCallback(() => {
        if (!backConfigured) {
            const hardwareBackHandler = () => {
                navigation.popToTop();
                return true;
            }

            BackHandler.addEventListener('hardwareBackPress', hardwareBackHandler);
            backConfigured = true;

            return () => {
                BackHandler.removeEventListener('hardwareBackPress', hardwareBackHandler);
                backConfigured = false;
            }
        }
    }, [backConfigured]));


    useEffect(() => {
        if (_quotes) {
            if (!totalPages)
                setTotalPages(_quotes.totalPages);
            setQuotes([...quotes, ..._quotes.results]);
        }
    }, [_quotes]);


    if (isLoading)
        return <ContentLoadingIndicator />


    return (
        <FlatList
            data={quotes}
            renderItem={({ item }) => <QuoteCard quote={item} value={value} />}
            ListFooterComponent={nextPage < totalPages ? <ContentLoadingIndicator /> : null}
            onEndReachedThreshold={0.8}
            onEndReached={() => {
                if (!isFetching && nextPage < totalPages)
                    setNextPage(nextPage + 1)
            }} />
    )
}