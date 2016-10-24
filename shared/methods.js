///
// Shared - Methods
///

Meteor.methods({
    placeHolder: function (dummy_var) {
        console.log("Placeholder function for Meteor methods.");
    },
    create_new_memo: function (memo_name) {
        console.log("Creating memo with name: " + memo_name);
    }
});
