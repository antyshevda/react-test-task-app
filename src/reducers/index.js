import {combineReducers} from 'redux';
import ThingsReducer from './thingList';
import ThingsFilter from './thingFilter';
import ThingsSorter from './thingSorter';
import ThingsSender from './thingSender';
import ThingsRemover from './thingRemover';
import Page from './page';

const rootReducer = combineReducers({
  things: ThingsReducer,
  thingsFilter: ThingsFilter,
  thingsSorter: ThingsSorter,
  thingsAddOne: ThingsSender,
  thingsRemover: ThingsRemover,
  page: Page
});

export default rootReducer;