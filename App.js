/**
 * Entry point of the app.
 * 
 * This file configures redux store and persistor for the app
 * and also sets up base navigator with the following screens
 * 
 * Splash Screen
 * Home Screen
 * Quotes Screen
 * Starred Screen
 * Search Screen.
 */

import 'react-native-gesture-handler';

import React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from '@react-navigation/stack';

import Splash from "./app/screens/main/Splash"
import Home from "./app/screens/main/Home";
import Quotes from "./app/screens/main/Quotes";
import Search from './app/screens/main/Search';
import Starred from './app/screens/main/Starred';
import Settings from './app/screens/main/Settings';

import { useSelector } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { selectTheme } from './app/redux/slices/themeSlice';
import { persistor } from './app/redux/store';

import Icon from 'react-native-vector-icons/Feather';

import ContentLoadingIndicator from './app/components/ContentLoadingIndicator';
import SearchHeader from './app/components/SearchHeader';
import HeaderRight from './app/components/HeaderRight';



const Stack = createStackNavigator();


const App = () => {

  const theme = useSelector(selectTheme);

  return (
    <PersistGate loading={<ContentLoadingIndicator />} persistor={persistor}>
      <NavigationContainer theme={theme}>
        <Stack.Navigator
          screenOptions={({ navigation }) => ({
            headerTitleAlign: 'center',
            headerRight: () => <HeaderRight navigation={navigation} />
          })}>
          <Stack.Screen
            name="Splash"
            component={Splash}
            options={{
              headerShown: false,
            }} />
          <Stack.Screen
            name="Home"
            component={Home}
            options={{
              title: 'Quotes',
            }} />
          <Stack.Screen
            name="Quotes"
            component={Quotes}
            options={({ navigation }) => ({
              headerLeft: () => (
                <Icon
                  name='home'
                  size={23}
                  color={theme.colors.primary}
                  style={{ padding: 16 }}
                  onPress={() => navigation.popToTop()}
                />
              )
            })} />
          <Stack.Screen
            name="Starred"
            component={Starred} />
          <Stack.Screen
            name='Search'
            component={Search}
            options={() => ({
              header: () => <SearchHeader />
            })} />
          <Stack.Screen
            name='Settings'
            component={Settings} />
        </Stack.Navigator>
      </NavigationContainer>
    </PersistGate>
  );
}


export default App;