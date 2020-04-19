import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button
} from 'react-native';
import firebase from '../Component/FirebaseDatabase.js';

function getAcState(cb) {
    firebase.database().ref('AirConditioner/isOn').on('value', (snapshot) => {
        cb(snapshot.val());
    });
}

function changeAcState() {
    firebase.database().ref('AirConditioner/isOn').transaction((isOn) => {
        if(isOn) {
            return false;
        }
        else {
            return true;
        }
    });
}

function getTemperature(cb) {
    firebase.database().ref('AirConditioner/temperature').on('value', (snapshot) => {
        cb(snapshot.val());
    });
}

function changeTemperature(operator) {
    firebase.database().ref('AirConditioner/temperature').transaction((currentTemperature) => {
        if(operator == "+") {
            return currentTemperature + 1;
        }
        else if(operator == "-") {
            return currentTemperature - 1;
        }
    });
}

function AcControl() {
    const [temperature, setTemperature] = useState(0);
    const [acState, setAcState] = useState(false);
    useEffect(() => {
        getAcState(setAcState);
        getTemperature(setTemperature);
    }, []);
    return(
        <View>
            <Button
                title={acState ? "Power: On" : "Power: Off"}
                onPress={() => changeAcState()}
            />
            <Button
                title="+"
                onPress={() => changeTemperature("+")}
                disabled={!acState}
            />
            <Text>{temperature}</Text>
            <Button
                title="-"
                onPress={() => changeTemperature("-")}
                disabled={!acState}
            />
        </View>
    )
}

export default AcControl;