const Link = require("../models/ExpiryLink");
const nodemailer = require("nodemailer");
const { v4: uuidv4 } = require("uuid");
// const transporter = nodemailer.createTransport({
//   host: "smtp.ethereal.email",
//   port: 587,
//   auth: {
//     user: "audrey70@ethereal.email",
//     pass: "bFrKShd6NfbwzChsbx",
//   },
// });
// const mailOptions = {
//   from: "sinhayash63@gmail.com",
//   to: "audrey70@ethereal.email",
//   subject: "app download link",
//   text: "Hello this is your app download link",
// };
const getforgorPasswordLink = async (req, res) => {
  const token = uuidv4();
  console.log(token);
  const { email } = req.body;
  const currentDate = new Date();
  const expireDate = new Date(currentDate);
  expireDate.setMinutes(currentDate.getMinutes() + 1);

  const newLink = new Link({
    token: token,
    createdAt: currentDate,
    expireAt: expireDate,
  });

  try {
    await newLink.save();
    const url = `http://localhost:5173/resetpassword/?token=${newLink.token}`;
    console.log(url);
    res.status(200).json({ url: url, data: newLink });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

// check the token validity
const getotkenvalidity = async (req, res) => {
  const { token } = req.query;
  try {
    const tokenvalidty = await Link.findOne({ token: token });
    const currentDate = new Date();
    if (tokenvalidty.expireAt > currentDate) {
      res.status(200).json({ valid: true });
    } else {
      res.status(200).json({ valid: false });
    }
  } catch (error) {
    res.status(404).json({ error: "Token not found" });
  }
};
module.exports = { getforgorPasswordLink , getotkenvalidity };

// nodemailer setup
/*
to creat a mail you need a transporter , transport and the defaults settingh 




*/
