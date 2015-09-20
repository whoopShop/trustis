Header = React.createClass({
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
            <a href="/admin">Admin</a>
        </div>
      </nav>
    );
  }
});

/*

From template:

<nav class="navbar navbar-default navbar-static-top navbar-inverse">
    <div class="container">
        <div class="navbar-header">
            <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                <span class="sr-only">Toggle navigation</span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
            </button>
            <a class="navbar-brand" href="#">Trust</a>
        </div>
        {{> loginButtons}}
        <a href="/">Home</a>
        <a href="/admin">Admin</a>
    </div>
</nav>

*/