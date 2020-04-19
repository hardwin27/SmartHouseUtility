import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button
} from 'react-native';
import firebase from './FirebaseDatabase.js';

function getLightState(cb) {
  let lightStateArray = [];

  firebase.database().ref('LightBulb').orderByKey().on('value', (snapshot) => {
    lightStateArray = [];
    snapshot.forEach((snap) => {
      lightStateArray.push(snap.child('isOn').val());
    });
    cb(lightStateArray);
  });
}

function updateLightState(index, lightState) {
  let refAddress = "LightBulb/Light" + index;

  lightState = !lightState;

  firebase.database().ref(refAddress).update({
    isOn: lightState
  })
}

function App() {
  const [arrayOfLightState, setArrayOfLightState] = useState([]);


  useEffect(() => {
    getLightState(setArrayOfLightState)
  }, []);
  return (
    <View style={styles.container}>
      <Button
        title={arrayOfLightState[0] ? "Light 1 is on" : "Light 1 is off"}
        onPress={() => updateLightState("1", arrayOfLightState[0])}
      />
      <Button 
        title={arrayOfLightState[1] ? "Light 2 is on" : "Light 1 is off"}
        onPress={() => updateLightState("2", arrayOfLightState[1])}
      />
      <Button
        title={arrayOfLightState[2] ? "Light 3 is on" : "Light 1 is off"}
        onPress={() => updateLightState("3", arrayOfLightState[2])}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;