import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import AuthorsList from "../authors/AuthorsList";


const Stack = createNativeStackNavigator();


export default function Authors() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}>
            <Stack.Screen
                name="AuthorsList"
                component={AuthorsList} />
        </Stack.Navigator>
    );
}