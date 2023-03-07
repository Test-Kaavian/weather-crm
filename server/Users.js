const { Users } = require('./schema');

const userFind = async (username) => {
  try {
    const data = await Users.findOne({ userID: username });
    return data;
  } catch (error) {
    throw new Error('can not find');
  }
};

module.exports = {
  userFind,
};
