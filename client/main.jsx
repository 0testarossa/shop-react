import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import App from '../imports/ui/App';
import 'bootstrap'
import { Route, HashRouter, Switch } from 'react-router-dom';
import ProductPage from '../imports/ui/ProductPage';
import Cart from '../imports/ui/Cart';
import PaymentPage from '../imports/ui/PaymentPage';
import Login from '../imports/ui/Login';
import Register from '../imports/ui/Register';
import AfterPayment from '../imports/ui/AfterPayment';
import PaymentForm from '../imports/ui/PaymentForm';
 

Meteor.startup(() => {

   render(
    <HashRouter>
      <Switch>
        <Route path="/" exact component={App}/>
        <Route path="/product" exact component={ProductPage}/>
        <Route path="/product/:id" exact component={ProductPage}/>
        <Route path="/cart" exact component={Cart}/>
        <Route path="/payment" exact component={PaymentForm}/>
        <Route path="/login" exact component={Login}/>
        <Route path="/register" exact component={Register}/>
        <Route path="/pay" exact component={PaymentPage}/>
        <Route path="/afterPayment" exact component={AfterPayment}/>
      </Switch>
    </HashRouter>,
    document.getElementById('react-target'),
  );
});
