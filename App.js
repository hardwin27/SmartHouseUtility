import React from 'react';
// import firebase from './Component/FirebaseDatabase.js';
import { NavigationContainer } from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import MainMenu from './Screen/MainScteen';
import LightControl from './Screen/LightControl.js';
import AcControl from './Screen/AcControl.js';

const Stack = createStackNavigator();

function App() {
  return(
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="MainMenu" component={MainMenu} options={{headerShown: false}}/>
        <Stack.Screen name="LightControl" component={LightControl}/>
        <Stack.Screen name="AcControl" component={AcControl}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App;