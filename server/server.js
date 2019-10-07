const five = require('johnny-five');
const firebase = require('firebase');

const board = new five.Board();
const firebaseConfig = {
  apiKey: "AIzaSyC94IyH4QS0ezHpWpxKyKvTj3QiO8801_Q",
  authDomain: "iot-project-31c8f.firebaseapp.com",
  databaseURL: "https://iot-project-31c8f.firebaseio.com",
  projectId: "iot-project-31c8f",
  storageBucket: "iot-project-31c8f.appspot.com",
  messagingSenderId: "833064675213",
  appId: "1:833064675213:web:83615f16199b994fc27fc4",
  measurementId: "G-9LJSW34LX1"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

board.on('ready', function() {
  const led = new five.Led(9);
  const db = firebase.firestore();

  // db.collection("leds").doc('led1').get().then(snapshot => console.log(snapshot.data()));
  db.collection("leds")
    .doc('led1')
    .onSnapshot(snapshot => {
      const { on: ledStatus } = snapshot.data();
      console.log('status: ', ledStatus);

      ledStatus ? led.on() : led.off();
    });
});
