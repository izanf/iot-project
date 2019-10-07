import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Switch } from "@material-ui/core";
import firebase from 'firebase';

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

firebase.initializeApp(firebaseConfig);

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 500px;
`;

const InputGroup = styled.div``;

const Label = styled.label``;


const Dashboard = () => {
  const [ledStatus, setLedStatus] = useState(false);
  const db = firebase.firestore();

  useEffect(() => {
    db.collection("leds")
      .doc('led1')
      .get()
      .then(snapshot => {
        const { on: status } = snapshot.data();
        setLedStatus(status);
      });
  })

  const handleLedStatus = () => {
    setLedStatus(!ledStatus);
    db.collection("leds")
    .doc('led1')
    .set({ on: !ledStatus})
  }

  return (
    <Container>
      <InputGroup>
        <Label>Led status</Label>
        <Switch checked={ledStatus} onChange={() => handleLedStatus()} />
      </InputGroup>
    </Container>
  );
};

export default Dashboard;
