Meteor.subscribe("currentUserData");
var {  
  Router,
  Route
} = ReactRouter;

Routes = React.createClass({  
  getInitialState: function() {
    return {};
  },
  render: function () {
    return (
      <Router history={ReactRouter.lib.BrowserHistory.history}>
        <Route component={App}>
          <Route path="/" component={People}/>
          <Route path="/admin" component={Admin}/>
        </Route>
      </Router>
    );
  }
});