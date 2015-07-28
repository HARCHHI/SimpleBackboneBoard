var Router=Backbone.Router.extend({
	routes: {
		'mess/:id': 'viewSingle',
		'*frag': 'defaultRouter'
	},
	viewSingle: function(id){
		if(this.view) this.view.remove();
		this.view=new replyMess({model:new Mess_model({'rootMess': id})});
	},
	defaultRouter: function(frag){
		if(this.view) this.view.remove();
        this.view=new postMess;
	}
});
$(function(){
    window.workspace=new Router();
    Backbone.history.start();
})