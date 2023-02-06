const express = require("express");
const app = express();
const nodemailer = require("nodemailer");
const PORT = process.env.PORT || 5000;

//middleware
app.use(express.static("public"));

app.use(express.json());

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/contact.html");
});

app.post("/", (req, res) => {
  console.log(req.body);

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "iqbaldomino40@gmail.com",
      pass: "21May1997",
    },
  });

  const mailOptions = {
    form: req.body.email,
    to: "zaheeriqbal1997@gmail.com",
    subject: `Message from ${req.body.email}: $ {req.body.subject}`,
    text: req.body.message,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.send("error");
    } else {
      console.log("Email sent: " + info.response);
      res.send("success");
    }
  });
});

app.listen(PORT, () => {
  console.log("====================================");
  console.log(`Server running on port ${PORT}`);
  console.log("====================================");
});
