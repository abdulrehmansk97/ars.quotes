import React, { useEffect, useState } from "react";
import { FlatList, Text, View } from "react-native";
import AuthorsListItem from "../../components/AuthorsListItem";
import ContentLoadingIndicator from "../../components/ContentLoadingIndicator";
import ListItemSeparator from "../../components/ListItemSeparator";
import { useGetAuthorsQuery } from "../../redux/slices/apiSlice";


export default function AuthorsList({ navigation }) {


    const [authorsList, setAuthorsList] = useState([]);
    const [nextPage, setNextPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);


    const {
        data: authors,
        isFetching,
        isLoading,
    } = useGetAuthorsQuery(nextPage);

    useEffect(() => {
        if (authors) {
            if (!totalPages)
                setTotalPages(authors.totalPages);
            setAuthorsList([...authorsList, ...authors.results]);
        }
    }, [authors]);

    if (isLoading)
        return <ContentLoadingIndicator />;



    return (
        <FlatList
            data={authorsList}
            renderItem={({ item }) => <AuthorsListItem author={item} navigation={navigation} />}
            ItemSeparatorComponent={() => <ListItemSeparator />}
            ListFooterComponent={nextPage < totalPages ? <ContentLoadingIndicator /> : null}
            onEndReachedThreshold={0.8}
            onEndReached={() => {
                if (!isFetching && nextPage < totalPages)
                    setNextPage(nextPage + 1);
            }} />
    );
}