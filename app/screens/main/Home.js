/**
 * This is the home screen or main screen of the app.
 * It sets up bottom tab navigator for following screens
 * Random Quotes Feed
 * Browse tags
 * Browse authors
 */

import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import React from "react";
import Random from "../home/Random";
import Tags from "../home/Tags";
import Authors from "../home/Authors";
import Icon from 'react-native-vector-icons/Feather';
import { useSelector } from "react-redux";
import { selectColors } from "../../redux/slices/themeSlice";


const Tab = createMaterialBottomTabNavigator();


export default function Home() {

    const colors = useSelector(selectColors);

    return (
        <Tab.Navigator
            activeColor={colors.primary}
            inactiveColor={colors.inactive_tab}
            barStyle={{
                backgroundColor: colors.card,
            }}
            screenOptions={({ route }) => {
                return {
                    tabBarIcon: ({ focused }) => {
                        let iconName;
                        switch (route.name) {
                            case 'Random':
                                iconName = 'clipboard';
                                break;
                            case 'Tags':
                                iconName = 'tag';
                                break;
                            case 'Authors':
                                iconName = 'user';
                                break;
                        }
                        return (
                            <Icon
                                name={iconName}
                                size={24}
                                color={focused ? colors.primary : colors.inactive_tab} />);
                    },
                }
            }}>
            <Tab.Screen
                name="Random"
                component={Random} />
            <Tab.Screen
                name="Tags"
                component={Tags} />
            <Tab.Screen
                name="Authors"
                component={Authors} />
        </Tab.Navigator>
    );
}