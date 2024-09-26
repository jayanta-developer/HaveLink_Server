const nodemailer = require("nodemailer");

function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// Function to send OTP to the admin
async function sendOTPEmail(email) {
  const otp = generateOTP();

  // Create a transporter
  const transporter = nodemailer.createTransport({
    service: "gmail", // You can use any SMTP service
    auth: {
      user: "your-email@gmail.com", // Your email
      pass: "your-email-password", // Your email password or app-specific password
    },
  });

  // Mail options
  const mailOptions = {
    from: "HeveLink.com", // Sender address
    to: "HeveLink Admin verification", // List of receivers
    subject: "Your OTP Code", // Subject line
    text: `Your OTP code is ${otp}. This code is valid for 5 minutes.`, // Plain text body
    html: `<p>Your OTP code is <b>${otp}</b>. This code is valid for 5 minutes.</p>`, // HTML body
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: " + info.response);
    return otp; // Return OTP so you can validate it on the server later
  } catch (error) {
    console.error("Error sending email: " + error);
    throw error;
  }
}

exports.LogInAdmin = async (req, res, next) => {
  try {
    const { email } = req.body;
    if (!email) {
      res.status(404).json({
        message: "Please send a email !",
      });
    } else {
      sendOTPEmail(email);
    }

    res.status(200).json({
      status: "success",
      userData: req?.body,
    });
  } catch (error) {
    console.log(error);
    res.json({
      message: error,
    });
  }
};
