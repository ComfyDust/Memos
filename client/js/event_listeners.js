///
// Client - Event Listeners
///
import { ProseMeteorDoc } from 'meteor/prosemeteor:prosemirror';

// Memo List event listeners
Template.memo_list.events({
    'click .js-show-new-memo-modal': function (event) {
        // Show the New Memo Modal
        $('#new_memo_modal').modal('show');
    },
    'submit #new_memo_form': function (event) {
        var target = event.target;
        event.preventDefault();

        // Get the new memo name
        var new_memo_name = target.new_memo_name.value;

        if (Memos.findOne({ memo_name: new_memo_name })) {
            // If the memo already exists, display an error in the form
            $("#new_memo_form").addClass("has-error");
            $("#memo_name_help").text("A memo with that name already exists.");
        } else {
            // Insert new memo into collection
            var new_memo_id = Memos.insert({
                memo_name: new_memo_name,
                memo_owner_id: Meteor.userId(),
                shared_with: [],
                tags: [],
                date_created: new Date()
            });

            // Create new Prosemeteor doc
            var new_doc = new ProseMeteorDoc(new_memo_id, Meteor.userId());

            // Hide modal and redirect to new memo
            $('#new_memo_modal')
                .on('hidden.bs.modal', function () {
                    Router.go('/memos/' + encodeURI(new_memo_name));
                })
                .modal('hide');

            return;
        }
    }
});

Template.memo_view.events({
    'click .js-show-permissions-modal': function (event) {
        $('#permissions_modal').modal('show');
    },
    'submit #permissions_form': function (event) {
        var target = event.target;
        event.preventDefault();

        // Get memo
        var memo = Memos.findOne({ _id: target.memo_id.value });
        if (!memo) {
            // User is messing with the hidden field
            return;
        }

        // Get email address
        var email = target.email_address.value;
        var user = Meteor.users.findOne({ "emails.address": email });

        if (!user) {
            // If user doesn't exist, display an error
            $("#permissions_form").addClass("has-error");
            $("#email_help").text("User not found.");
        } else if (user._id == Meteor.userId()) {
            // If the user entered themself, display an error
            $("#permissions_form").addClass("has-error");
            $("#email_help").text("You already own this memo! =P");
        } else if (memo.shared_with.indexOf(user._id) != -1) {
            // If the memo is already shared with the user, display an error
            $("#permissions_form").addClass("has-error");
            $("#email_help")
                .text("This memo is already shared with that user! =P");
        } else {
            // Upsert memo
            memo.shared_with.push(user._id);
            Memos.upsert({ _id: memo._id }, memo);

            // Remove error and clear input
            $("#permissions_form").removeClass("has-error");
            $("#email_help").text("");
            $("#email_input").val("");
        }

        return;
    },
    'submit #tags_form': function (event) {
        var target = event.target;
        event.preventDefault();

        // Get memo
        var memo = Memos.findOne({ _id: target.memo_id.value });
        if (!memo) {
            // User is messing with the hidden field
            return;
        }

        // Get tag
        var tag = target.new_tag.value;

        // Upsert memo
        if (memo.tags.indexOf(tag) == -1) {
            // If the memo does not already have this tag, upsert it
            memo.tags.push(tag);
            Memos.upsert({ _id: memo._id }, memo);

            // Remove error and clear input
            $("#tag_input").val("");
        }

        return;
    }
});
