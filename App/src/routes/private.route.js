import React from 'react';
import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import { isAuthenticated } from '../config/Authenticate';
import Loading from '../config/Loading';
import User from '../compenets/User';
import Events from '../compenets/Events';
import Activity from '../compenets/Activity';
import Waypoints from '../compenets/Waypoints';
import Museum from '../compenets/Museum';

const StackPrivate = createStackNavigator();

export default function PrivateRote({ navigation }) {
    return (
        isAuthenticated() == false ?
            <StackPrivate.Navigator>
                <StackPrivate.Screen name="Loading" component={Loading} />
                {navigation.navigate("Public", {screen: "Login"})}
            </StackPrivate.Navigator> 
            :
            <StackPrivate.Navigator initialRouteName="User">
                <StackPrivate.Screen 
                    name="Home" 
                    component={User} 
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
                <StackPrivate.Screen 
                    name="Eventos" 
                    component={Events} 
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
                <StackPrivate.Screen 
                    name="Atividades" 
                    component={Activity} 
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
                <StackPrivate.Screen 
                    name="Locais" 
                    component={Waypoints} 
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
                <StackPrivate.Screen 
                    name="Museu" 
                    component={Museum} 
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
            </StackPrivate.Navigator>
    )
}
