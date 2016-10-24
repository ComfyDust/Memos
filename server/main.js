///
// Server - Main
///

import { Meteor } from 'meteor/meteor';
import { ProseMeteorServer } from 'meteor/prosemeteor:prosemirror';

// Setup ProseMeteor on server
let proseMeteorServer = new ProseMeteorServer({
    snapshotIntervalMs: 5000,
    protocol: 'http'
});
