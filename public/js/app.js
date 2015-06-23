var Contact = Backbone.Model.extend({
	defaults:{
		title: '',
		first_name: '',
		last_name: '',
		contact_num: '',
		email: '',
	}
});

var Contacts = Backbone.Collection.extend({
	model: Contact
});

var ContactView = Backbone.View.extend({
	initialize: function(){
		this.template = _.template($('#ContactView').html());
	},
	render: function(){
		var renderContent = this.template(this.model.toJSON());
		$(this.el).html(renderContent);
		return this;
	}
});

var ContactsView = Backbone.View.extend({
	tagName:'section',
	className: 'row',
	render: function(){
		var thisEl = $(this.el)
		this.collection.each(function(m){
			var view = new ContactView({model:m});
			thisEl.append(view.render().el);
		});

		return this;
	}
});

$(function(){
	var model_1 = new Contact({title:'Mr', fist_name:'dev', last_name:'lim', contact_num:'0111', email:'dummy@none'});
	var model_2 = new Contact({title:'Mr', fist_name:'John', last_name:'Doey', contact_num:'0111', email:'dummy@none'});
	var colection = new Contacts([model_1, model_2]);
	$('#appContainer').append(collection.render().el);
});