Header = React.createClass({
  render() {
    return (
      <header className='Header'>
        <b>Header</b> &nbsp;
        <a href="/">Home</a>
        <a href="/admin">Admin</a> &nbsp;
        <a href="/about">About Page</a> &nbsp;
        <LoginButtons align='left' />
      </header>
    );
  }
});