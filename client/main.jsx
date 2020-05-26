import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
// import { App } from '/imports/ui/App';
import App from '../imports/ui/App';
import 'bootstrap'
import popper from 'popper.js'
// global.Popper = popper // uncomment when modals etc. are not working properly
 

Meteor.startup(() => {
  render(<App/>, document.getElementById('react-target'));
});
