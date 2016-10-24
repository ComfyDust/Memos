///
// Client - Helper Functions
///

// Global Helper Functions

//Template.registerHelper('placeholderFunction', function(placeholder_var) {
//    return;
//});

// Template-specific Helper Functions

//Template.template_name.helpers({
//    placeholderFunction: function() {
//        return;
//    }
//});

Template.memo_list.helpers({
    my_memos: function() {
        return Memos.find({ memo_owner: Meteor.userId() });
    }
});
