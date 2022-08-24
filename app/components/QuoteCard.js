import { useNavigation } from "@react-navigation/native";
import React, { useRef, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import Feather from 'react-native-vector-icons/Feather';
import { captureRef } from "react-native-view-shot";

import Share from 'react-native-share';
import { useDispatch, useSelector } from "react-redux";
import { starQuote, unStarQuote } from "../redux/slices/starredSlice";
import { selectColors } from '../redux/slices/themeSlice';

export default function QuoteCard({ quote, value }) {

    const isStarred = useSelector(state => state.starred.find(q => q._id === quote._id));

    const themeColors = useSelector(selectColors);

    const dispatch = useDispatch();

    const ref = useRef();

    const navigation = useNavigation();

    return (
        <View
            style={styles(themeColors).container}
            ref={ref}>
            <Text style={styles(themeColors).content}>
                {quote.content}
            </Text>
            <Text
                style={styles(themeColors).author}
                onPress={() => {
                    if (value === quote.author)
                        return;
                    navigation.push('Quotes', { param: 'author', value: quote.author });
                }}>
                {quote.author}
            </Text>
            <View style={styles(themeColors).bottom_container}>
                <View style={styles(themeColors).tags_container}>
                    {quote.tags.map((item, index) => (
                        <Text
                            key={index}
                            style={styles(themeColors).tags}
                            onPress={() => {
                                if (value === item)
                                    return
                                navigation.push('Quotes', { param: 'tags', value: item });
                            }}>
                            {`#${item} `}
                        </Text>
                    ))}
                </View>
                <View style={styles(themeColors).icons_container}>
                    <Icon
                        name={isStarred ? 'star' : 'star-o'}
                        size={30}
                        color={isStarred ? 'firebrick' : null}
                        style={{
                            paddingEnd: 16,
                        }}
                        onPress={() => {
                            if (!isStarred) {
                                dispatch(starQuote(quote));
                            } else {
                                dispatch(unStarQuote(quote._id));
                            }
                        }}
                    />
                    <Feather
                        name='send'
                        size={30}
                        color={themeColors.primary}
                        onPress={() => {
                            captureRef(ref, {
                                format: 'jpg',
                                quality: 1.0,
                            }).then((uri) => {
                                Share.open({
                                    url: uri,
                                    type: 'image/jpg'
                                }).then((res) => {
                                    //On succesfully shared
                                }).catch((err) => {
                                    //On failed.
                                });
                            });
                        }} />
                </View>
            </View>
        </View>
    );
}


const styles = (colors) => StyleSheet.create({
    container: {
        paddingTop: 16,
        padding: 8,
        backgroundColor: colors.quote_card_bg,
        margin: 8,
        borderRadius: 15,
        borderWidth: 1,
    },
    content: {
        color: colors.quote_card_content,
        fontSize: 28,
        padding: 8,
    },
    author: {
        backgroundColor: colors.qc_author_bg,
        alignSelf: 'flex-end',
        color: colors.qc_author_title,
        padding: 8,
        fontSize: 18,
        fontStyle: 'italic',
        marginTop: 8,
    },
    bottom_container: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 16
    },
    tags_container: {
        flexDirection: 'row',
        padding: 8,
        marginTop: 8,
        flexWrap: 'wrap',
        flex: 2,
    },
    tags: {
        fontStyle: 'italic',
        fontSize: 18,
        color: colors.qc_tags,
    },
    icons_container: {
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'flex-end'
    }
});