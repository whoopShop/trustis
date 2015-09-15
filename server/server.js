
Meteor.startup(function () {
    // code to run on server at startup
    
    if (Peopledb.find().count() == 0) {
        Peopledb.insert({name:'Katrín', totalpoints:32, totalvoters:9, profilepic:'http://www.althingi.is/myndir/thingmenn-cache/690/690-220.jpg', createdAt: new Date(), party:'Vinstri Græn' });
        Peopledb.insert({name:'Simmi', totalpoints:31, totalvoters:8, profilepic:'http://www.althingi.is/myndir/thingmenn-cache/729/729-220.jpg', createdAt: new Date(), party:'Framsóknarflokkur' });
        Peopledb.insert({name:'Bjarni', totalpoints:30, totalvoters:7, profilepic:'http://www.althingi.is/myndir/thingmenn-cache/652/652-220.jpg', createdAt: new Date(), party:'Sjálfstæðisflokkur' });
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
    
    userAddPoints:function(thisId, points){
        // TODO check if logged in
        
        Peopledb.update(thisId, {$inc:{totalpoints:points}});
    },
    userRemovePoints:function(thisId){
        // TODO check if logged in
        Peopledb.update(thisId, {$inc:{totalpoints:-1}});
    },
    userIncVoters:function(thisId){
        Peopledb.update(thisId, {$inc:{totalvoters:1}});
    },
    
    userCreatesVote:function(thisId, points){
        // How many points has a user given a person
        Votersdb.update(
            {peopleId:thisId},
            {
                peopleId:thisId,
                points:points
            },
            {upsert:true}
        );
    }
})
