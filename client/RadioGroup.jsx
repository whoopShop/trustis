function radio(name, selectedValue, onChange) {
  return React.createClass({
    render: function() {
      return (
        <input
          {...this.props}
          type="radio"
          name={name}
          checked={this.props.value === selectedValue}
          onChange={onChange.bind(null, this.props.value)} />
      );
    }
  });
}

RadioGroup = React.createClass({
  render: function() {
    let {name, selectedValue, onChange} = this.props;
    return (
      <div>
        {this.props.children(radio(name, selectedValue, onChange))}
      </div>
    );
  }
});