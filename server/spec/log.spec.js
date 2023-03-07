/* eslint-disable global-require */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const sinon = require('sinon');
const { AlertLogSchema } = require('../schema');
const { logGetLocation } = require('../log');
const { logInsert } = require('../log');
const { logDisplay, filerLog } = require('../log');
const { logGetReason } = require('../log');

const sandbox = sinon.createSandbox();

describe('log', () => {
  afterEach(() => {
    sandbox.restore();
  });
  describe('display alert logs', () => {
    it('display all alert logs fail', async () => {
      sandbox.stub(AlertLogSchema, 'aggregate').throws(new Error('Failed'));
      await expectAsync(logDisplay()).toBeRejected();
    });
    it('data did not come', async () => {
      sandbox.stub(AlertLogSchema, 'aggregate').returns();
      const value = await logDisplay();
      expect(value.status).toEqual('does not exist');
    });
    it('data comes', async () => {
      sandbox.stub(AlertLogSchema, 'aggregate').returns([
        {
          _id: { Reason: 'rainfall_alert_msg', Location: 'Chicago' },
          Count: 29,
        }]);
      const value = await logDisplay();
      expect(value).toEqual([
        {
          _id: { Reason: 'rainfall_alert_msg', Location: 'Chicago' },
          Count: 29,
        }]);
    });
  });
  describe('filter alert logs', () => {
    it('display filtered alert logs', async () => {
      sandbox.stub(AlertLogSchema, 'aggregate').returns(Promise.resolve());
      const value = await filerLog('Chicago', 'rainfall_alert_msg');
      expect(value.status).toBe('true');
    });
    it('display filtered alert logs', async () => {
      sandbox.stub(AlertLogSchema, 'aggregate').returns(Promise.resolve());
      const value = await filerLog('', '');
      expect(value.status).toBe('true');
    });
    it('display all alert logs fail', async () => {
      sandbox.stub(AlertLogSchema, 'aggregate').returns(Promise.reject());
      await expectAsync(filerLog('Chicago', 'rainfall_alert_msg')).toBeRejected();
    });
  });
  describe('logInsert', () => {
    it('Successfully execute', async () => {
      sandbox.stub(AlertLogSchema, 'create').returns(true);
      const value = await logInsert('snowfall_alert', '2022-11-10', 'Ohio', 7);
      expect(value).toBe(true);
    });
    it('Successfully execute but it is undefined', async () => {
      sandbox.stub(AlertLogSchema, 'create').returns('false');
      const value = await logInsert(undefined, '2022-11-10', 'Ohio', 7);
      expect(value.status).toBe('false');
    });
    it('If it returns Error', async () => {
      sandbox.stub(AlertLogSchema, 'create').throws(new Error('failed'));
      await expectAsync(logInsert('snowfall_alert', '2022-11-10', 'Ohio', 7)).toBeRejected;
    });
  });

  describe('getlocation', () => {
    afterEach(() => {
      sandbox.restore();
    });
    it('distint', async () => {
      sandbox.stub(AlertLogSchema, 'distinct').returns('locations');
      const value = await logGetLocation();
      expect(value).toBe('locations');
    });
    it('distint is fail', async () => {
      sandbox.stub(AlertLogSchema, 'distinct').throws(new Error('Location Not Found'));
      await expectAsync(logGetLocation()).toBeRejected();
    });
    it('distint is an empty', async () => {
      sandbox.stub(AlertLogSchema, 'distinct').returns(null);
      const value = await logGetLocation();
      expect(value).toEqual('no data found');
    });
  });
  describe('logGetReason', () => {
    it('Executed Successfully', async () => {
      sandbox.stub(AlertLogSchema, 'distinct').returns(true);
      const value = await logGetReason();
      expect(value).toBe(true);
    });
    it('Executed Successfully but it has no data', async () => {
      sandbox.stub(AlertLogSchema, 'distinct').returns();
      const value = await logGetReason();
      expect(value.status).toBe('does not exist');
    });
    it('If it returns Error', async () => {
      sandbox.stub(AlertLogSchema, 'distinct').throws(new Error('failed'));
      await expectAsync(logGetReason()).toBeRejected;
    });
  });
});
