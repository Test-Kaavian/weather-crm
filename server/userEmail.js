const { Users } = require('./schema');

const findeUserEmail = async (userEmail) => {
  try {
    const data = await Users.findOne({ email: userEmail });
    return data;
  } catch (error) {
    throw new Error('can not find user');
  }
};

module.exports = {
  findeUserEmail,
};
