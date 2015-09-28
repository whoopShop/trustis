/*
 * PersonForm
 */
PersonForm = React.createClass({
  render: function() {
    var p = this.props.person;
    var nameVal = this.props.add ? "" : p.name;
    var partyVal = this.props.add ? "" : p.party;
    var picVal = this.props.add ? "" : p.profilepic;
    return (
      <El.Form>
        <El.FormField label="Name" htmlFor="basic-form-input">
          <El.FormInput placeholder={p.name} name="basic-form-input" defaultValue={nameVal} ref="name"/>
        </El.FormField>
        <El.FormField label="Party" htmlFor="basic-form-input">
          <El.FormInput placeholder={p.party} name="basic-form-input" defaultValue={partyVal} ref="party"/>
        </El.FormField>
        <El.FormField label="Profile Picture" htmlFor="basic-form-input">
          <El.FormInput placeholder={p.profilepic} name="basic-form-input" defaultValue={picVal} ref="pic"/>
        </El.FormField>
        <El.Button type="primary" onClick={this.onclick}>Save</El.Button>
        <El.Button onClick={this.props.close}>Cancel</El.Button>
      </El.Form>
    );
  },
  onclick() {
    var p = {
      name: React.findDOMNode(this.refs.name).value,
      party: React.findDOMNode(this.refs.party).value,
      pic: React.findDOMNode(this.refs.pic).value
    };
    this.props.onclick(p);
  }
});

/*
 * EditPerson
 */
EditPerson = React.createClass({
  update(p) {
    Meteor.call("adminEditPeople", this.props.person._id, p.name, p.party, p.pic);
    this.props.close();
  },
  render() {
    return (
      <PersonForm person={this.props.person} onclick={this.update} close={this.props.close} add={false} />
      )
  }
});

/*
 * AddPerson
 */
AddPerson = React.createClass({
  add(p) {
    Meteor.call("adminAddPeople", p.name, p.party, p.pic);
    this.props.close();
  },
  render() {
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
    this.props.onUpdate(this.props.person);
  },
  deletePerson() {
    this.props.onDelete(this.props.person);
  }

});

/*
 * AllPeopleTable
 */
AllPeopleTable = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData() {
      Meteor.subscribe("Peoplepub");
      return {
          people: Peopledb.find({}, {sort: {name: 1}}).fetch()
      }
  },
  getInitialState() {
      return ({
        editing: [],
        showModal: false,
        addEditDelete: "Edit"
      });
  },
  deletePerson() {
    Meteor.call("adminDeletePeople", this.state.editing._id);
    this.close();
  },
  addOrEditOrDelete(){
    if (this.state.addEditDelete == "Edit"){
      return <EditPerson person={this.state.editing} close={this.close} />
    }
    else if (this.state.addEditDelete == "Delete"){
      return (
        <div>
          <h2>Delete {this.state.editing.name}? </h2>
          <El.Button type="danger" onClick={this.deletePerson}>Delete</El.Button>
          <El.Button onClick={this.close}>Cancel</El.Button>
        </div>
        )
    }
    else {
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
                return <PersonRow person={p} key={p._id} onUpdate={this.onUpdate} onDelete={this.onDelete} />
              })}
          </tbody>
        </El.Table>
        <El.Modal
          isOpen={this.state.showModal}
          onHide={this.close}
          backdropClosesModal>
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
    this.setState({
      addEditDelete: "Add",
      showModal: true
    });
  },
  onUpdate(person) {
    this.setState({
      editing: person,
      addEditDelete: "Edit",
      showModal: true
    });
  },
  onDelete(person) {
    this.setState({
      editing: person,
      addEditDelete: "Delete",
      showModal: true
    });
  }
});


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