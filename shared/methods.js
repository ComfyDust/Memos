///
// Shared - Methods
///
import { Accounts } from 'meteor/accounts-base';

Meteor.methods({
    create_new_memo: function (memo_name) {
        console.log("Creating memo with name: " + memo_name);
    }
});
