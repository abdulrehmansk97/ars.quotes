import React from "react";
import { FlatList, Text, View } from "react-native";
import ContentLoadingIndicator from "../../components/ContentLoadingIndicator";
import ListItemSeparator from "../../components/ListItemSeparator";
import TagsListItem from "../../components/TagsListItem";
import { useGetTagsQuery } from "../../redux/slices/apiSlice";


export default function TagsList({ navigation }) {


    const {
        data: tags,
        isLoading,
    } = useGetTagsQuery();


    if (isLoading) {
        return <ContentLoadingIndicator />;
    }

    return (
        <FlatList
            data={tags}
            renderItem={({ item }) => <TagsListItem tag={item} navigation={navigation} />}
            ItemSeparatorComponent={() => <ListItemSeparator />} />
    );
}