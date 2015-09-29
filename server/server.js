
Meteor.startup(function () {
    // code to run on server at startup
    if (Meteor.users.find({ "emails.address" : 'admin@whoopshop.com' }).fetch().length > 0) {
        console.log(Meteor.users.find({ "emails.address" : 'admin@whoopshop.com' }).fetch());
    }
    else {
        id = Accounts.createUser(admin);
        Roles.addUsersToRoles(id, 'admin');
        console.log("Admin user " + admin.email + " added. Pw: " + admin.password);
    }
    // id = Accounts.createUser(admin});
    // Roles.addUsersToRoles(id, 'admin');
    // If the number of thingmenn in the DB is less than in the thingmenn object, loop through them and import into db
    if (Peopledb.find().count() == 0) {
        for (var i = thingmenn.length - 1; i >= 0; i--) {
            Peopledb.insert({
                name: thingmenn[i].name,
                totalpoints: 0,
                avgpoints: 0,
                totalvoters: 0,
                profilepic: thingmenn[i].image_url,
                althing_url: thingmenn[i].althing_url, 
                district: thingmenn[i].district, 
                email: thingmenn[i].email, 
                facebook: thingmenn[i].facebook, 
                office: thingmenn[i].office, 
                party: thingmenn[i].party, 
                phone: thingmenn[i].phone, 
                sites: thingmenn[i].sites, 
                twitter: thingmenn[i].twitter,
                createdAt : new Date()
            });
        };
    }

});

// Publish
Meteor.publish("Peoplepub", function(){
    // Everyone can read this
    return Peopledb.find();
});

Meteor.publish("Voterspub", function(){
    // Only a logged in user can see and only see his own votes
    return Votersdb.find({userVoter:this.userId});
});

Meteor.publish("currentUserData", function() {
    return Meteor.users.find({_id: this.userId})
});
Meteor.publish("AllUsers", function() {
    var loggedInUser = Meteor.user();
    if (Roles.userIsInRole(loggedInUser, ['admin'])) {
        return Meteor.users.find();
    }
    else {
        return []
    }
});

Meteor.methods({
    adminAddPeople:function(name, party, profilepic){
        var loggedInUser = Meteor.user();
        if (Roles.userIsInRole(loggedInUser, ['admin'])) {
            Peopledb.insert({
                name:name,
                party:party,
                profilepic:profilepic,
                totalpoints: 0,
                avgpoints: 0,
                totalvoters: 0,
                createdAt : new Date()   
            });
        }
        else {
            throw new Meteor.Error(403, "Not authorized to create new people");
        }
    },
    
    adminEditPeople:function(thisId, name, party, profilepic){
        var loggedInUser = Meteor.user();
        if (Roles.userIsInRole(loggedInUser, ['admin'])) {
            Peopledb.update(
                thisId,
                { $set:{
                    name:name,
                    party:party,
                    profilepic:profilepic
                }
            });
        }
        else {
            throw new Meteor.Error(403, "Not authorized to edit people");
        }
    },
    
    adminDeletePeople:function(thisId){
        var loggedInUser = Meteor.user();
        if (Roles.userIsInRole(loggedInUser, ['admin'])) {
            Peopledb.remove(thisId);
        }
        else {
            throw new Meteor.Error(403, "Not authorized to delete people");
        }
    },
    
    userAddPoints:function(thisId, diff){
        Peopledb.update(thisId, {$inc:{totalpoints:diff}});
    },
    userIncVoters:function(thisId, diff){
        Peopledb.update(thisId, {$inc:{totalvoters:1, totalpoints:diff}});
    },
    userDecVoters: function(thisId, pts){
        pts *= -1;
        Peopledb.update(thisId, {$inc:{totalvoters:-1, totalpoints:pts}});
    },
    userUpdatesVote:function(votee,thisId, points){
        // How many points has a user given a person
        Votersdb.update(
            {
                peopleId:thisId,
                userVoter:votee
            },
            {
                userVoter:votee,
                peopleId:thisId,
                points:points
            },
            {upsert:true}
        );
    },
    personUpdateAvg: function(thisId, points) {
        Peopledb.update(thisId,{$set: {avgpoints:points}})
    }
})

// Facebook logins
ServiceConfiguration.configurations.remove({
    service: 'facebook'
});
// The facebook app info resides in a secret file in lib/fb_secret.js
// It will not be included in the repo
ServiceConfiguration.configurations.insert(fb);

// Add user attributes from facebook to profile
Accounts.onCreateUser(function(options, user) {
    if (options.profile) {
        options.profile.picture = "http://graph.facebook.com/" + user.services.facebook.id + "/picture/?type=large";
        options.profile.thumbnail = "http://graph.facebook.com/" + user.services.facebook.id + "/picture/?type=square";
        user.profile = options.profile;
    }
    return user;
});
