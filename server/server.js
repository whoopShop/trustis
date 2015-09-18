
Meteor.startup(function () {
    // code to run on server at startup

    // If the number of thingmenn in the DB is less than in the thingmenn object, loop through them and import into db
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
