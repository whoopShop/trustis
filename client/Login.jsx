LoginButtons = React.createClass({
  propTypes: {
    align: React.PropTypes.string,
  },

  getDefaultProps() {
    return { align: 'right' };
  },

  componentDidMount() {
    var div = document.getElementById('LoginButtons');
    Blaze.renderWithData(Template.loginButtons, {align: this.props.align}, div);
  },

  shouldComponentUpdate() {
    return false;
  },

  render() {
    return (
      <div id='LoginButtons' />
    );
  }
});

// var FbLogin = React.createClass({
//   mixins: [ReactMeteorData],
//   getMeteorData: function() {
//       return {
//           currentUser: Meteor.user()
//       }
//   },
//   getInitialState: function() {
//       return {};
//   },
//   renderLogin: function() {
//     if (this.data.currentUser) {
//       return (
//         <div className="login">
//           <span className="fbUserName">this.data.currentUser.services.facebook.name</span>
//           <button id="fbLogout">Logout</button>
//         </div>
        
//       )
//     }
//     else {
//       return (
//         <div className="login">
//           <button id="facebook-login" class="btn btn-default"> Login with Facebook</button>
//         </div>
        
//       )
//     }
//   },
//   render: function() {
//     return this.renderLogin()
//   }
// });