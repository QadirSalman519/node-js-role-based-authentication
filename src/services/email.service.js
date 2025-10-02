import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

var transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: Number(process.env.EMAIL_PORT),
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

const sendEmail = async (to, subject, text) => {
  try {
    await transporter.sendMail({
      from: `"Auth System" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      text,
    });
    console.log("Email Sent Successfully!");
  } catch (error) {
    console.error("Email Failed", error.message);
    throw new Error("Email Failed!");
  }
};

export default sendEmail;
