
// Easier rendering of a group of radio buttons.
// Borrowed from the GitHub repo at https://github.com/chenglou/react-radio-group
function radio(name, selectedValue, onChange) {
  return React.createClass({
    render: function() {
      return (
        <label>
          <input
            {...this.props}
            type="radio"
            name={name}
            checked={this.props.value === selectedValue}
            onChange={onChange.bind(null, this.props.value)} />
        {this.props.value !== 0 ? this.props.value : "No opinion"}
        </label>
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