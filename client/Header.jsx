Header = React.createClass({
    mixins: [ReactMeteorData],
    getMeteorData() {
        Meteor.subscribe("currentUserData");
        return {
          currentUser: Meteor.user() 
        }
    },
    showAdmin() {
        if (Roles.userIsInRole(this.data.currentUser,'admin')) {
            return <a href="/admin">Admin</a>
        }
    },
    render() {
        return (
            <nav className="navbar navbar-default navbar-static-top navbar-inverse">
                <div className="container">
                    <div className="navbar-header">
                        <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                            <span className="sr-only">Toggle navigation</span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                        </button>
                        <a className="navbar-brand" href="#">Trust</a>
                    </div>
                    <LoginButtons />
                    <a href="/">Home</a>
                    {this.showAdmin()}
                </div>
            </nav>
        );
    }
});
