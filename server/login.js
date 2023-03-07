const jwt = require('jsonwebtoken');
const Users = require('./Users');

const login = async (username, password) => {
  const userData = await Users.userFind(username);
  const getPass = userData?.password;
  const getID = userData?.userID;
  if (!userData) {
    return ({ status: 'failure', data: 'User Not found' });
  }
  if (password === getPass) {
    const userId = getID;
    const token = jwt.sign({ userId }, `${process.env.JWT_SECRET_KEY}`);
    return ({ status: 'success', token });
  }
  return ({ status: 'failure', data: 'Invalid Password' });
};

module.exports = {
  login,
};
