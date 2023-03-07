const jwt = require('jsonwebtoken');
const findEmail = require('./userEmail');

const loginWithEmail = async (userEmail) => {
  const userData = await findEmail.findeUserEmail(userEmail);
  const emailData = userData?.email;
  if (!userData) {
    return ({ status: 'failure', data: 'User Not found' });
  }

  const token = jwt.sign({ emailData }, `${process.env.JWT_SECRET_KEY}`);
  return ({ status: 'success', token });
};

module.exports = {
  loginWithEmail,
};
