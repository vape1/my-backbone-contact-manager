ContactManager.Collections.Contacts = Backbone.Collection.extend({
  model: ContactManager.Models.Contact,
    url: 'data/contacts.php'
});
