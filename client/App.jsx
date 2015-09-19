App = React.createClass({
  getInitialState: function() {
    return {};
  },
  render: function () {
    return (
      <div className="container">
        <Header />
        <div id="content">
          {this.props.children}
        </div>
        
      </div>
    );
  }
});