
Meteor.startup(function () {
    // code to run on server at startup
    if (Peopledb.find().count() < thingmenn.length) {
        for (var i = thingmenn.length - 1; i >= 0; i--) {
            Peopledb.insert({
                name: thingmenn[i].name,
                totalpoints: 0,
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
                twitter: thingmenn[i].twitter
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


Meteor.methods({
    adminAddPeople:function(name, party, profilepic){
        
        // TODO Check if user is ADMIN (and logged in)?
        
        Peopledb.insert({
            name:name,
            party:party,
            profilepic:profilepic,
            createdAt : new Date()
            
        });
    },
    
    adminEditPeople:function(thisId, name, party, profilepic){
        
        // TODO Check if user is ADMIN (and logged in)?
        
        Peopledb.update(
            thisId,
            { $set:{
                name:name,
                party:party,
                profilepic:profilepic
            }
        });
    },
    
    adminDeletePeople:function(thisId){
        
        // TODO Check if user is ADMIN (and logged in)?
        
        Peopledb.remove(thisId);
    },
    
    userAddPoints:function(thisId, diff){
        // TODO check if logged in
        
        Peopledb.update(thisId, {$inc:{totalpoints:diff}});
    },
    userIncVoters:function(thisId){
        Peopledb.update(thisId, {$inc:{totalvoters:1}});
    },
    userCreatesVote:function(votee,thisId, points){
        Votersdb.insert({
            userVoter:votee,
            peopleId:thisId,
            points:points
        });
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
    }
})
