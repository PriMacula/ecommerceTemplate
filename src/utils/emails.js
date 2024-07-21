import emailjs from "emailjs-com";

export async function sendPasswordResetEmail(email, resetCode) {
  const templateParams = {
    to_email: email,
    reset_code: resetCode,
  };

  try {
     const response = await emailjs.send(
      process.env.SERVICE_ID,
      process.env.TEMPLATE_ID,
      templateParams,
      process.env.USER_ID
    );
    console.log("Message sent:", response.status, response.text);
  } catch (error) {
    console.error("Error sending email:", error);
  }
}
