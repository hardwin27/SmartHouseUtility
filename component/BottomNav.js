import React from 'react';
import { BottomNavigation, Text } from 'react-native-paper';

import ACControl from '../page/ACControl';
import LightControl from '../page/LightControl';

const OverviewRoute = () => <Text>Hello World!</Text>;

const ACControlRoute = () => <ACControl/>;

const LightControlRoute = () => <LightControl/>;

export default class BottomNav extends React.Component {
  state = {
    index: 0,
    routes: [
      { key: 'overview', title: 'Overview', icon: 'compass' },
      { key: 'ac', title: 'AC', icon: 'remote' },
      { key: 'lights', title: 'Lights', icon: 'lightbulb' },
    ],
  };

  _handleIndexChange = index => this.setState({ index });

  _renderScene = BottomNavigation.SceneMap({
    overview: OverviewRoute,
    ac: ACControlRoute,
    lights: LightControlRoute,
  });

  render() {
    return (
      <BottomNavigation
        navigationState={this.state}
        onIndexChange={this._handleIndexChange}
        renderScene={this._renderScene}
      />
    );
  }
}