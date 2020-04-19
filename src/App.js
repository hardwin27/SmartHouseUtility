import React from 'react';
import db from './FirebaseDatabase';
import {
  Navbar
} from 'react-bootstrap';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lightning: [],
      error: null
    };
  }

  async componentDidMount() {
    this.setState({
      error: null,
    });
    try {
      db.database().ref("LightBulb").orderByKey().on("value", snapshot => {
        const lightning = [];
        snapshot.forEach((snap) => {
          lightning.push(snap.child("isOn").val());
        });
        this.setState({
          lightning
        });
      });
    } catch (error) {
      this.setState({
        error: error.message
      });
    }
  }

  render() {
    return (
      <>
        <>
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand href="#home">
            <img
              src="https://react-bootstrap.github.io/logo.svg"
              width="30"
              height="30"
              className="d-inline-block align-top"
              alt="Smart House Utility logo"
            />{' '}
            Smart House Utility
          </Navbar.Brand>
        </Navbar>
        </>
        <>
          {
            this.state.lightning.map((val, key) => {
              return (
                <>
                  <h2>Light bulb #{ key }</h2>
                  <img src={ (val) ? "on.png":"off.png" } width={100} height={160} />
                </>
              );
            })
          }
        </>
      </>
    );
  }
}

export default App;
