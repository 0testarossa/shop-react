import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
// import { App } from '/imports/ui/App';
import App from '../imports/ui/App';
import 'bootstrap'
import popper from 'popper.js'
import { Route, HashRouter, Switch } from 'react-router-dom';
import ProductPage from '../imports/ui/ProductPage';
import Cart from '../imports/ui/Cart';
import PaymentPage from '../imports/ui/PaymentPage';
import Test from '../imports/ui/Test';
import Login from '../imports/ui/Login';
import Register from '../imports/ui/Register';
 

Meteor.startup(() => {

   render(
    // <Provider store={store}>
    //   <Router history={history}>
    //     <div>
    //       <ul>
    //         <li><Link to="/">Home</Link></li>
    //         <li><Link to="/login">Login</Link></li>
    //       </ul>
    //       <Route exact path="/" component={App} />
    //       <Route path="/login" component={App} />
    //     </div>
    //   </Router>
    // </Provider>,
    <HashRouter>
      <Switch>
        <Route path="/" exact component={App}/>
        <Route path="/product" exact component={ProductPage}/>
        <Route path="/product/:id" exact component={ProductPage}/>
        <Route path="/cart" exact component={Cart}/>
        <Route path="/payment" exact component={PaymentPage}/>
        <Route path="/test" exact component={Test}/>
        <Route path="/login" exact component={Login}/>
        <Route path="/register" exact component={Register}/>
      </Switch>
    </HashRouter>,
    document.getElementById('react-target'),
  );
  // render(<App/>, document.getElementById('react-target'));
});
