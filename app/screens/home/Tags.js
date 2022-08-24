import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import TagsList from "../tags/TagsList";


const Stack = createNativeStackNavigator();


export default function Tags() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}>
            <Stack.Screen
                name="TagsList"
                component={TagsList} />
        </Stack.Navigator>
    );
}