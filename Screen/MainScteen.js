import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

function MainMenu() {
    const navigation = useNavigation()
    return(
        <View>
            <Button
                title="Light Controller"
                onPress={() => navigation.navigate('LightControl')}
            />
            <Button
                title="AC Controller"
                onPress={() => navigation.navigate('AcControl')}
            />
        </View>
    )
}

export default MainMenu;