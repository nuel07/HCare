const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.post('/ussd', (req, res) => {
  // Read the variables sent via POST from our API
  const {
    sessionId,
    serviceCode,
    phoneNumber,
    text,
  } = req.body;

  let response = '';
  console.log("text", text)
  let levels = 0 //
  if (text !== "") {
    levels = text.split('*').length
  }
  console.log("levels", levels)
  if (text == '') {
    // This is the first request. Note how we start the response with CON
    response = `CON Welcome to Pearl Care, how can we help?
        1. Consultation
        2. Testing
        3. Anti-natal
        4. Checkup
        5. Emergency`;
  } else if (text == '1') {
    // Business logic for first level response
    response = `CON Select consultation type
        1. Book new appointment
        2. Follow up`;
  }
  else if (text == '2') {
    // Business logic for first level response
    response = `CON Select test type
        1. Malaria
        2. Typhoid
        3. Pregnancy
        4. STD test
        5. Other
        6. Follow up`;
  }
  else if (text == '3') {
    // Business logic for first level response
    response = `CON Select
        1. Book new appointment
        2. Follow up`;
  }
  else if (text == '4') {
    // Business logic for first level response
    response = `CON Select
        1. Book new appointment
        2. Follow up`;
  }
  else if (text == '5') {
    // Business logic for first level response
    response = `CON Select
        1. Proceed
        2. Cancel`;
    //} else if ( text == '') {
    // Business logic for first level response
    // This is a terminal request. Note how we start the response with END
    //response = `CON Your phone number is ${phoneNumber}`;
  } else if (levels == '2') {
    // This is a second level response where the user selected 1 in the first instance
    response = `CON Select time
        1. Morning (9am - 12 pm)
        2. Afternoon (1pm - 3pm)
        3. Evening (4pm - 6pm)`;
    // This is a terminal request. Note how we start the response with END
    //
  }
  else if (levels == '3') {
    response = `CON Payment of UGX 10,000 will be deducted from your mobile money wallet
        1. Proceed
        2. Cancel`;
  }
  else if (levels == '4') {
    response = `CON Enter mobile money pin to confirm
        `;
  }
  else if (levels == '5') {
    response = `END Payment cancelled`;
  }
  else if (levels == '5') {
    response = `END You have been scheduled for an appointment. You will receive a confirmation message shortly`;
  }

  // Send the response back to the API
  res.set('Content-Type: text/plain');
  res.send(response);
});
app.listen(3000, () => { console.log("App listening on port 3000") })