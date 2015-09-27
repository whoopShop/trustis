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
          <Route path="/admin/people" component={AllPeopleTable}/>
          <Route path="/admin/person/:pId" component={EditPerson}/>
          <Route path="/admin/users" component={AllUsers}/>
          <Route path="/admin/user/:uId" component={EditUser}/>
        </Route>
      </Router>
    );
  }
});