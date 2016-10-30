///
// Client - Helper Functions
///
import { DocumentsCollection } from 'meteor/prosemeteor:prosemirror';

// Global Helper Functions
Template.registerHelper('get_email_address', function (user_id) {
    return Meteor.users.findOne({ _id: user_id }).emails[0].address;
});

Template.registerHelper('viewing_owned_memos', function () {
    // Checks whether viewing owned memos
    var curr_route = Router.current().route.getName();
    return !curr_route; // Return true if route is undefined (i.e., '/')
});

// Template-specific Helper Functions

Template.memo_list_view.helpers({
    // Selected view functions
    show_icon_view: function () {
        return Session.get("view") == "icons";
    },
    show_detail_view: function () {
        return Session.get("view") == "details";
    },

    // Selected sort functions
    show_name_sort: function () {
        return Session.get("sort") == "name";
    },
    show_creation_date_sort: function () {
        return Session.get("sort") == "creation_date";
    },
    show_modification_date_sort: function () {
        return Session.get("sort") == "modification_date";
    },
    show_owner_sort: function () {
        return Session.get("sort") == "owner";
    }
});
