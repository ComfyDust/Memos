import { Meteor } from 'meteor/meteor';
import { createEmptyDoc } from './methods';
import { documentsColl } from './collection';

export default class DocManager {
    /**
    * Creates a new document
    */
    constructor(newDocId, newDocGroupId) {
        createEmptyDoc.call({
            docId: newDocId,
            textContent: 'Demo 1, you can edit this text!',
            groupId: newDocGroupId
        }, (err, res) => {
            if (err) {
                console.error('Error while inserting new doc:', err);
            }
        });
    }

    /**
     * Get modification date of a document
     */
    static get_mod_date(docId) {
        var docs       = documentsColl.find({docId: docId}).fetch();
        var newest_ver = 0;
        var timestamp  = 0;

        for (var idx = 0; idx < docs.length; idx++) {
            var curr_ver = docs[idx]['version'];
            if (curr_ver > newest_ver) {
                newest_ver = curr_ver;
                timestamp = docs[idx]['timestamp'];
            }
        }

        return new Date(timestamp);
    }
}
