const nodemailer = require("nodemailer");
const crypto = require("crypto");
const User = require("../models/User");

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL_USER, // your Gmail address
    pass: process.env.EMAIL_PASS, // your Gmail password
  },
});

router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ msg: "User already exists" });

    const verificationToken = crypto.randomBytes(32).toString("hex");
    user = new User({ name, email, password, verificationToken });
    await user.save();

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Account Verification",
      html: `<h2>Verify your email</h2><p>Click <a href="${process.env.FRONTEND_URL}/verify/${verificationToken}">here</a> to verify your account.</p>`,
    };

    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        return res.status(500).json({ msg: "Error sending email" });
      }
      res.status(200).json({ msg: "Verification email sent" });
    });
  } catch (error) {
    res.status(500).send("Server error");
  }
});

router.get("/verify/:token", async (req, res) => {
  const { token } = req.params;
  try {
    const user = await User.findOne({ verificationToken: token });
    if (!user) return res.status(400).json({ msg: "Invalid token" });

    user.isVerified = true;
    user.verificationToken = undefined;
    await user.save();

    res.status(200).json({ msg: "Email verified" });
  } catch (error) {
    res.status(500).send("Server error");
  }
});
