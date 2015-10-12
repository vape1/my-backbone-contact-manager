ContactManager.Models.Contact = Backbone.Model.extend({
  defaults: {
    name: null,
      phoneNumber: null
  },
    urlRoot: 'data/',
    sync:function(method, model, options) {
        switch (method) {
            case 'delete':
                options.url = 'data/delete.php?id='+model.get('id');
                return Backbone.sync('read', model, options);
            case 'create':
                options.url = 'data/create.php';
                return Backbone.sync(method, model, options);
            case 'update':
                options.url = 'data/update.php';
                return Backbone.sync('create', model, options);
            default :
                return Backbone.sync(method, model, options);
        }
    }

});

