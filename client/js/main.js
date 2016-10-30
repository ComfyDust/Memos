///
// Client - Main
///
import { Session } from 'meteor/session';

// Set view and sort session variables if not set
if (!Session.get("view")) {
    Session.set("view", "icons");
}

if (!Session.get("sort")) {
    Session.set("sort", "name");
}
