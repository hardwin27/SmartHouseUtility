import React from 'react';
import db from './FirebaseDatabase';
import {
  Navbar,
  Row,
  Col,
} from 'react-bootstrap';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lightning: [],
      error: null,
      ac: {
        isOn: false,
        temperature: 0,
      },
    };
  }

  async componentDidMount() {
    this.loadLightning();
    this.loadACControl();
  }

  loadLightning() {
    db.database().ref("LightBulb").orderByKey().on("value", snapshot => {
      const lightning = [];
      snapshot.forEach((snap) => {
        lightning.push(snap.child("isOn").val());
      });
      this.setState({
        lightning
      });
    });
  }

  loadACControl() {
    db.database().ref('AirConditioner/temperature').on('value', (snapshot) => {
      const temperature = snapshot.val();

      this.setState({
        ac: {
          isOn: this.state.ac.isOn,
          temperature,
        },
      });
    });
  
    db.database().ref('AirConditioner/isOn').on('value', (snapshot) => {
      const isOn = snapshot.val();

      this.setState({
        ac: {
          isOn,
          temperature: this.state.ac.temperature,
        },
      });
    });
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
          <h3 className="m-2">AC is {this.state.ac.isOn? `ON, with temperature ${this.state.ac.temperature} celcius`:"OFF"}</h3>
          <Row className="m-2">
            {
              this.state.lightning.map((val, key) => {
                return (
                  <>
                    <Col>
                      <h2>Light bulb #{ key }</h2>
                      <img src={ (val) ? "on.png":"off.png" } alt={`Light bulb ${key}`} width={100} height={160} />
                    </Col>
                  </>
                );
              })
            }
          </Row>
        </>
      </>
    );
  }
}

export default App;
