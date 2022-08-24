import React, { useEffect, useState } from "react";
import { FlatList, View } from "react-native";
import ContentLoadingIndicator from "../../components/ContentLoadingIndicator";
import QuoteCard from "../../components/QuoteCard";
import Constants from "../../Constants";


export default function Random() {

    const [nextPage, setNextPage] = useState(1);
    const [randomQuotes, setRandomQuotes] = useState([]);
    const [isFetching, setIsFetching] = useState(false);


    useEffect(() => {
        if (!isFetching) {
            try {
                setIsFetching(true);
                (async function () {
                    let quotes = [];
                    for (let i = 0; i < 5; i++) {
                        let quote = await fetch(Constants.BASE_URL + '/random').then((r) => r.json());
                        quotes.push(quote);
                    }
                    setRandomQuotes([...randomQuotes, ...quotes]);
                })();
            } catch (e) {
                console.log(e);
            } finally {
                setIsFetching(false);
            }
        }
    }, [nextPage]);


    if (!randomQuotes.length)
        return <ContentLoadingIndicator />


    return (
        <View>
            <FlatList
                data={randomQuotes}
                renderItem={({ item }) => <QuoteCard quote={item} />}
                ListFooterComponent={<ContentLoadingIndicator />}
                onEndReachedThreshold={0.8}
                onEndReached={() => {
                    if (!isFetching)
                        setNextPage(nextPage + 1)
                }} />
        </View>
    );
}