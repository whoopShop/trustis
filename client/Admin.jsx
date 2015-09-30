/*
 * PersonForm
 */
PersonForm = React.createClass({
  pFormField(label, value, ref) {
    // Generates form field from arguments passed. Keeping things DRY
    return (
      <El.FormField label={label} htmlFor="basic-form-input">
        <El.FormInput
          placeholder={label}
          name="basic-form-input"
          defaultValue={value}
          ref={ref}/>
      </El.FormField>
      )
  },
  render: function() {
    // Determine preset value of form inputs if any
    var nameVal = this.props.add ? "" : this.props.person.name;
    var partyVal = this.props.add ? "" : this.props.person.party;
    var picVal = this.props.add ? "" : this.props.person.profilepic;
    return (
      <El.Form>
        {this.pFormField("Name", nameVal, "name")}
        {this.pFormField("Party", partyVal, "party")}
        {this.pFormField("Profile Picture Url", picVal, "pic")}
        <El.Button type="primary" onClick={this.onclick}>Save</El.Button>
        <El.Button onClick={this.props.close}>Cancel</El.Button>
      </El.Form>
    );
  },
  onclick() {
    // Mold input fields into a person object
    var p = {
      name: React.findDOMNode(this.refs.name).value,
      party: React.findDOMNode(this.refs.party).value,
      pic: React.findDOMNode(this.refs.pic).value
    };
    // Call function passed down from parent with new person
    this.props.onclick(p);
  }
});

/*
 * EditPerson
 */
EditPerson = React.createClass({
  update(p) {
    // Call server function to update person
    Meteor.call("adminEditPeople", this.props.person._id, p.name, p.party, p.pic);
    // Call function passed down from parent to close modal
    this.props.close();
  },
  render() {
    return (
      <PersonForm
        person={this.props.person}
        onclick={this.update}
        close={this.props.close}
        add={false} />
      )
  }
});

/*
 * AddPerson
 */
AddPerson = React.createClass({
  add(p) {
    // Call update function on server
    Meteor.call("adminAddPeople", p.name, p.party, p.pic);
    // Call function passed down from parent to close modal
    this.props.close();
  },
  render() {
    // Make a person object 
    var p = {
      name: "Name",
      party: "Party",
      profilepic: "Url to profile picture"
    };
    return (
      <PersonForm person={p} onclick={this.add} close={this.props.close} add={true} />
    );
  }
});

/*
 * PersonRow
 */
PersonRow = React.createClass({
  getInitialState(){
    return {};
  },
  render() {
    return (
      <tr>
        <td>
          <El.ButtonGroup>
            <El.Button type="primary" onClick={this.update}>Edit</El.Button>
            <El.Button type="danger" onClick={this.deletePerson}>Delete</El.Button>
          </ El.ButtonGroup>
        </td>
        <td>{this.props.person.name}</td>
        <td>{this.props.person.party}</td>
        <td>{this.props.person.profilepic}</td>
      </tr>
    );
  },
  update() {
    // Update function to pass down to child which runs update function passed down by parent
    this.props.onUpdate(this.props.person);
  },
  deletePerson() {
    // Delete function to pass down to child which runs delete function passed down by parent
    this.props.onDelete(this.props.person);
  }

});

/*
 * AllPeopleTable
 */
AllPeopleTable = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData() {
    // Gather people data from server
    Meteor.subscribe("Peoplepub");
    return {
      people: Peopledb.find({}).fetch().sort(dynamicSort("name"))
    }
  },
  getInitialState() {
    // Set initial state
    return ({
      editing: [],
      showModal: false,
      addEditDelete: "Edit"
    });
  },
  deletePerson() {
    // Call function on server to delete people
    Meteor.call("adminDeletePeople", this.state.editing._id);
    // Then close modal
    this.close();
  },
  addOrEditOrDelete(){
    // Determine what to display in the modal
    if (this.state.addEditDelete == "Edit"){
      // Display edit person form
      return <EditPerson person={this.state.editing} close={this.close} />
    }
    else if (this.state.addEditDelete == "Delete"){
      // Display delete window
      return (
        <div>
          <h2>Delete {this.state.editing.name}? </h2>
          <El.Button type="danger" onClick={this.deletePerson}>Delete</El.Button>
          <El.Button onClick={this.close}>Cancel</El.Button>
        </div>
        )
    }
    else {
      // Display add person form
      return <AddPerson close={this.close} />
    }
  },
  render() {

    return (
      <div className="allpeopletable">
        <El.Button type="primary" onClick={this.onAdd}>Add Person</El.Button>
        <El.Table>
          <colgroup>
            <col width="160px" />
            <col width="" />
            <col width="" />
            <col width="" />
          </colgroup>
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
                return <PersonRow person={p} key={p._id}
                        onUpdate={this.onUpdate} onDelete={this.onDelete} />
              })}
          </tbody>
        </El.Table>
        <El.Modal isOpen={this.state.showModal} onHide={this.close}>
          <El.ModalHeader text={this.state.addEditDelete} showCloseButton onClose={this.close} />
          <El.ModalBody>
            {this.addOrEditOrDelete()}
          </El.ModalBody>
        </ El.Modal>
      </div>
    );
  },
  close() {
    this.setState({ showModal: false });
  },
  onAdd() {
    // Trigger modal to show add person form
    this.setState({
      addEditDelete: "Add",
      showModal: true
    });
  },
  onUpdate(person) {
    // Trigger modal to show edit person form
    this.setState({
      editing: person,
      addEditDelete: "Edit",
      showModal: true
    });
  },
  onDelete(person) {
    // Trigger modal to show delete person window
    this.setState({
      editing: person,
      addEditDelete: "Delete",
      showModal: true
    });
  }
});

/*======================================== USERS ========================================*/

EditUser = React.createClass({
  render() {
    return (
      <div className="EditUser"></div>
    );
  }
});

AllUsers = React.createClass({
  // mixins: [ReactMeteorData],
  // getMeteorData() {
  //     Meteor.subscribe("Peoplepub");
  //     return {
  //         users: Peopledb.find({}, {sort: {name: 1}}).fetch()
  //     }
  // },
  render() {
    return (
      <div className="Users"></div>
    );
  }
});

Admin = React.createClass({
  getInitialState() {
      return {};
  },
  renderProfile() {
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
  render() {
    return (
      <AllPeopleTable />
    );
  }
});