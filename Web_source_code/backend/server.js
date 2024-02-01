const express = require("express");
const mysql = require("mysql");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const multer = require("multer");
const nodemailer = require("nodemailer");

const port = 8000;

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../uploads");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({ storage: storage });

const app = express();
app.use(
  cors({
    credentials: true,
    origin: true, // Allow all origins
  })
);

app.use(express.json());
app.use(cookieParser());
app.use(
  session({
    secret: "yourSecretKey",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true },
  })
);

//-------------------------------------------DATABASE CONNECTION----------------------------------------------------

let db;

function handleDisconnect() {
  db = mysql.createConnection({
    host: "103.145.51.250",
    user: "pocvratrixdb",
    password: "E1t3rz7$9",
    database: "pocvratrixdb",
  });

  db.connect(function (err) {
    if (err) {
      console.error("Error connecting to database:", err);
      setTimeout(handleDisconnect, 2000);
    }
  });

  db.on("error", function (err) {
    console.error("Database error:", err);
    if (
      err.code === "PROTOCOL_CONNECTION_LOST" ||
      err.code === "ECONNREFUSED"
    ) {
      handleDisconnect();
    } else {
      throw err;
    }
  });
}

handleDisconnect();

const transporter = nodemailer.createTransport({
  host: "smtp.office365.com",
  port: 25,
  secure: "ENCRYPTION" === "tls",
  auth: {
    user: "dev@waysaheadglobal.com",
    pass: "Singapore@2022",
  },
});

process.on("SIGINT", function () {
  console.log("Caught interrupt signal, closing database connection.");
  db.end(function (err) {
    process.exit(err ? 1 : 0);
  });
});

app.get("/", (req, res) => {
  const q = "SELECT * from users";
  db.query(q, (err, data) => {
    if (err) {
      return res.json(err);
    }
    return res.json(data);
  });
});

app.post("/signup/otp", async (req, res) => {
  const email = req.body.email;
  const name = req.body.name;

  // Check if the email already exists in the database
  const checkUserExistQuery = "SELECT user_id FROM users WHERE email = ?";
  const checkUserExistValues = [email];

  db.query(
    checkUserExistQuery,
    checkUserExistValues,
    async (userExistError, userExistResult) => {
      if (userExistError) {
        return res.status(500).send("Internal Server Error");
      }

      if (userExistResult.length > 0) {
        // User with the same email already exists
        return res.status(400).send("User already exists. Log-in instead.");
      }

      // Generate a random 4-digit OTP
      const otp = Math.floor(1000 + Math.random() * 9000);

      const HTML = `<!DOCTYPE html>
    <html>
    <head>
        <meta name="viewport" content="width=device-width">
        <title>VRATRIX Welcome and OTP Verification</title>
        <style type="text/css">
            @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap');
    
            @media only screen and (max-width: 599px) {
                .tableCon {
                    width: 100% !important;
                }
                .midText {padding: 15px !important; font-size: 16px !important; line-height: 26px !important;}
                .serviceCon {padding: 0 15px 15px 15px !important;}
                .serviceHd {font-size: 26px !important;}
                .serviceSubHd {font-size: 20px !important;}
            }
        </style>
    </head>
    
    <body style="margin:10px; background:#fff;">
        <table border="0" cellspacing="0" cellpadding="0" class="tableCon" width="800" align="center"
            style="font-family: 'Roboto', sans-serif; color: #000; border: 1px solid #eeeeee;">
            <tr>
                <td bgcolor="#404B60" align="center"><br></td>
            </tr>
            <tr>
                <td class="midText" style="padding: 35px; font-family: 'Roboto', sans-serif; color: #404B60; font-size: 20px; line-height: 30px;">
                    
                    Dear ${name} <br><br>
                    Welcome to VRATRIX! We are excited to have you on board.<br>
                    Your OTP for account verification is: <strong>${otp}</strong><br><br>
                    Please use this OTP to complete the verification process. If you didn't request this, please ignore this message.<br><br>
                    
                    Best regards,<br>
                    The VRATRIX Team
                </td>
            </tr>       
            <tr>
                <td bgcolor="#8B3DFF" style="padding: 20px 0;">
                    <table width="100%" border="0" cellspacing="0" cellpadding="0">
                        <tr>
                            <td align="center" style="padding-bottom: 10px;"><a href="#" style="font-family: 'Roboto', sans-serif; color: #fff; font-size: 16px; text-decoration: none;">Privacy Policy</a></td>
                        </tr>
                        <tr>
                            <td align="center" style="font-family: 'Roboto', sans-serif; color: #fff; font-size: 16px;">Copyright &copy; 2024 VRATRIX</td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
    </body>
    </html>
    `;

      try {
        const mailOptions = {
          from: "dev@waysaheadglobal.com",
          to: email,
          subject: "Your OTP for Account Verification",
          html: HTML.replace("${otp}", otp), // Replace '${otp}' with the actual variable
        };

        const info = await transporter.sendMail(mailOptions);
        const timestamp = new Date()
          .toISOString()
          .slice(0, 19)
          .replace("T", " ");

        console.log("Email sent:", info.response);
        const saveOTPQuery =
          "INSERT INTO users (otp, email_verified_at, email) VALUES (?, ?, ?)";
        db.query(
          saveOTPQuery,
          [otp, timestamp, email],
          (saveOTPError, saveOTPResult) => {
            if (saveOTPError) {
              return res.json({ success: false, message: saveOTPError });
            }

            return res.json({
              success: true,
              message: "OTP sent successfully",
            });
          }
        );
      } catch (error) {
        console.error("Error sending email:", error);
        return res.json({ success: false, message: "Error sending email" });
      }
    }
  );
});

app.post("/login/otp", (req, res) => {
  const email = req.body.email;

  // Check if the user exists
  const checkUserQuery = "SELECT * FROM users WHERE email = ?";
  db.query(checkUserQuery, [email], async (checkUserError, checkUserResult) => {
    if (checkUserError) {
      return res.status(500).send("Internal Server Error");
    }

    if (checkUserResult.length === 0) {
      // User does not exist, return an error
      return res.status(400).send("User does not exist");
    }

    // Generate a random 4-digit OTP
    const otp = Math.floor(1000 + Math.random() * 9000);

    // Update your email template with the OTP
    const HTML = `<!DOCTYPE html>
    <html>
    <head>
        <meta name="viewport" content="width=device-width">
        <title>VRATRIX OTP Verification</title>
        <style type="text/css">
            @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap');
    
            @media only screen and (max-width: 599px) {
                .tableCon {
                    width: 100% !important;
                }
                .midText {padding: 15px !important; font-size: 16px !important; line-height: 26px !important;}
                .serviceCon {padding: 0 15px 15px 15px !important;}
                .serviceHd {font-size: 26px !important;}
                .serviceSubHd {font-size: 20px !important;}
            }
        </style>
    </head>
    
    <body style="margin:10px; background:#fff;">
        <table border="0" cellspacing="0" cellpadding="0" class="tableCon" width="800" align="center"
            style="font-family: 'Roboto', sans-serif; color: #000; border: 1px solid #eeeeee;">
            <tr>
                <td bgcolor="#404B60" align="center"><br></td>
            </tr>
            <tr>
                <td class="midText" style="padding: 35px; font-family: 'Roboto', sans-serif; color: #404B60; font-size: 20px; line-height: 30px;">
                    
                    Dear ${email} <br><br>
                    Your OTP for account verification is: <strong>${otp}</strong><br><br>
                    Please use this OTP to complete the verification process. If you didn't request this, please ignore this message.<br><br>
                    
                    Best regards,<br>
                    The VRATRIX Team
                </td>
            </tr>       
            <tr>
                <td bgcolor="#8B3DFF" style="padding: 20px 0;">
                    <table width="100%" border="0" cellspacing="0" cellpadding="0">
                        <tr>
                            <td align="center" style="padding-bottom: 10px;"><a href="#" style="font-family: 'Roboto', sans-serif; color: #fff; font-size: 16px; text-decoration: none;">Privacy Policy</a></td>
                        </tr>
                        <tr>
                            <td align="center" style="font-family: 'Roboto', sans-serif; color: #fff; font-size: 16px;">Copyright &copy; 2024 VRATRIX</td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
    </body>
    </html>`;

    try {
      const mailOptions = {
        from: "dev@waysaheadglobal.com",
        to: email,
        subject: "Your OTP for Account Verification",
        html: HTML,
      };

      // Send the email with OTP
      const info = await transporter.sendMail(mailOptions);
      console.log("Email sent:", info.response);

      // Save the OTP in the database
      const saveOTPQuery = "UPDATE users SET otp = ? WHERE email = ?";
      db.query(saveOTPQuery, [otp, email], (saveOTPError, saveOTPResult) => {
        if (saveOTPError) {
          return res.json({ success: false, message: "Error saving OTP" });
        }

        return res.json({ success: true, message: "OTP sent successfully" });
      });
    } catch (error) {
      console.error("Error sending email:", error);
      return res.json({ success: false, message: "Error sending email" });
    }
  });
});

//-------------------------------------------LOGIN/SIGNUP METHODS----------------------------------------------------

app.post("/login", (req, res) => {
  const email = req.body.email;
  const otp = Number(req.body.otp);

  const query = "SELECT * FROM users WHERE email = ?";
  db.query(query, [email], (err, results) => {
    if (err) {
      return res.json(err);
    } else {
      if (results.length > 0) {
        const storedOtp = results[0].otp;

        if (Number(otp) === storedOtp) {
          res.cookie("user_id", results[0].user_id, {
            maxAge: 86400000,
            httpOnly: false,
          });
          res.cookie("Subscription", results[0].subscription, {
            maxAge: 86400000,
            httpOnly: false,
          });

          return res.json({
            message: "Login successful",
            user: results[0].user_id,
            status: results[0].status,
          });
        } else {
          return res.json({ message: "Invalid credentials" });
        }
      } else {
        return res.json(results);
      }
    }
  });
});

app.post("/signup", (req, res) => {
  const created_at = new Date().toISOString().slice(0, 19).replace("T", " ");
  const updated_at = created_at;

  // Check if the provided OTP matches the stored OTP for the given email
  const checkOTPQuery = "SELECT user_id FROM users WHERE email = ? AND otp = ?";
  const checkOTPValues = [req.body.email, Number(req.body.otp)];

  db.query(checkOTPQuery, checkOTPValues, (otpCheckError, otpCheckResult) => {
    if (otpCheckError) {
      return res.status(500).send("Internal Server Error");
    }

    if (otpCheckResult.length === 0) {
      // Invalid OTP provided
      return res.status(400).send("Invalid OTP provided");
    }

    // Check if the phone number or email already exist in the database
    const checkUserExistQuery =
      "SELECT user_id FROM users WHERE phone = ? OR email = ?";
    const checkUserExistValues = [req.body.phone, req.body.email];

    db.query(
      checkUserExistQuery,
      checkUserExistValues,
      (userExistError, userExistResult) => {
        if (userExistError) {
          return res.status(500).send("Internal Server Error");
        }

        if (userExistResult.length > 1) {
          // User with the same phone number or email already exists
          return res.status(400).send("User already exists");
        }

        // Valid OTP and user does not already exist, proceed with the user update
        const updateUserQuery =
          "UPDATE users SET name=?, phone=?, created_at=?, updated_at=? WHERE email=? AND otp=?;";
        const updateUserValues = [
          req.body.name,
          req.body.phone,
          created_at,
          updated_at,
          req.body.email,
          req.body.otp,
        ];

        db.query(
          updateUserQuery,
          updateUserValues,
          (updateError, updateResult) => {
            if (updateError) {
              return res.json(updateError);
            } else {
              res.json("Signed Up successfully");
            }
          }
        );
      }
    );
  });
});

app.get("/userdata/:user_id", (req, res) => {
  const user_id = req.params.user_id;
  const q = "SELECT * FROM users WHERE user_id = ?";
  db.query(q, [user_id], (err, data) => {
    if (err) {
      console.log(err);
      return res.json(err);
    }
    return res.json(data);
  });
});

app.post("/subscription/:user_id", (req, res) => {
  const user_id = req.params.user_id;
  const newSubscription = Number(req.body.subscription);

  // Check if the user exists
  const checkUserQuery = "SELECT * FROM users WHERE user_id = ?";
  db.query(checkUserQuery, [user_id], (checkUserError, checkUserResult) => {
    if (checkUserError) {
      return res.status(500).send("Internal Server Error");
    }

    if (checkUserResult.length === 0) {
      // User does not exist, return an error
      return res.status(400).send("User does not exist");
    }

    let updateSubscriptionQuery = "";
    let updateValues = [];

    if (newSubscription >= 4 && newSubscription <= 6) {
      // For subscription values 8, 9, or 10, update only the subscription field
      updateSubscriptionQuery =
        "UPDATE users SET subscription=? , sub_expires_at=NULL WHERE user_id=?";
      updateValues = [newSubscription, user_id];
    } else {
      // For other subscription values, update both subscription and sub_expires_at
      const subExpiresAt =
        (newSubscription >= 1 && newSubscription <= 3) ||
        (newSubscription >= 6 && newSubscription <= 9)
          ? calculateExpiration()
          : null;
      updateSubscriptionQuery =
        "UPDATE users SET subscription=?, sub_expires_at=? WHERE user_id=?";
      updateValues = [newSubscription, subExpiresAt, user_id];
    }

    db.query(
      updateSubscriptionQuery,
      updateValues,
      (updateError, updateResult) => {
        if (updateError) {
          return res.status(500).send(`Internal Server Error : ${updateError}`);
        }

        return res.json({
          success: true,
          message: "Subscription updated successfully",
        });
      }
    );
  });
});

function calculateExpiration() {
  // Calculate expiration date (1 month from the current date)
  const currentDate = new Date();
  const expirationDate = new Date(
    currentDate.setMonth(currentDate.getMonth() + 1)
  );
  return expirationDate.toISOString().slice(0, 19).replace("T", " ");
}

app.get("/subscription", (req, res) => {
  const q = "SELECT * FROM subscription_model";
  db.query(q, (err, data) => {
    if (err) {
      console.log(err);
      return res.json(err);
    }
    return res.json(data);
  });
});

app.get("/models", (req, res) => {
  const fetchModelsQuery = "SELECT * FROM models";

  db.query(fetchModelsQuery, (error, results) => {
    if (error) {
      console.error("Error fetching models:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }

    return res.status(200).json(results);
  });
});

app.post("/models", (req, res) => {
  const modelCollection = req.body.modelcollection;

  if (!modelCollection || !Array.isArray(modelCollection)) {
    return res.status(400).json({ message: "Invalid request format" });
  }

  const insertModelQuery =
    "INSERT INTO models (model_name, position_x, position_y, position_z, rotation_x, rotation_y, rotation_z, scale_x, scale_y, scale_z) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

  const valuesArray = [];

  modelCollection.forEach((model) => {
    valuesArray.push(
      model.model_name,
      model.position.x,
      model.position.y,
      model.position.z,
      model.rotation.x,
      model.rotation.y,
      model.rotation.z,
      model.scale.x,
      model.scale.y,
      model.scale.z
    );
  });

  db.query(insertModelQuery, valuesArray, (error, results) => {
    if (error) {
      console.error("Error inserting models:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }

    return res.status(201).json({ message: "Models inserted successfully" });
  });
});

app.listen(port, () => {
  console.log(`listening on port: ${port}`);
});
