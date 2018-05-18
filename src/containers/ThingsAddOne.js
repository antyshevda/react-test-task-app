import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {Input, Button, Form, FormGroup, Label} from 'reactstrap';

import {changePageAction, sendThingToServerAction} from '../actions';

class ThingsAddOne extends Component {
  state = {
    column1: "",
    column2: ""
  }

  handleSubmit(e) {
    e.preventDefault();

    this.props.sendThingToServerAction(this.state);
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.isSended) {
      this.props.changePageAction(1);
    }
  }

  render () {
    return (
      <div className="App-form-add-thing">
        <h1>Add new thing</h1>
        <div className="App-create-thing-back" onClick={() => this.props.changePageAction(1)}> ← Back to list</div>
        <Form onSubmit={(e) => {this.handleSubmit(e)}}>
          <FormGroup>
            <Label for="column1">First column</Label>
            <Input bsSize="sm" type="text" name="column1" id="column1" placeholder="" value={this.state.column1} onChange={ event => this.setState({ column1 : event.target.value }) }/>
          </FormGroup>
          <FormGroup>
            <Label for="column2">Second column</Label>
            <Input bsSize="sm" type="text" name="column2" id="column2" placeholder="" value={this.state.column2} onChange={ event => this.setState({ column2 : event.target.value }) }/>
          </FormGroup>
          <Button color="success" size="sm" type="submit">Add</Button>
        </Form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    isSended: state.thingsAddOne
  }
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({changePageAction, sendThingToServerAction}, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(ThingsAddOne);