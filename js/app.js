window.ContactManager = {
    Models: {},
    Collections: {},
    Views: {},

    start: function (data) {
        var router = new ContactManager.Router();
        var contacts = new ContactManager.Collections.Contacts();

        contacts.fetch().then(function () {
            var contactsView = new ContactManager.Views.Contacts({collection: contacts});
            $('.main-container').html(contactsView.render().$el);
        });


        router.on('route:home', function () {
            router.navigate('contacts', {
                trigger: true,
                replace: true
            });
        });

        router.on('route:showContacts', function () {
            var contactsView = new ContactManager.Views.Contacts({
                collection: contacts
            });

            $('.main-container').html(contactsView.render().$el);
        });

        router.on('route:newContact', function () {
            var newContactForm = new ContactManager.Views.ContactForm({
                model: new ContactManager.Models.Contact()
            });

            newContactForm.on('form:submitted', function (attrs) {
                contacts.create({
                    name: attrs.name,
                    phoneNumber: attrs.phoneNumber
                }, {
                    wait: true, success: function (collection, response) {
                        router.navigate('contacts', true);
                    }
                });
            });

            $('.main-container').html(newContactForm.render().$el);
        });

        router.on('route:editContact', function (id) {
            var contact = contacts.get(id),
                editContactForm;

            if (contact) {
                editContactForm = new ContactManager.Views.ContactForm({
                    model: contact
                });

                editContactForm.on('form:submitted', function (attrs) {
                    contact.set(attrs);
                    contact.save();
                    router.navigate('contacts', true);
                });

                $('.main-container').html(editContactForm.render().$el);
            } else {
                router.navigate('contacts', true);
            }
        });

        Backbone.history.start();
    }
};
