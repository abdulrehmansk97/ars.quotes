import React from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";


export default function ContentLoadingIndicator() {
    return (
        <View style={styles.loading_indicator}>
            <ActivityIndicator size={'large'} />
        </View>
    );
}


const styles = StyleSheet.create({
    loading_indicator: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
});