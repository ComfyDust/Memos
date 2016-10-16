///
// Client - Router
///

// Router Configuration
Router.configure({
    layoutTemplate: 'main_layout'
});

// Routes - Top Level
Router.route('/', function() {
    this.render("navbar", {to: "header"});
    this.render("splash", {to: "content"});
    this.render("footer", {to: "footer"});
});

// Routes - /memos/:_memo_id
//Router.route('/memos/:_memo_id', function() {
//    this.reander("navbar",     {to: "header"});
//    this.render("placeholder", {to: "main"});
//});

