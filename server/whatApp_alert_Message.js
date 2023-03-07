/* eslint-disable no-use-before-define */
/* eslint-disable no-shadow */
const axios = require('axios');
const log = require('./log');

require('dotenv').config();

const doAxios = async (...args) => new Promise((resolve, reject) => {
  axios.post(...args)
    .then(({ data }) => {
      resolve(data);
    })
    .catch((error) => {
      reject(error);
    });
});

const alertMessage = async (phoneNo, name, reason, city) => {
  const curDate = new Date();
  const currentDate = curDate.toISOString().slice(0, 10);

  // Config for whatApp message
  const url = 'https://graph.facebook.com/v15.0/106768935582427/messages';
  const data = `{"messaging_product": "whatsapp", "to":"${phoneNo}", "type": "template", "template": { "name": "${reason}", "language": { "code": "en_US" },"components":[{"type":"body","parameters":[{"type":"text","text":"${name}"},{"type":"text","text":"${currentDate}"}]}]}}`;
  const options = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.WHATSAPP_ACCESS_TOKEN}`,
    },
  };
  try {
    await whatAppAlert.doAxios(url, data, options);
    const count = await customer.countCustomerLocation(city);
    await log.logInsert(reason, curDate, city, count);
    return { status: 'message and log stored' };
  } catch (err) {
    throw new Error(err);
  }
};

const whatAppAlert = {
  alertMessage,
  doAxios,
};

module.exports = whatAppAlert;
