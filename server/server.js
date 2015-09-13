
Meteor.startup(function () {
    // code to run on server at startup
    
    if (Peopledb.find().count == 0) {
        Peopledb.people.insert({name:'Katrín', profilepic:'http://www.althingi.is/myndir/thingmenn-cache/690/690-220.jpg', createdAt: new Date(), party:'Vinstri Græn' });
        Peopledb.people.insert({name:'Simmi', profilepic:'http://www.althingi.is/myndir/thingmenn-cache/729/729-220.jpg', createdAt: new Date(), party:'Framsóknarflokkur' });
        Peopledb.people.insert({name:'Bjarni', profilepic:'http://www.althingi.is/myndir/thingmenn-cache/652/652-220.jpg', createdAt: new Date(), party:'Sjálfstæðisflokkur' });
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
    }
})
