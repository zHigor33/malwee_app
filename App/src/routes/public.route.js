import React from 'react';
import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../compenets/Login';
import Register from '../compenets/Register';

const Stack = createStackNavigator();

export default function MainRote() {
    return (
        <Stack.Navigator>
            <Stack.Screen 
                name="Login" 
                component={Login} 
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
                name="Register" 
                component={Register} 
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
