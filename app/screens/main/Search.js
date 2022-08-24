/**
 * This is search screen it shows a custom header with textInput for queries
 */

import React, { useCallback, useEffect, useState } from "react";

import { FlatList } from "react-native";

import { useSelector } from "react-redux";
import { useSearchQuotesQuery } from "../../redux/slices/apiSlice";
import { selectQuery } from "../../redux/slices/searchSlice";

import QuoteCard from '../../components/QuoteCard';
import ContentLoadingIndicator from "../../components/ContentLoadingIndicator";
import EmptySearchResult from "../../components/EmptySearchResult";



export default function Search() {

    const query = useSelector(selectQuery);

    const [searchResults, setSearchResults] = useState([]);
    const [nextPage, setNextPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);


    const {
        data: results,
        isFetching,
        isSuccess,
    } = useSearchQuotesQuery({ query: query, page: nextPage }, { skip: query === '' });


    useEffect(() => {
        setSearchResults([]);
        setNextPage(1);
        setTotalPages(0);
    }, [query]);


    useEffect(() => {
        if (results) {
            if (!totalPages) {
                setTotalPages(results.totalPages);
                setSearchResults(results.results);
            } else {
                setSearchResults([...searchResults, ...results.results]);
            }
        }
    }, [results]);



    if (isFetching && nextPage === 1) {
        return <ContentLoadingIndicator />
    } else if (isSuccess && results.results.length === 0) {
        return <EmptySearchResult />
    } else {
        return (
            <FlatList
                data={searchResults}
                ListFooterComponent={nextPage < totalPages ? <ContentLoadingIndicator /> : null}
                renderItem={({ item }) => <QuoteCard quote={item} />}
                onEndReachedThreshold={0.8}
                onEndReached={() => {
                    if (!isFetching && nextPage < totalPages) {
                        setNextPage(nextPage + 1);
                    }
                }} />
        );
    }
}