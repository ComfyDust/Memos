///
// Client - Router
///

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
        this.render('home');
    }
});

// Routes - /memos-shared-with-me
Router.route('/memos-shared-with-me', function () {
    if (Meteor.userId()) {
        this.render('home');
    } else {
        this.redirect('/');
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
