ContactManager.Views.Contact = Backbone.View.extend({
  tagName: 'li',
  className: 'media col-md-6 col-lg-4',
  template: _.template($('#tpl-contact').html()),

  events: {
    'click .delete-contract': 'onClickDelete'
  },

  initialize: function() {
    this.listenTo(this.model, 'remove', this.remove);
  },

  render: function() {
    var html = this.template(this.model.toJSON());
    this.$el.append(html);
    return this;
  },

  onClickDelete: function(e) {
    e.preventDefault();
      this.model.destroy();
  }
});

ContactManager.Views.ContactForm = Backbone.View.extend({
    template: _.template($('#tpl-new-contact').html()),

    events: {
        'submit .contract-form': 'onFormSubmit'
    },

    render: function() {
        var html = this.template(_.extend(this.model.toJSON(), {
            isNew: this.model.isNew()
        }));
        this.$el.append(html);
        return this;
    },

    onFormSubmit: function(e) {
        e.preventDefault();

        this.trigger('form:submitted', {
            name: this.$('.contact-name-input').val(),
            phoneNumber: this.$('.contact-tel-input').val()
        });
    }
});

ContactManager.Views.Contacts = Backbone.View.extend({
    template: _.template($('#tpl-contacts').html()),

    renderOne: function(contact) {
        var itemView = new ContactManager.Views.Contact({model: contact});
        this.$('.contacts-container').append(itemView.render().$el);
    },

    render: function() {
        var html = this.template();
        this.$el.html(html);

        this.collection.each(this.renderOne, this);

        return this;
    }
});
