const fs = require("fs");
const path = require("path");
const express = require("express");
const { url } = require("inspector");
const app = express();
app.use(express.urlencoded({ extended: false }));

//root level listening for form input
app.get("/", (req, res) => {
  res.send(`
  <form action="/email" method="POST">
  <label>email</label>
  <input type="email" name="eMail" id="e-mail">
  <button>Slap Email !!</button>
  </form>
    `);
});

//posting the input of the form
app.post("/email", (req, res) => {
  const emailInput = req.body.eMail;
  const filePath = path.join(__dirname, "email", "emails.json");
  const fileData = fs.readFileSync(filePath);
  const existingEmails = JSON.parse(fileData);
  existingEmails.push(emailInput);
  fs.writeFileSync(filePath, JSON.stringify(existingEmails));
  console.log(`${emailInput} - has just registered!!`);
  res.send("You'll be notified whenever wo go online !!");
});

//displaying the emails
app.get("/allemails", (req, res) => {
  const filePath = path.join(__dirname, "email", "emails.json");
  const fileData = fs.readFileSync(filePath);
  const existingEmails = JSON.parse(fileData);

  let emailsShown = "<ol>";
  for (const email of existingEmails) {
    emailsShown = "<li>" + email + "</li>";
  }
  emailsShown += "</ol>";
  res.send(emailsShown);
});

//only for niggas!!
app.get("/nigga", (req, res) => {
  res.send("BITCHY ASS NIGGA");
});

//port ot listen for the navigation
app.listen(1920, () => {
  console.log("This is a revision test-api running on localhost:1920");
});
