import React, { Component } from 'react';
import {connect} from 'react-redux';
import ThingsList from './ThingsList';
import ThingsAddOne from './ThingsAddOne';

class App extends Component {
  makePage() {
    switch (this.props.page) {
      case 2:
        return (<ThingsAddOne />);
      default:
        return (<ThingsList />);
    }
  }

  render() {
    return (
      <div className="App">
        {this.makePage()}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    page: state.page
  }
}

export default connect(mapStateToProps)(App);
