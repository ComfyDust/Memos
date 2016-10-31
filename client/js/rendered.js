///
// Client - Rendered
///
import { Session } from 'meteor/session';
import { ProseMeteorEditor } from 'meteor/prosemeteor:prosemirror';

// Memo List - Selection
Template.memo_list_selection.onRendered(function () {
    var view = Session.get("view");
    var sort = Session.get("sort");

    // Set selected view and sort options
    $('#view_selector option[value="' + view + '"]').attr("selected", "selected");
    $('#sort_selector option[value="' + sort + '"]').attr("selected", "selected");
});

// Memo View - Content Editor
Template.memo_view_content_editor.onRendered(function () {
    var memo_name = decodeURI(window.location.pathname.replace("/memos/", ""));

    // Search for a memo belonging to the current user
    var memo = Memos.findOne({
        memo_name: memo_name,
        memo_owner_id: Meteor.userId()
    });

    // If no memo was found, search for shared memos
    if (!memo) {
        memo = Memos.findOne({
            memo_name: memo_name,
            shared_with: Meteor.userId()
        });
    }

    // If a memo still wasn't found, re-direct the user to the homepage
    if (!memo) {
        Router.go('/');
    }

    // Otherwise, render the text editor
    let editor1 = new ProseMeteorEditor({
        docId: memo._id,
        proseMirrorOptions: {
            place: document.getElementById('memo_editor'),
            menuBar: true,
            autoInput: true,
            tooltipMenu: { selectedBlockMenu: true }
        }
    });
});
