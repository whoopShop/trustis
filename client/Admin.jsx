FormTextInput = React.createClass({
  render: function() {
    return (
      <div className="form-group">
          <label htmlFor={this.props.name}>{this.props.label}</label>
          <input className="form-control" type="text" name={this.props.name} defaultValue={this.props.value} />
      </div>
    );
  }
});

EditPerson = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData: function() {
      Meteor.subscribe("Peoplepub");
      return {
          person: Peopledb.find({_id: this.props.params.pId}).fetch()[0]
      }
  },
  getInitialState: function() {
      return {
        person: []
      };
  },
  componentDidMount: function() {
    console.log(this.data.person);
    this.setState({
      person: this.data.person
    });
  },
  render: function() {
    var p = typeof(this.state.person) !== "undefined" ? this.state.person : {name: "", party: "", profilepic: ""};
    console.log(p);
    return (
      <div className="editperson">
        <h3>Edit</h3>
        <form className="edit-people" action="index.html" method="post">
          <FormTextInput name="name" label="Name" value={p.name} />
          <FormTextInput name="party" label="Party" value={p.party} />
          <FormTextInput name="profilepic" label="Profile Picture" value={p.profilepic} />  
          <button type="submit" className="btn btn-primary" name="button">Save edit</button>
        </form>
      </div>
    );
  }
});

AddPerson = React.createClass({
  render: function() {
    return (
      <div className="addperson col-md-4">
        <h3>Add a new person</h3>
        <form className="add-people" method="post">
          <FormTextInput name="name" label="Name" value="" />
          <FormTextInput name="party" label="Party" value="" />
          <FormTextInput name="profilepic" label="Profile Picture" value="" />
          <button type="submit" className="btn btn-primary" name="button">Add</button>
        </form>
      </div>
    );
  }
});

PersonRow = React.createClass({
  render: function() {
    return (
      <tr>
        <td>
            <a href={"/admin/person/" + this.props.person._id}>Edit</a>
            <a href="#" className="delete-people">Delete</a>
        </td>
        <td>{this.props.person.name}</td>
        <td>{this.props.person.party}</td>
        <td>{this.props.person.profilepic}</td>
      </tr>
    );
  }
});

AllPeopleTable = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData: function() {
      Meteor.subscribe("Peoplepub");
      return {
          people: Peopledb.find({}, {sort: {name: 1}}).fetch()
      }
  },
  getInitialState: function() {
      return {};
  },
  render: function() {
    return (
      <div className="allpeopletable">
        <AddPerson />
        <h3>See all</h3>
        <table className="table table-bordered table-condensed">
            <thead>
                <tr>
                    <th>Edit</th>
                    <th>Name</th>
                    <th>Party</th>
                    <th>Pic Url</th>
                </tr>
            </thead>
            <tbody>
                {this.data.people.map((p) => {
                  return <PersonRow person={p} key={p._id} />
                })}
            </tbody>
        </table>
      </div>
    );
  }
});

EditUser = React.createClass({
  render: function() {
    return (
      <div className="EditUser"></div>
    );
  }
});

AllUsers = React.createClass({
  render: function() {
    return (
      <div className="Users"></div>
    );
  }
});

Admin = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData: function() {
      Meteor.subscribe("Peoplepub");
      return {
          people: Peopledb.find({}, {sort: {name: 1}}).fetch()
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