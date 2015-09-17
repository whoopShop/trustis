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
        var points = event.target.points.value;
        // console.log("Points: " + points);
        if (points === undefined) {
            points = 5;
        }
        // TODO: make sure points is a number 0-10
        // console.log("Points: " + points);
        // console.log(this);
        event.preventDefault();
        
        
        var lastVote = 0;
        var thisVoter = Votersdb.find({userVoter:Meteor.userId()});
        console.log('userid has nr of votes: ' + Votersdb.find({userVoter:Meteor.userId()}).count());
        
        // Step 1, see if user has ever voted.
        if (thisVoter.count() === 0 ) {
            // Creates a brand new vote and increments counter
            console.log("Never voted before");
            Meteor.call("userCreatesVote", Meteor.userId(), this._id, points);
            Meteor.call("userIncVoters", this._id);
            
        }else{
            // We know that this user has voted something before
            // Step 2, see if user has voted this person before
            if (Votersdb.find({userVoter:Meteor.userId(), peopleId:this._id }).count === 0) {
                console.log("Never voted this one before");
                Meteor.call("userUpdatesVote", Meteor.userId(), this._id, points);
                // Increment voters
                Meteor.call("userIncVoters", this._id);
            }else{
                console.log("Voted this one before, only update points");
                Meteor.call("userUpdatesVote", Meteor.userId(), this._id, points);
                // Get old points
                var lastVote = Votersdb.findOne({userVoter:Meteor.userId(), peopleId:this._id}).points;

            }
            
        }
        
        // If user votes 7, after having voted 4 yesterday (or whenever)
        // We need to remove 4 from the totalpoints, and add 7
        // ... or just add the difference
        var difference = points - lastVote;
        console.log("Points: " + points + '  Diff: ' + difference + ' lastVote: ' + lastVote);
        
        // Update the totalpoints voting
        Meteor.call("userAddPoints", this._id, difference);
        
    },
    "click .range-slider":function(event){
        var points = event.target.value;
        event.target.nextElementSibling.innerText = points;
    }
    
});
