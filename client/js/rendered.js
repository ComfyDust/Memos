///
// Client - Rendered
///
import { ProseMeteorEditor } from 'meteor/prosemeteor:prosemirror';

// Memo View Content Editor rendered function
Template.memo_view_content_editor.rendered = function() {
    var memo_name = decodeURI(window.location.pathname.replace("/memos/", ""));
    
    var memo = Memos.findOne({
        memo_name: memo_name,
        memo_owner: Meteor.userId()
    });
    
    let editor1 = new ProseMeteorEditor({
        docId: memo._id,
        proseMirrorOptions: {
            place: document.getElementById('memo_editor'),
            menuBar: true,
            autoInput: true,
            tooltipMenu: { selectedBlockMenu: true }
        }
    });
};
