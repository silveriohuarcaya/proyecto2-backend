const bcrypt = require('bcryptjs');
const crypto = require('crypto');

const { getAllUser, getByIdUser, findUserByEmail, createUser, updateUser, deleteUser } = require('./user.service');
// const { sendNodeMailer } = require('../../utils/mail'); // Utilizando nodemailer
const { sendMailSendGrid } = require('../../utils/mail'); // Utilizando sendgrid

async function getAllUserHandler(req, res) {
  try {
    const users = await getAllUser();
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

async function getByIdUserHandler(req, res) {
  const { id } = req.params;
  try {
    const user = await getByIdUser(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const { profile } = user.profile;

    return res.json(profile);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

async function createUserHandler(req, res) {
  const userData = req.body;

  try {
    const users = await findUserByEmail(userData.email);

    if (!users && userData.password && userData.password.length >= 6) {
      const salt = await bcrypt.genSalt(10);
      userData.password = await bcrypt.hash(userData.password, salt);
    }

    const hash = crypto.createHash('sha256').update(userData.email).digest('hex');

    userData.passwordResetToken = hash;
    userData.passwordResetExpires = Date.now() + 3_600_000 * 24; // 24 hours;

    const user = await createUser(userData);

    // send email to user
    const message = {
      from: 'El Puerto Escondido <corwilgi@hotmail.com>', // sender address
      to: user.email, // list of receivers

      subject: 'Active account template', // Subject line

      // template_id: 'd-04e1462b459f4052a63885892103631f',
      template_id: 'd-642dae20bfe8419f96e97cdac1fef846',

      dynamic_template_data: {
        firstName: user.profile.firstName.toUpperCase(),
        lastName: user.profile.lastName.toUpperCase(),
        url: `${process.env.SMTP_FRONTEND_URL}/verify-account/${hash}`,
      },

      // html: `
      //   <h1 style="color: green">Welcome</h1>
      // <p style="color: #0070f3">Please click in this link to active account</p>
      // <a href="${process.env.SMTP_FRONT_URL}/verify-account/${hash}" target="_blank" rel="noopener noreferrer">Verify Account</a>
      // `,

      // html body
      // <a href="http://localhost:3000/verify-account/${hash}" target="_blank" rel="noopener noreferrer">Verify Account</a>
      // <a href="${BASE_URL}/verify-account/${hash}" target="_blank" rel="noopener noreferrer">Verify Account</a>

      // documents adjunt
      // attachments: [
      //   {
      //     // utf-8 string as an attachment
      //     filename: 'text1.txt',
      //     content: 'hello world',
      //   },
      //   {
      //     // file and content type is derived from path
      //     path: 'utils/corina gestion.docx',
      //   },
      // ],
    };

    // await sendNodeMailer(message);
    await sendMailSendGrid(message);
    return res.status(200).json({ profile: user.profile });
    // return res.status(201).json({ user });
  } catch (error) {
    return res.status(500).json({ error });
  }
}

async function updateUserHandler(req, res) {
  const { id } = req.params;
  const userData = req.body;

  try {
    if (!userData.password) {
      const user = await updateUser(id, userData);
      return res.status(200).json(user);
    }
    if (userData.password.length >= 6) {
      const salt = await bcrypt.genSalt(10);
      userData.password = await bcrypt.hash(userData.password, salt);

      const user = await updateUser(id, userData);
      return res.status(200).json(user);
    }
    return res.status(400).json({
      error: `password ${userData.password} is shorter than the minimum allowed length (6)`,
    });
  } catch (error) {
    return res.status(500).json({ error });
  }
}

async function deleteUserHandler(req, res) {
  const { id } = req.params;

  try {
    const user = await deleteUser(id);
    console.log(user);
    return res.status(200).json({ message: 'Delete User Successfully' });
  } catch (error) {
    return res.status(500).json({ error });
  }
}

module.exports = {
  getAllUserHandler,
  getByIdUserHandler,
  createUserHandler,
  updateUserHandler,
  deleteUserHandler,
};
