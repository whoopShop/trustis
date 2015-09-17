
Meteor.startup(function () {
    // code to run on server at startup
    
    if (Peopledb.find().count() == 0) {
        Peopledb.insert({name:'Katrín', totalpoints:0, totalvoters:0, profilepic:'http://www.althingi.is/myndir/thingmenn-cache/690/690-220.jpg', createdAt: new Date(), party:'Vinstri Græn' });
        Peopledb.insert({name:'Simmi', totalpoints:0, totalvoters:0, profilepic:'http://www.althingi.is/myndir/thingmenn-cache/729/729-220.jpg', createdAt: new Date(), party:'Framsóknarflokkur' });
        Peopledb.insert({name:'Bjarni', totalpoints:0, totalvoters:0, profilepic:'http://www.althingi.is/myndir/thingmenn-cache/652/652-220.jpg', createdAt: new Date(), party:'Sjálfstæðisflokkur' });
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
