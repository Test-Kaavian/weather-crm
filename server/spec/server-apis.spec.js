/* eslint-disable no-undef */
const sinon = require('sinon');

const serverApis = require('../server-apis');
const customer = require('../customer');
const log = require('../log');
const set = require('../setting');
const cronFile = require('../cronfile');
const loginApi = require('../server-apis');
const login = require('../login');
const gmailLogin = require('../login-email');
const gmailLoginApi = require('../server-apis');

const sandbox = sinon.createSandbox();

describe('Server Apis - ', () => {
  afterEach(() => {
    sandbox.restore();
  });
  describe('customerid Api ', () => {
    it('should run and send sucessful responce ', async () => {
      const getCustomerIdsStub = sandbox.stub(customer, 'getCustomerIds').returns(['KAVN1521', 'KAVN1523', 'KAVN1524']);
      const mockRequest = null;
      const mockResponse = { json: getCustomerIdsStub };
      serverApis.customerId(mockRequest, mockResponse);
      expect(mockResponse.json.getCall(0).returnValue).toEqual(['KAVN1521', 'KAVN1523', 'KAVN1524']);
    });

    it('should run and send empty responce ', async () => {
      const getCustomerIdsStub = sandbox.stub(customer, 'getCustomerIds').returns([]);
      const mockRequest = null;
      const mockResponse = { json: getCustomerIdsStub };
      serverApis.customerId(mockRequest, mockResponse);
      expect(mockResponse.json.getCall(0).returnValue).toEqual([]);
    });

    it('should fail and send error responce ', async () => {
      const getCustomerIdsStub = sandbox.stub(customer, 'getCustomerIds').throws(new Error('getCustomerId failed'));
      const mockRequest = null;
      const mockResponse = { json: getCustomerIdsStub };
      serverApis.customerId(mockRequest, mockResponse);
      expect(mockResponse.json.getCall(0).exception).toEqual(new Error('getCustomerId failed'));
    });
  });
  describe('updateCustomer api', () => {
    it('executed successfully', async () => {
      const updateCustomerStub = sandbox.stub(customer, 'updateCustomer').returns(true);
      const mockRequest = {
        body: {
          custid: 'KAVN1526', name: 'Kokila', address: '7th Street', city: 'Ohio', number: 9042024670,
        },
      };
      const mockResponse = { json: updateCustomerStub };
      serverApis.updateCustomerDetails(mockRequest, mockResponse);
      expect(mockResponse.json.getCall(0).returnValue).toEqual(true);
    });
    it('it returns error responce ', async () => {
      const updateCustomerStub = sandbox.stub(customer, 'updateCustomer').throws(new Error());
      const mockRequest = {
        body: {
          custid: 'KAVN1526', name: 'Kokila', address: '7th Street', city: 'Ohio', number: 9042024670,
        },
      };
      const mockResponse = { json: updateCustomerStub };
      serverApis.updateCustomerDetails(mockRequest, mockResponse);
      expect(mockResponse.json.getCall(0).exception).toEqual(new Error());
    });
  });
  describe('Search api for logs', () => {
    it('successfully executed with data', async () => {
      const searchLogStub = sandbox.stub(log, 'filerLog').returns({ status: 'true', data: [{ _id: [Object], Count: 22 }] });
      const mockRequest = { body: { loc: 'Atlanta', reason: 'rainfall_alert_msg' } };
      const mockResponse = { json: searchLogStub };
      await serverApis.filterSearch(mockRequest, mockResponse);
      expect(mockResponse.json.getCall(0).returnValue).toEqual({ status: 'true', data: [{ _id: [Object], Count: 22 }] });
    });
    it('successfully executed with  no data', async () => {
      const searchLogStub = sandbox.stub(log, 'filerLog').returns({ status: 'true', data: [] });
      const mockRequest = { body: { loc: 'Atlanta', reason: 'rainfall_alert_msg' } };
      const mockResponse = { json: searchLogStub };
      await serverApis.filterSearch(mockRequest, mockResponse);
      expect(mockResponse.json.getCall(0).returnValue).toEqual({ status: 'true', data: [] });
    });
    it(' error responce ', async () => {
      const searchLogStub = sandbox.stub(log, 'filerLog').throws(new Error('failed'));
      const mockRequest = { body: { loc: 'Atlanta', reason: 'rainfall_alert_msg' } };
      const mockResponse = { json: searchLogStub };
      serverApis.filterSearch(mockRequest, mockResponse);
      expect(mockResponse.json.getCall(0).exception).toEqual(new Error('failed'));
    });
  });
  describe('Settings api', () => {
    it('Successfully executed', async () => {
      const settingsStub = sandbox.stub(set, 'setting').returns(true);
      const mockRequest = {
        body: {
          rain: 80, speed: 30, temp: 27, time: '******',
        },
      };
      const mockResponse = { json: settingsStub };
      serverApis.settings(mockRequest, mockResponse);
      expect(mockResponse.json.getCall(0).returnValue).toEqual(true);
    });
    it('Data not come', async () => {
      const settingsStub = sandbox.stub(set, 'setting').returns(true);
      const mockRequest = {
        body: {
          rain: '', speed: '', temp: '', time: '',
        },
      };
      const mockResponse = { json: settingsStub };
      serverApis.settings(mockRequest, mockResponse);
      expect(mockResponse.json.getCall(0).returnValue).toEqual(true);
    });
    it('Error response', async () => {
      const settingsStub = sandbox.stub(set, 'setting').throws(new Error('Incorrect Inputs'));
      const mockRequest = {
        body: {
          rain: 80, speed: 30, temp: 27, time: '******',
        },
      };
      const mockResponse = { json: settingsStub };
      serverApis.settings(mockRequest, mockResponse);
      expect(mockResponse.json.getCall(0).exception).toEqual(new Error('Incorrect Inputs'));
    });
  });
  describe('alertdisplay Api ', () => {
    it('api call sucessfull ', async () => {
      const stubMethod = sandbox.stub(log, 'logDisplay').returns([
        {
          _id: { Reason: 'rainfall_alert_msg', Location: 'Chicago' },
          Count: 29,
        }]);
      const mockRequest = null;
      const mockResponse = { json: stubMethod };
      serverApis.displayalert(mockRequest, mockResponse);
      expect(mockResponse.json.getCall(0).returnValue).toEqual([
        {
          _id: { Reason: 'rainfall_alert_msg', Location: 'Chicago' },
          Count: 29,
        }]);
    });

    it('api call success but data does not exist ', async () => {
      const display = null;
      const stubMethod = sandbox.stub(log, 'logDisplay').returns(display);
      const mockRequest = null;
      const mockResponse = { json: stubMethod };
      serverApis.displayalert(mockRequest, mockResponse);
      expect(mockResponse.json.getCall(0).returnValue).toEqual(display);
    });

    it('api call fail  ', async () => {
      const stubMethod = sandbox.stub(log, 'logDisplay').throws(new Error('Api call fail'));
      const mockRequest = null;
      const mockResponse = { json: stubMethod };
      serverApis.displayalert(mockRequest, mockResponse);
      expect(mockResponse.json.getCall(0).exception).toEqual(new Error('Api call fail'));
    });
  });
  describe('location  Api ', () => {
    it('api call sucessfull ', async () => {
      const stubMethod = sandbox.stub(log, 'logGetLocation').returns(['Chicago', 'Washington']);
      const mockRequest = null;
      const mockResponse = { json: stubMethod };
      serverApis.getloglocation(mockRequest, mockResponse);
      expect(mockResponse.json.getCall(0).returnValue).toEqual(['Chicago', 'Washington']);
    });

    it('api call success but data does not exist ', async () => {
      const stubMethod = sandbox.stub(log, 'logGetLocation').returns([]);
      const mockRequest = null;
      const mockResponse = { json: stubMethod };
      serverApis.getloglocation(mockRequest, mockResponse);
      expect(mockResponse.json.getCall(0).returnValue).toEqual([]);
    });

    it('api call fail  ', async () => {
      const stubMethod = sandbox.stub(log, 'logGetLocation').throws(new Error('Api call fail'));
      const mockRequest = null;
      const mockResponse = { json: stubMethod };
      serverApis.getloglocation(mockRequest, mockResponse);
      expect(mockResponse.json.getCall(0).exception).toEqual(new Error('Api call fail'));
    });
  });
  describe('location  Api ', () => {
    it('api call sucessfull ', async () => {
      const stubMethod = sandbox.stub(log, 'logGetReason').returns(['snowfall_alert', 'rainfall_alert_msg']);
      const mockRequest = null;
      const mockResponse = { json: stubMethod };
      serverApis.getlogreason(mockRequest, mockResponse);
      expect(mockResponse.json.getCall(0).returnValue).toEqual(['snowfall_alert', 'rainfall_alert_msg']);
    });

    it('api call success but data does not exist ', async () => {
      const stubMethod = sandbox.stub(log, 'logGetReason').returns([]);
      const mockRequest = null;
      const mockResponse = { json: stubMethod };
      serverApis.getlogreason(mockRequest, mockResponse);
      expect(mockResponse.json.getCall(0).returnValue).toEqual([]);
    });

    it('api call fail  ', async () => {
      const stubMethod = sandbox.stub(log, 'logGetReason').throws(new Error('Api call fail'));
      const mockRequest = null;
      const mockResponse = { json: stubMethod };
      serverApis.getlogreason(mockRequest, mockResponse);
      expect(mockResponse.json.getCall(0).exception).toEqual(new Error('Api call fail'));
    });
  });
  describe('insertCustomer Api ', () => {
    afterEach(() => {
      sandbox.restore();
    });

    it('should run and send sucessful responce ', async () => {
      const addCustomerStub = sandbox.stub(customer, 'addCustomer').resolves('data inserted');
      const mockRequest = {
        body: {
          custid: 'KAVN1530', name: 'Samsu', address: '20/4 A street', city: 'Atlanta', number: 918489550288,
        },
      };
      const mockResponse = { json: addCustomerStub };
      serverApis.insertCustomer(mockRequest, mockResponse);
      await expectAsync(mockResponse.json.getCall(0).returnValue).toBeResolved();
    });

    it('should fail and send error responce ', async () => {
      const addCustomerStub = sandbox.stub(customer, 'addCustomer').rejects('insertion failed');
      const mockRequest = {
        body: {
          custid: 'KAVN1530', name: 'Samsu', address: '20/4 A street', city: 'Atlanta', number: 918489550288,
        },
      };
      const mockResponse = { json: addCustomerStub };
      serverApis.insertCustomer(mockRequest, mockResponse);
      await expectAsync(mockResponse.json.getCall(0).returnValue).toBeRejected();
    });
  });

  describe('customerSearch Api ', () => {
    afterEach(() => {
      sandbox.restore();
    });

    it('should run and send sucessful responce ', async () => {
      const customerDetail = {
        Name: 'Mohammed Samsuthin ', Address: '3/4,East Street', City: 'Florida', Contact: 918489550288,
      };
      const filterCustomerStub = sandbox.stub(customer, 'filterCustomer').returns(customerDetail);
      const mockRequest = { body: { custid: 'KAVN1530' } };
      const mockResponse = { json: filterCustomerStub };
      serverApis.customerSearch(mockRequest, mockResponse);
      expect(mockResponse.json.getCall(0).returnValue).toEqual(customerDetail);
    });

    it('should run and send empty responce ', async () => {
      const customerDetail = null;
      const filterCustomerStub = sandbox.stub(customer, 'filterCustomer').returns(customerDetail);
      const mockRequest = { body: { custid: 'KAVN1530' } };
      const mockResponse = { json: filterCustomerStub };
      serverApis.customerSearch(mockRequest, mockResponse);
      expect(mockResponse.json.getCall(0).returnValue).toEqual(customerDetail);
    });

    it('should fail and send error responce ', async () => {
      const filterCustomerStub = sandbox.stub(customer, 'filterCustomer').throws(new Error('filterCustomer failed'));
      const mockRequest = { body: { custid: 'KAVN1530' } };
      const mockResponse = { json: filterCustomerStub };
      serverApis.customerSearch(mockRequest, mockResponse);
      expect(mockResponse.json.getCall(0).exception).toEqual(new Error('filterCustomer failed'));
    });
  });

  // Cron
  describe('cron api', () => {
    it('successful', async () => {
      const stubCron = sandbox.stub(cronFile, 'cronSchedule').returns({ message: true });
      const mockRequest = null;
      const mockResponse = { json: stubCron };
      serverApis.scheduleCron(mockRequest, mockResponse);
      expect(mockResponse.json.getCall(0).returnValue).toEqual({ message: true });
    });
    it('should fail and send error responce ', async () => {
      const stubCron = sandbox.stub(cronFile, 'cronSchedule').throws(new Error('cron failed'));
      const mockRequest = null;
      const mockResponse = { json: stubCron };
      serverApis.scheduleCron(mockRequest, mockResponse);
      expect(mockResponse.json.getCall(0).exception).toEqual(new Error('cron failed'));
    });
  });
  describe('cron stop api', () => {
    it('Stop cron', async () => {
      const cronStop = sandbox.stub(cronFile, 'stopCron');
      const mockRequest = null;
      const mockResponse = { json: cronStop };
      serverApis.scheduleStopCron(mockRequest, mockResponse);
      expect(mockResponse.json.getCall(0).returnValue);
    });
    it('Error', async () => {
      const cronStop = sandbox.stub(cronFile, 'stopCron').throws(new Error('cron failed'));
      const mockRequest = null;
      const mockResponse = { json: cronStop };
      serverApis.scheduleStopCron(mockRequest, mockResponse);
      expect(mockResponse.json.getCall(0).exception).toEqual(new Error('cron failed'));
    });
  });
  describe('loginApi', () => {
    afterEach(() => {
      sandbox.restore();
    });
    it('undefined user', async () => {
      const loginApiStub = sandbox.stub(login, 'login').returns({ status: 'failure', data: 'User Not found' });
      const mockRequest = { body: { username: 'manikandan', password: 'zaddy' } };
      const mockResponse = { json: loginApiStub };
      loginApi.loginApi(mockRequest, mockResponse);
      expect(mockResponse.json.getCall(0).returnValue).toEqual({ status: 'failure', data: 'User Not found' });
    });
    it('checkin password', async () => {
      const loginApiStub = sandbox.stub(login, 'login').returns({ status: 'success', token: 'asdfghjklpoiuytrewqzxcvbnm' });
      const mockRequest = { body: { username: 'mani', password: 'zaddyzayn' } };
      const mockResponse = { json: loginApiStub };
      loginApi.loginApi(mockRequest, mockResponse);
      expect(mockResponse.json.getCall(0).returnValue).toEqual({ status: 'success', token: 'asdfghjklpoiuytrewqzxcvbnm' });
    });
    it('if entered wrong password', async () => {
      const loginApiStub = sandbox.stub(login, 'login').returns({ status: 'failure', data: 'Invalid Password' });
      const mockRequest = { body: { username: 'mani', password: 'mani' } };
      const mockResponse = { json: loginApiStub };
      loginApi.loginApi(mockRequest, mockResponse);
      expect(mockResponse.json.getCall(0).returnValue).toEqual({ status: 'failure', data: 'Invalid Password' });
    });
  });

  describe('loginWithGoogleApi', () => {
    afterEach(() => {
      sandbox.restore();
    });
    it('successfully login with email', () => {
      const gmailLoginStub = sandbox.stub(gmailLogin, 'loginWithEmail').returns({ status: 'success', token: 'asdfghjklqwertyuiopzxcvbn' });
      const mockRequest = { body: { email: 'mismyfirstletter@gmail.com' } };
      const mockResponse = { json: gmailLoginStub };
      gmailLoginApi.loginEmailApi(mockRequest, mockResponse);
      expect(mockResponse.json.getCall(0).returnValue).toEqual({ status: 'success', token: 'asdfghjklqwertyuiopzxcvbn' });
    });
    it('login failed with email', () => {
      const gmailLoginStub = sandbox.stub(gmailLogin, 'loginWithEmail').returns({ status: 'failuer', data: 'undefined email' });
      const mockRequest = { body: { email: undefined } };
      const mockResponse = { json: gmailLoginStub };
      gmailLoginApi.loginEmailApi(mockRequest, mockResponse);
      expect(mockResponse.json.getCall(0).returnValue).toEqual({ status: 'failuer', data: 'undefined email' });
    });
  });
});
