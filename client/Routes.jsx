Meteor.subscribe("currentUserData");
var {  
  Router,
  Route
} = ReactRouter;

Routes = React.createClass({  
  mixins: [ReactMeteorData],
  getMeteorData() {
      Meteor.subscribe("currentUserData");
      return {
        currentUser: Meteor.user() 
      }
  },
  getInitialState() {
    return {};
  },
  adminRoutes() {
      if (Roles.userIsInRole(this.data.currentUser,'admin')) {
          return (
            <Route path="/admin" component={Admin}>
              <Route path="/people" component={AllPeopleTable}/>
              <Route path="/users" component={AllUsers}/>
            </Route>
          );
      }
  },
  render() {
    return (
      <Router history={ReactRouter.lib.BrowserHistory.history}>
        <Route component={App}>
          <Route path="/" component={People}/>
          {this.adminRoutes()}
        </Route>
      </Router>
    );
  }
});