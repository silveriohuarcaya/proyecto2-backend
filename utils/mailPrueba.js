const nodemailer = require('nodemailer');

function createGmailTransporter() {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: 'corwilgi@gmail.com',
      pass: 'ogwbqdebtqkmubae',
    },
  });
  return transporter;
}

const message = {
  from: '"Carlos Huarcaya from microsoft👻" <carloshuarcaya@microsoft.com>', // sender address
  to: 'corwilgi@gmail.com, corwilgi@hotmail.com', // list of receivers
  subject: 'Hello World ✔', // Subject line
  text: `Hello world?'
    This is a test email from NodeJS`, // plain text body
  html: `
    <h1 style="color: green">Hello World?</h1>
  <p style="color: blue">This is a test email</p>
  <button>click me</button>
  <a href="http://google.com" target="_blank" rel="noopener noreferrer">Google</a>
  `, // html body

  attachments: [
    {
      // utf-8 string as an attachment
      filename: 'text1.txt',
      content: 'hello world',
    },
    {
      // file and content type is derived from path
      path: 'utils/corina gestion.docx',
    },
  ],
};

// async..await is not allowed in global scope, must use a wrapper
async function main() {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing

  // create transporter false
  // const testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  // const transporter = nodemailer.createTransport({
  //   host: '1smtp.ethereal.email',
  //   port: 587,
  //   secure: false,
  //   auth: {
  //  user: testAccount.user,
  //  pass: testAccount.pass,
  // },
  // });
  const transporter = createGmailTransporter();

  // send mail with defined transport object
  const info = await transporter.sendMail(message);

  console.log('Message sent: %s', info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account

  //    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

main().catch(console.error);
