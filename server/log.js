/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const { AlertLogSchema, CustomerSchema } = require('./schema');

const logDisplay = async () => {
  try {
    const data = await AlertLogSchema.aggregate([{
      $group: {
        _id: {
          Reason: '$Reason',
          Location: '$Location',
        },
        Count: { $sum: 1 },
      },
    }]);
    if (!data) {
      return { status: 'does not exist' };
    }
    return data;
  } catch (err) {
    throw new Error(err);
  }
};

const logGetLocation = async () => {
  try {
    const data = await AlertLogSchema.distinct('Location');
    if (data === null) {
      return 'no data found';
    }
    return (data);
  } catch (err) {
    throw new Error('No Location Found', err);
  }
};

const logGetReason = async () => {
  try {
    const data = await AlertLogSchema.distinct('Reason');
    if (!data) {
      return { status: 'does not exist' };
    }
    return data;
  } catch (err) {
    throw new Error(err);
  }
};

const filerLog = (loc, reason) => new Promise((resolve, reject) => {
  const query = {};
  if (loc) {
    query.Location = loc;
  }
  if (reason) {
    query.Reason = reason;
  }
  AlertLogSchema.aggregate([
    {
      $match: query,
    },
    {
      $group: {
        _id: {
          Reason: '$Reason',
          Location: '$Location',
        },
        Count: { $sum: 1 },
      },
    },
  ]).then((data) => resolve({ status: 'true', data })).catch((err) => reject(err));
});

const logInsert = async (reason, curDate, city, count) => {
  try {
    if (reason && curDate && city && count !== undefined) {
      await AlertLogSchema.create({
        Reason: reason, Time: curDate, Location: city, Count: count,
      });
      return true;
    } return { status: 'false' };
  } catch (err) {
    return false;
  }
};

module.exports = {
  logDisplay,
  logGetLocation,
  filerLog,
  logInsert,
  logGetReason,
};
