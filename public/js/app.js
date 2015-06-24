var Contact = Backbone.Model.extend({
	defaults:{
		title: '',
		first_name: '',
		last_name: '',
		contact_num: '',
		email: '',
	},
	validate: function(attrs, options){
		if(attrs.title == ''){
			return "cannot be empty";
		}
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
		var thisEl = $(this.el);
		collection.each(function(m){
			var view = new ContactView({model:m});
			thisEl.append(view.render().el);
		});

		return this;
	}
});

var NewContactView = Backbone.View.extend({
	tagName:'section',
	className: 'row',
	initialize: function(){
		this.template = _.template($('#newContact').html());
	},
	events:{
		'click #savenewcontact': 'saveNewContact',
	},
	saveNewContact: function(){
		var contact = new Contact();
		contact.set({
			title: $('#title').val(),
			first_name: $('#first_name').val(),
			last_name: $('#last_name').val(),
			contact_num: $('#contact_num').val(),
			email: $('#email').val()
		}, {validate: true});

		contact.on('invalid', function(model, error){
			alert(model.get('title') + " " + error);
		});

		window.collection.add(contact);

		Backbone.history.navigate('', {trigger:true})

	}
	,
	render: function(){
		 $(this.el).html(this.template());
		 return this;
	}
});

var AppRoute = Backbone.Router.extend({
	routes: {
		'': 'homeRoute',
		'create': 'newContactRoute'
	},
	homeRoute: function(e){
		var collectionview = new ContactsView({collection: this.collection});	
		$('#contentContainer').empty().append(collectionview.render().el);
	},
	newContactRoute: function(e){
		var view = new NewContactView({collection:this.collection});
		$('#contentContainer').empty().append(view.render().el);		
	}
});

$(function(){
	window.model_1 = new Contact({title:'Mr', fist_name:'dev', last_name:'lim', contact_num:'0111', email:'dummy@none'});
	window.model_2 = new Contact({title:'Mr', fist_name:'John', last_name:'Doey', contact_num:'0111', email:'dummy@none'});
	window.collection = new Contacts([model_1, model_2]);
	//console.log(collection);
	window.app_route = new AppRoute();
	Backbone.history.start();
});