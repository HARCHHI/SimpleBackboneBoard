var Mess_model=Backbone.Model.extend({
	urlRoot:'/mess',
    idAttribute: '_id',
    defaults: {
        name: '',
        message: '',
        rootMess: ''
    }

});

var  Messes_model = Backbone.Collection.extend({
    url: '/mess',
    model: Mess_model
});