///
// Client - Helper Functions
///
import { DocumentsCollection } from 'meteor/prosemeteor:prosemirror';

// Global helper functions
Template.registerHelper('get_email_address', function (user_id) {
    return Meteor.users.findOne({ _id: user_id }).emails[0].address;
});

Template.registerHelper('get_curr_route', function () {
    return Router.current().route.getName();
});

Template.registerHelper('viewing_owned_memos', function () {
    // Checks whether viewing owned memos
    var curr_route = Router.current().route.getName();
    return curr_route == "my-memos";
});

Template.registerHelper('generate_tag_uri', function (new_tag) {
    // In memo list view, checks the current URI and adds new_tag to it
    var path = "/" + Router.current().route.getName();
    var curr_tags = Router.current().params.query['tags'];

    if (!curr_tags) {
        path += "?tags=" + new_tag;
    } else {
        path += "?tags=" + curr_tags + "," + new_tag;
    }

    return path;
});

Template.registerHelper('format_date', function(iso_date) {
    var date_array = iso_date.toString().split(" ");

    // "Mmm DD, YYYY HH:MM:SS"
    return date_array[1] + " " + date_array[2] + ", "
         + date_array[3] + " "+ date_array[4];
});

// Memo List helper functions
Template.memo_list.helpers({
    // Returns title for Memo List page while setting the page's header title
    //   and active tab
    get_memo_list_title: function () {
        var title = "";
        var curr_route = Router.current().route.getName();

        // Set active navbar tab
        $("#nav-list>li.active").removeClass("active");
        $("#nav-" + curr_route).addClass("active");

        // Get page title
        switch (curr_route) {
            case "my-memos":
                title = "My Memos";
                break;
            case "memos-shared-with-me":
                title = "Memos Shared with Me";
                break;
            case "memos-shared-with-everyone":
                title = "Memos Shared with Everyone";
                break;
        }

        // Set header title
        document.title = "Memos: " + title;

        return title;
    }
});

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

Template.memo_list_tag_breadcrumbs.helpers({
    // Get currently filtered tags
    get_filtered_tags: function () {
        var query_tags = Router.current().params.query['tags'];
        var tags_array = [];

        if (query_tags) {
            tags_array = query_tags.split(",");
        }

        return tags_array;
    }
});

// Memo View helper functions
Template.memo_view.helpers({
    // Set HTML header title
    set_header_title: function (memo_name) {
        document.title = "Memos: " + memo_name;
    },
    // Indicates whether the current user owns the viewed memo
    curr_user_owns_memo: function (memo_owner_id) {
        return memo_owner_id == Meteor.userId();
    }
});

Template.memo_view_metadata.helpers({
    // Indicates whether the current user owns the viewed memo
    curr_user_owns_memo: function (memo_owner_id) {
        return memo_owner_id == Meteor.userId();
    }
});
