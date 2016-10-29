///
// Client - Helper Functions
///

// Global Helper Functions

//Template.registerHelper('placeholderFunction', function(placeholder_var) {
//    return;
//});

Template.registerHelper('get_email_address', function(user_id) {
    return Meteor.users.findOne({_id: user_id}).emails[0].address;
})

// Template-specific Helper Functions

//Template.template_name.helpers({
//    placeholderFunction: function() {
//        return;
//    }
//});

Template.memo_list.helpers({
    my_memos: function() {
        return Memos.find({ memo_owner_id: Meteor.userId() });
    }
});
