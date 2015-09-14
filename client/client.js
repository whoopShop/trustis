// User accounts
Accounts.ui.config({
    passwordSignupFields: "USERNAME_ONLY"
});




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

Template.rating.helpers({
    avgPoints:function(){
        return this.totalpoints / this.totalvoters;
    }
});

Template.rating.events({
    "submit .add-points":function(event){
        var points= event.target.points.value;
        // console.log(points);
        // console.log(this);
        event.preventDefault();
        // Check if I have already voted on this one
        // If not, increment the totalvotes
        
        // Meteor.call("userIncVoters", this._id);
        Meteor.call("userCreatesVote", this._id, points);
        // Meteor.call("userAddPoints", this._id);
    },
    "click .removePoint":function(){
        // Check if I have already voted on this one
        // If not, I should not be able to remove points - not needed with radio buttons
        Meteor.call("userRemovePoints", this._id);
    }
    
});
