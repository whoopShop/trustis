Router.configure({
    layoutTemplate:'mybody'
})

Router.route('/', function () {
  this.render('people', {
    // data: function () { return Items.findOne({_id: this.params._id}); }
  });
});



Router.route('/admin');

Router.route('/admin/edit/:_id',{
    name:'editPeople',
    data:function(){
        var thisId = Peopledb.findOne({_id:new Mongo.Collection.ObjectID(this.params._id)});
        return thisId;
    }
})
