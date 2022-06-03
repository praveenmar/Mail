//import modules installed at the previous step. We need them to run Node.js server and send emails
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const path = require('path');

// create a new Express application instance
const app = express();

//configure the Express middleware to accept CORS requests and parse request body into JSON
app.use(cors({origin: "*"}));
app.use(bodyParser.json());

// app.use(express.static(process.cwd()+"/resourcing/public/"));

// Redirect all the other resquests
app.get('*', (req, res) => {
    res.status(200);
    res.send("This is a node js aplication which sends email");
});

//start application server on port 3000
app.listen(8888, () => {
    console.log("The server started on port 8888");
});

// define a sendmail endpoint, which will send emails and response with the corresponding status
app.post("/api/sendmail", (req, res) => {
    console.log("request came");
    let user = req.body;
    sendMail(user, (err, info) => {
        if (err) {
            console.log(err);
            res.status(400);
            res.send({error: "Failed to send email"});
        } else {
            console.log("Email has been sent");
            res.send(info);
        }
    });
});

const sendMail = (user, callback) => {
    const mailOptions = {
        from: `"pravinmaroju217@gmail.com"`,
        to: user.toMail,
        cc: user.ccMail,
        subject: user.subject,
        html: user.html
    };
    if (user.file !== null && user.file !== undefined) {
        mailOptions.attachments = [{
            filename: user.fileName,
            path: user.file
        }]
    }
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            user: "pravinmaroju217@gmail.com",
            pass: "lscpeustwybteumb"
        }
    });

    transporter.sendMail(mailOptions, callback);
}
