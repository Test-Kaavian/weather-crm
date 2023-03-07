// /* eslint-disable no-unused-expressions */
// /* eslint-disable no-sequences */
// /* eslint-disable prefer-const */
// /* eslint-disable consistent-return */
const cron = require('node-cron');
const moment = require('moment-timezone');

const localStorageValue = require('./local-storage-methods');
const weatherValidate = require('./weather_Validate');

const customer = require('./customer');
const { alertMessage } = require('./whatApp_alert_Message');

let myJob;
// CRON SCHEDULE.
function cronSchedule() {
  const urlTaskMap = {};

  const scheduleTime = localStorageValue.getItemInLocalStorage('Time');
  console.log(scheduleTime, 'Scheduled Time');

  const task = cron.schedule(scheduleTime, async () => {
    const cities = await customer.getCustomerLocation();
    console.log('Cities', cities);

    cities.forEach(async (el) => {
      const reason = await weatherValidate.weatherAlert(el);
      console.log('Reason', reason);

      const customerInfo = await customer.getCustomerContact(el);
      console.log(customerInfo);

      customerInfo.forEach((info) => {
        alertMessage(info.Contact, info.Name, el);
      });
    }, { scheduled: false });
  });
  urlTaskMap.url = task;
  myJob = urlTaskMap.url;

  console.log('Started');
  const time = moment();
  console.log(time.tz('Asia/Calcutta').format('DD MM YYYY hh:mm:ss'));
  // eslint-disable-next-line no-undef
  return { message: true };
}

const stopCron = () => {
  // const job = DefinedCronSchedule();
  myJob.destroy();
  const time = moment();
  console.log('cron Stopped', time.tz('Asia/Calcutta').format('DD MM YYYY hh:mm:ss'));
  // eslint-disable-next-line no-undef
  return { message: false };
};

// cronSchedule();

module.exports = {
  cronSchedule,
  stopCron,
  // DefinedCronSchedule,
};
