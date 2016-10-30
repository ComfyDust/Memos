///
// Client - Router
///
import { ProseMeteorDoc } from 'meteor/prosemeteor:prosemirror';

// Helper Functions
function update_mod_dates(memos) {
    for (var idx = 0; idx < memos.length; idx++) {
        var memo_id = memos[idx]['_id'];
        memos[idx]["date_modified"] = ProseMeteorDoc.get_mod_date(memo_id);
        Memos.upsert({ _id: memo_id }, memos[idx]);
    }
}

function get_unique_tags(memos) {
    var tags = [];
    for (var idx1 = 0; idx1 < memos.length; idx1++) {
        for (var idx2 = 0; idx2 < memos[idx1]['tags'].length; idx2++) {
            var tag = memos[idx1]['tags'][idx2];

            // If tag is not already in the tags array, add it
            if (tags.indexOf(tag) == -1) {
                tags.push(tag);
            }
        }
    }
    tags.sort();
    
    return tags;
}

// Router Configuration
Router.configure({
    layoutTemplate: 'master_layout'
});

// Routes - Top Level
Router.route('/', {
    waitOn: function () {
        return Meteor.subscribe("memos");
    },
    action: function () {
        if (Meteor.userId()) {
            this.render('home', {
                data: function () {
                    // Get memos
                    var memos = Memos.find({ memo_owner_id: Meteor.userId() }).fetch();

                    // Update memo mod date
                    update_mod_dates(memos);

                    // Get unique tags from result
                    var tags = get_unique_tags(memos);

                    // Get memos with appropriate sort
                    var sort_obj = {};
                    sort_obj[Session.get("sort")] = 1;
                    memos = Memos.find({ memo_owner_id: Meteor.userId() },
                        { sort: sort_obj });

                    // Return memos and tags
                    return { memos: memos, tags: tags };
                }
            });
        } else {
            this.render('home');
        }
    }
});

// Routes - /memos-shared-with-me
Router.route('/memos-shared-with-me', {
    waitOn: function () {
        return Meteor.subscribe("memos");
    },
    action: function () {
        if (Meteor.userId()) {
            this.render('home', {
                data: function () {
                    // Get memos
                    var memos = Memos.find({ shared_with: Meteor.userId() });

                    // Update memo mod date
                    update_mod_dates(memos);

                    // Get unique tags from result
                    var tags = get_unique_tags(memos);

                    // Return memos with appropriate sort
                    var sort_obj = {};
                    sort_obj[Session.get("sort")] = 1;
                    memos = Memos.find({ shared_with: Meteor.userId() },
                        { sort: sort_obj });

                    // Return memos tags
                    return { memos: memos, tags: tags };
                }
            });
        } else {
            this.redirect('/');
        }
    }
});

// Rotues - /memos-shared-with-everyone
Router.route('/memos-shared-with-everyone', function () {
    if (Meteor.userId()) {
        this.render('home');
    } else {
        this.redirect('/');
    }
});

// Routes - /memos/:_memo_name
Router.route('/memos/:memo_name', {
    waitOn: function () {
        return Meteor.subscribe("memos");
    },
    action: function () {
        if (Meteor.userId()) {
            this.render('memo_view', {
                data: function () {
                    return Memos.findOne({ memo_name: this.params.memo_name });
                }
            });
        } else {
            this.redirect('/');
        }
    }
});

// ensureSignedIn plugin

Router.plugin('ensureSignedIn', {
    only: ['memo_list', 'memo_view']
});

// Accounts Template Configuration
AccountsTemplates.configureRoute('changePwd');
AccountsTemplates.configureRoute('enrollAccount');
AccountsTemplates.configureRoute('forgotPwd');
AccountsTemplates.configureRoute('resetPwd');
AccountsTemplates.configureRoute('signIn');
AccountsTemplates.configureRoute('signUp');
AccountsTemplates.configureRoute('verifyEmail');
