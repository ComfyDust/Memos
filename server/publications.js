///
// Server - Publications
///

//Meteor.publish("placeholderFunction", function() {
//    return PLACEHOLDER.find({
//        $or: [
//            {user1Id: this.userId},
//            {user2Id: this.userId}
//        ]
//    });
//});

Meteor.publish("memos", function() {
    return Memos.find();
});
