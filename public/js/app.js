var Contant = Backbone.Model.extend({
	defaults:{
		title: '',
		first_name: '',
		last_name: '',
		contact_num: '',
		email: '',
	}
});

var Contants = Backbone.Collection.extend({
	model: Contant;
});

var CotantView = Backbone.View.extend({
	initialize: function(){
		var template;
	}
});