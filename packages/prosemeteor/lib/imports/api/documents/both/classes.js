import { Meteor } from 'meteor/meteor';
import { createEmptyDoc } from './methods';

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
}
