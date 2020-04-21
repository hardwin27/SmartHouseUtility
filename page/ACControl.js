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
      isOn: false,
      temperature: 0,
    };
  }

  async componentDidMount() {
    this.loadTemperature();
    this.loadIsOn();
  }

  togglePower() {
    firebase.database().ref('AirConditioner/isOn').transaction((isOn) => {
      return !isOn;
    });
  }

  changeTemperature(temperatureNew) {
    firebase.database().ref('AirConditioner/temperature').transaction(_ => {
      return temperatureNew;
    });
  }

  loadTemperature() {
    firebase.database().ref('AirConditioner/temperature').on('value', (snapshot) => {
      const temperature = snapshot.val();

      this.setState({
        temperature
      });
    });
  }

  loadIsOn() {
    firebase.database().ref('AirConditioner/isOn').on('value', (snapshot) => {
      const isOn = snapshot.val();

      this.setState({
        isOn
      });
    });
  }

  render() {
    return(
        <>
          <TouchableRipple
            onPress={() => this.togglePower()}
          >
            <View style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingVertical: 8,
              paddingHorizontal: 16,
            }}>
              <Paragraph>{(this.state.isOn) ? "On":"Off"}</Paragraph>
              <View pointerEvents="none">
                <Switch
                  value={this.state.isOn}
                />
              </View>
            </View>
          </TouchableRipple>
          <Text>{this.state.temperature}</Text>
          <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingVertical: 8,
            paddingHorizontal: 16,
          }}>
            <Button
              style={{
                width: "40%"
              }}
              mode="contained"
              onPress={() => this.changeTemperature(this.state.temperature + 1)}
              disabled={!this.state.isOn}
            >
              +
            </Button>
            <Button
              style={{
                width: "40%"
              }}
              mode="contained"
              onPress={() => this.changeTemperature(this.state.temperature - 1)}
              disabled={!this.state.isOn}
            >
              -
            </Button>
          </View>
        </>
    );
  }
}
