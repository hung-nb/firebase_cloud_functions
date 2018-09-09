const functions = require('firebase-functions');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

// HTTP trigger > Server receive a request > Send back to client a message
// https://<project>.cloudfunctions.net/helloWorld
exports.helloWorld = functions.https.onRequest((req, res) => {
    res.send("Hello from Firebase!");
});

// HTTP trigger > Server receive a request > Insert into Realtime DB
// https://<project>.cloudfunctions.net/insertIntoDB?text=abcDEFG
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

exports.insertIntoDB = functions.https.onRequest((req, res) => {
    const text = req.query.text;
    admin.database().ref('/test').push({text: text})
        .then(snapshot => {
            return res.redirect(303, snapshot.ref);
        })
        .catch(error => console.log(error))
});

// // DB trigger
// exports.convertToUppercase = functions.database.ref('/test/{pushId}/text').onWrite(event => {
//     const text = event.data.val();
//     const uppercaseText = text.toUpperCase();
//     return event.data.ref.parent.child('uppercaseText').set(uppercaseText);
// });