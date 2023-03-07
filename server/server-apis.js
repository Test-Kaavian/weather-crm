const customer = require('./customer');
const log = require('./log');
const set = require('./setting');
const cronFile = require('./cronfile');
const loginFunctionCall = require('./login');
const loginWithEmailFunction = require('./login-email');

const customerId = async (req, res) => {
  try {
    const data = await customer.getCustomerIds();
    if (data.length === 0) {
      return res.status(204).json({ error: 'No data found' });
    }
    return res.status(200).json({ data });
  } catch (err) {
    return res.status(500).json({ error: `error : ${err}` });
  }
};
const displayalert = async (req, res) => {
  try {
    const data = await log.logDisplay();
    if (!data) {
      return res.json({ error: 'No data found' });
    }
    return res.json(data);
  } catch (err) {
    return res.json(`error : ${err}`);
  }
};
const getloglocation = async (req, res) => {
  try {
    const data = await log.logGetLocation();
    if (data.length === 0) {
      return res.json({ error: 'No data found' });
    }
    return res.json(data);
  } catch (err) {
    return res.json(`error : ${err}`);
  }
};
const getlogreason = async (req, res) => {
  try {
    const data = await log.logGetReason();
    if (data.length === 0) {
      return res.json({ error: 'No data found' });
    }
    return res.json(data);
  } catch (err) {
    return res.json(`error : ${err}`);
  }
};
const insertCustomer = (req, res) => {
  const {
    custid, name, address, city, number,
  } = req.body;

  customer.addCustomer(custid, name, address, city, number)
    .then(() => {
      res.status(200).json({ msg: 'Success' });
    }).catch((err) => {
      res.status(500).json({ error: `exists...${err}` });
    });
};

const filterSearch = async (req, res) => {
  try {
    const { loc, reason } = req.body;
    const data = await log.filerLog(loc, reason);
    if ((data.data).length === 0) {
      return res.json({ error: 'No data found' });
    }
    return res.json(data);
  } catch (err) {
    return res.json({ error: err });
  }
};

const updateCustomerDetails = async (req, res) => {
  try {
    const {
      custid, name, address, city, number,
    } = req.body;
    const queryResult = await customer.updateCustomer(custid, name, address, number, city);
    return res.json(queryResult);
  } catch (err) {
    return res.json({ error: err });
  }
};

// login api
const loginApi = async (req, res) => {
  const { username, password } = req.body;
  const response = await loginFunctionCall.login(username, password);
  return res.json(response);
};

// loginwithgoogle api
const loginEmailApi = async (req, res) => {
  const { userEmail } = req.body;
  const response = await loginWithEmailFunction.loginWithEmail(userEmail);
  return res.json(response);
};

const settings = async (req, res) => {
  try {
    let {
      rain, speed, temp, time,
    } = req.body;
    console.log(rain);
    if (!time) time = '0 */12 * * *';
    if (!rain) rain = '80';
    if (!temp) temp = '5';
    if (!speed) speed = '10';
    const response = set.setting(time, rain, temp, speed);
    return res.json({ message: response });
  } catch (err) {
    return res.json({ error: err });
  }
};
const customerSearch = async (req, res) => {
  const { custid } = req.body;
  try {
    const data = await customer.filterCustomer(custid);
    if (!data) {
      return res.status(204).json({ error: 'No data found' });
    }
    return res.status(200).json({ data });
  } catch (err) {
    return res.status(500).json({ error: `error : ${err}` });
  }
};

const scheduleCron = async (req, res) => {
  try {
    const data = await cronFile.cronSchedule();
    console.log(data);
    return res.status(200).json({ data });
  } catch (err) {
    return res.status(500).json({ error: `error : ${err}` });
  }
};
const scheduleStopCron = async (req, res) => {
  try {
    const data = cronFile.stopCron();
    return res.status(200).json({ data });
  } catch (err) {
    return res.json(`error : ${err}`);
  }
};
module.exports = {
  insertCustomer,
  getlogreason,
  getloglocation,
  displayalert,
  customerId,
  filterSearch,
  updateCustomerDetails,
  settings,
  loginApi,
  loginEmailApi,
  customerSearch,
  scheduleCron,
  scheduleStopCron,
};
