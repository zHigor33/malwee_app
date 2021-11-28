import * as React from "react";
import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Entypo } from '@expo/vector-icons';

import PrivateRoute from './private.route';
import PublicRoute from './public.route';

import Map from '../compenets/Map';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function StackNav() {

    return (
        <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName="Public" >
            <Stack.Screen 
                name="Public"
                component={PublicRoute} 
                options={{
                    headerStyle: {
                        backgroundColor: '#549245',
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    }
                }}
            />
            <Stack.Screen 
                name="Private" 
                component={PrivateRoute} 
                options={{
                    headerStyle: {
                        backgroundColor: '#549245',
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    }
                }}
            />
        </Stack.Navigator>
    );
}

export default function Routes() {
    return (
        <Tab.Navigator
            tabBarOptions={{
                style: {
                    backgroundColor: "#549245",
                    borderTopColor: "transparent",
                },
                activeTintColor: "#fff",
                inactiveTintColor: "#DCDCDC",
                tabStyle: {
                    paddingBottom: 5,
                    paddingTop: 5,
                }
            }}
        >
            <Tab.Screen
                name="Mapa"
                component={Map}
                options={{
                    tabBarIcon: ({ size, color }) => (
                        <Entypo name="map" size={size} color={color} />
                    )
                }}
            />

            <Tab.Screen
                name="Início"
                component={StackNav}
                options={{
                    tabBarIcon: ({ size, color }) => (
                        <Entypo name="home" size={size} color={color} />
                    )
                }}
            />

        </Tab.Navigator>
    )
}
