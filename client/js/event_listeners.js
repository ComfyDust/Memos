///
// Client - Event Listeners
///
//import { Meteor } from 'meteor/meteor';
//import { createEmptyDoc } from './../../packages/prosemeteor/lib/imports/api/documents/both/methods';
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
                memo_owner: Meteor.userId(),
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
        }
    }
});

//Template.template_name.events({
//    'submit .js-class-name': function(event) {
//        var placeholder_var = "placeholder";
//    },
//    'click .js-class-name': function(event) {
//        var placeholder_var = "placeholder";
//    }
//});
