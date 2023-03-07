/* eslint-disable global-require */
/* eslint-disable no-undef */
const sinon = require('sinon');
const cron = require('node-cron');
const localStorageMethod = require('../local-storage-methods');
const getCron = require('../cronfile');

const sandBox = sinon.createSandbox();

describe('Customer alert', () => {
  afterEach(() => {
    sandBox.restore();
  });
  // CRON TEST CASE
  describe('Cron', () => {
    it('should run and return value', async () => {
      sandBox.stub(localStorageMethod, 'getItemInLocalStorage').returns('* * * * *');
      sandBox.stub(cron, 'schedule');
      const value = await getCron.cronSchedule();
      console.log(value.message);
      expect(value.message).toEqual(true);
    });
    // it('should run and throws error', async () => {
    //   sandBox.stub(localStorageMethod,'getItemInLocalStorage').returns('* * * * *');
    //   await expectAsync(async() => await getCron.cronSchedule()).toBeRejected();
    // });
    // it('Get Cron', async () => {
    //   sandBox.stub(cron, 'schedule');
    //   const value = await getCron.cronSchedule();
    //   expect(value).toEqual({ message: true });
    // });
    // it('Not Run', async () => {
    //   sandBox.stub(cron, 'schedule').throws(new Error('Failed To run'));
    //   await expectAsync(getCron.cronSchedule()).toBeRejected();
    // });
    // it('Stop Cron', () => {
    //   sandBox.stub(process, 'exit');
    //   process.exit(0);
    // });
    // it('Not Run', async () => {
    //   sandBox.stub(process, 'exit').throws(new Error('Failed to run'));
    //   await expectAsync(getCron.stopCron()).toBeRejected();
    // });
  });
});
// });
