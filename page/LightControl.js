import React from 'react';
import {
  View,
} from 'react-native';
import {
  Text,
  Button,
  Switch,
  Paragraph,
  TouchableRipple,
} from 'react-native-paper';
import firebase from '../component/FirebaseDatabase.js';


export default class ACControl extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      lights: [],
    };
  }

  async componentDidMount() {
    this.loadLights();
  }

  async loadLights() {
    let lights;

    firebase.database().ref('LightBulb').orderByKey().on('value', (snapshot) => {
      lights = [];
      snapshot.forEach((snap) => {
        lights.push(snap.child("isOn").val());
      });
      
      this.setState({
        lights
      });
    });
  }

  togglePower(key) {
    const refAddress = "LightBulb/Light" + key.toString();

    firebase.database().ref(refAddress).update({
      isOn: !this.state.lights[key],
    });
  }

  render() {
    return(
        <>
          {
            this.state.lights.map((val, key) => (
              <TouchableRipple
                onPress={() => this.togglePower(key)}
              >
                <View style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingVertical: 8,
                  paddingHorizontal: 16,
                }}>
                  <Paragraph>Light {key} {(val) ? "On":"Off"}</Paragraph>
                  <View pointerEvents="none">
                    <Switch
                      value={val}
                    />
                  </View>
                </View>
              </TouchableRipple>
            ))
          }
        </>
    );
  }
}
