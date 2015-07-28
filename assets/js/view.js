var extView=Backbone.View.extend({
	el:$('#postMess'),
	initialize: function(){
		this.render();
	},
	remove: function(){
		this.$el.empty();
		this.off().undelegateEvents().stopListening();
		return this;
	},
	render: function(){
		var self=this;
		$.get('./layouts/'+this.name+'.html',function(rs){
			var template=_.template(rs);
			self.$el.html( template(self.model.attributes || {models: self.model.toJSON()}) );
		});
	}
});
var postMess=extView.extend({
	name:'postMess',
	initialize: function(){
        this.mess=new Mess_model;
        this.model=new Messes_model;
        var self=this;
        this.model.fetch({success: function(){
            self.render();
        }});
	},
	events:{
		'click #back':'changePage',
        'click #su':'submit',
        'change #name':'setValue',
        'change #message':'setValue',
	},
	changePage:function(){
		workspace.navigate('',{trigger: true});
    },
    submit: function(e){
        var self=this;
        this.mess.save({},{
            success: function(rs){
                self.model.add(self.mess);
                self.render();
                var root=self.mess.get('rootMess');
                self.mess=new Mess_model;
                self.mess.set('rootMess',root);
            }
        });
    },
    setValue: function(event){
        this.mess.set(event.target.id,event.target.value);
    }
});
var replyMess = postMess.extend({
    initialize: function(){
        var self=this;
        this.mess=this.model;
        
        this.model=new Messes_model;
        this.model.url='/mess/'+this.mess.get('rootMess');
        this.model.fetch({success: function(){
            self.render();
        }});
    }
});
