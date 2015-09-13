
// These helpers will be available in all templates
Template.registerHelper('getAllPeople', function () {
        return Peopledb.find({});
    }
);

Template.people.events({
    // Rate people
    
    // Hide all parties, so we cannot see which party anyone belongs to
    
    
});

Template.admin.events({
    "submit .add-people": function(event){
        event.preventDefault();
        var name = event.target.name.value;
        var party = event.target.party.value;
        var profilepic = event.target.profilepic.value;
        /*
        console.log(name);
        console.log(party);
        console.log(profilepic);
        */
        
        // console.log('Submitting new person');
        Meteor.call("adminAddPeople", name, party, profilepic);
        
    }
});

Template.editPeople.events({
    "submit .edit-people":function(event){
        event.preventDefault();
        var name = event.target.name.value;
        var party = event.target.party.value;
        var profilepic = event.target.profilepic.value;
        
        // console.log('Submitting edit');
        Meteor.call("adminEditPeople", this._id, name, party, profilepic);
    }
});

Template.allPeopleTable.events({
    "click .delete-people":function(){
        if (confirm("Really delete: " + this.name)) {
            Meteor.call("adminDeletePeople", this._id);
        }
    }
});

Template.admin.helpers({
    
})
