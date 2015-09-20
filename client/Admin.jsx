Admin = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData: function() {
      Meteor.subscribe("currentUserData");
      return {
          currentUser: Meteor.user() 
      }
  },
  getInitialState: function() {
      return {};
  },
  renderProfile: function() {
    if (typeof(this.data.currentUser) !== "undefined") {
      return (
        <div className="userProfile">
          <span>{this.data.currentUser.profile.name}</span>
          <img src={this.data.currentUser.profile.thumbnail} />
        </div>
      )
    }
    else {
      return (
          <p>Please sign in</p>
      )
    }
  },
  render: function() {
    return (
      <div className="row">
        {this.renderProfile()}
      </div>
    );
  }
});