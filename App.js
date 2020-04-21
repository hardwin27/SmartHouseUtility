import React from 'react';
import {
  Appbar,
} from 'react-native-paper';

import BottomNav from './component/BottomNav';

class App extends React.Component {
  render() {
    return(
      <>
        <Appbar.Header>
          <Appbar.Content
            title="SmartHouseUtility"
          />
        </Appbar.Header>
        <BottomNav />
      </>
    );
  }
}

export default App;
