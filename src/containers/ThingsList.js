import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Table, Input, Button} from 'reactstrap';
import {filterAction, sorterAction, changePageAction, fetchThingsAction, removeThingAction} from '../actions';
import _ from 'lodash';

class ThingsList extends Component {

  componentWillMount() {
    this.props.fetchThingsAction();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.thingsRemover.status) {
      this.props.fetchThingsAction();
    }
  }

  makeList() {
    if (!this.props.things.length) {
      return (
        <tr>
          <td colSpan="3">Нет данных</td>
        </tr>
      )
    }

    return this.props.things.map(item => {
      return (
        <tr key={item.id}>
          <td>{item.column1}</td>
          <td>{item.column2}</td>
          <td>
            <Button onClick={() => this.removeThingHandler(item.id)} outline color="secondary" size="sm" className="App-radial-btn">✕</Button>
          </td>
        </tr>
      )
    });
  }

  makeSorterTitle(currentColumn) {
    if (!this.props.things.length) {
      return (
        <span className="App-list-table-sorter-disabled">none</span>
      )
    }
    if (currentColumn === this.props.sorter.columnId) {
      if (this.props.sorter.direction) {
        return (
          <span className="App-list-table-sorter">asc</span>
        );
      } else {
        return (
          <span className="App-list-table-sorter">desc</span>
        );
      }
    } else {
      return (
        <span className="App-list-table-sorter">desc</span>
      );
    }
  }

  removeThingHandler(thingId) {
    if (window.confirm("Remove thing?")) {
      this.props.removeThingAction(thingId)
    }
  }

  render () {
    return (
      <div className="App-list">
        <h1>List of things</h1>
        <div className="App-create-thing" onClick={() => this.props.changePageAction(2)}>Add new thing</div>

        <div className="App-list-filter">
          <Input onChange={(event) => this.props.filterAction(event.target.value)} bsSize="sm" type="text" placeholder="filter things" />
        </div>

        <Table>
          <thead>
            <tr>
              <th> column 1 <span onClick={() => this.props.sorterAction(1, !this.props.sorter.direction)} className="App-list-table-sorter">{this.makeSorterTitle(1)}</span> </th>

              <th> column 2 <span onClick={() => this.props.sorterAction(2, !this.props.sorter.direction)} className="App-list-table-sorter">{this.makeSorterTitle(2)}</span> </th>

              <th></th>
            </tr>
          </thead>
          <tbody>
            {this.makeList()}
          </tbody>
        </Table>
      </div>
    );
  }
}

function mapStateToProps(state) {
  let list = state.things;

  if (state.thingsFilter) {
    let search = state.thingsFilter.toLowerCase();
    list = _.map(list, function(thing) {
      let weight = 0;
      for (let key of Object.keys(thing)) {
        if (key === 'id') continue;
        if (weight > 0) break;

        if (thing[key].toString().toLowerCase().indexOf(search) >= 0) {
          weight += 1;
        }
      }

      if (weight > 0) {
        return thing;
      }
    });

    list = _.without(list, undefined)
  }

  let sorterColumn = 'column' + state.thingsSorter.columnId;
  let sorterDirection = state.thingsSorter.direction ? 'asc' : 'desc';
  list = _.orderBy(list, sorterColumn, sorterDirection);

  return {
    things: list,
    filter: state.thingsFilter,
    sorter: state.thingsSorter,
    thingsRemover: state.thingsRemover
  }
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({filterAction, sorterAction, changePageAction, fetchThingsAction, removeThingAction}, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(ThingsList);