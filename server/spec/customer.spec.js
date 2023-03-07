/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const sinon = require('sinon');
const { CustomerSchema } = require('../schema');

const {
  // eslint-disable-next-line max-len
  filterCustomer, updateCustomer, getCustomerIds, addCustomer, countCustomerLocation, getCustomerContact, getCustomerLocation,
} = require('../customer');

const sandbox = sinon.createSandbox();

describe('Customer', () => {
  afterEach(() => {
    sandbox.restore();
  });
  describe('filter customer', () => {
    it('should make a call to db and return value', async () => {
      sandbox.stub(CustomerSchema, 'findOne').returns('customer Details');
      const value = await filterCustomer('KAVN1523');
      expect(value).toBe('customer Details');
    });
    it('should fail query and throw an error', async () => {
      sandbox.stub(CustomerSchema, 'findOne').throws(new Error('filter failed'));
      await expectAsync(filterCustomer()).toBeRejected();
    });
  });
  describe('update customer', () => {
    it('update customer is changes been made', async () => {
      sandbox.stub(CustomerSchema, 'updateOne').returns('query reasult');
      const value = await updateCustomer('KAVN1523');
      expect(value).toBe('query reasult');
    });
    it('query fails throws an error', async () => {
      sandbox.stub(CustomerSchema, 'updateOne').throws(new Error('Error'));
      await expectAsync(updateCustomer('KAVN1523')).toBeRejected();
    });
  });
  describe('getCustomerIds Method', () => {
    it('should make a  call to the DB and return value', async () => {
      sandbox.stub(CustomerSchema, 'distinct').returns('customerIds');
      const value = await getCustomerIds();
      expect(value).toBe('customerIds');
    });
    it('should make a  call to the DB and return error', async () => {
      sandbox.stub(CustomerSchema, 'distinct').throws(new Error('customerIds err'));
      // console.log(value);
      await expectAsync(getCustomerIds()).toBeRejected();
    });
  });
  describe('addCustomer Method', () => {
    it('It Fill the data and insert click', async () => {
      sandbox.stub(CustomerSchema, 'create').returns(Promise.resolve({ msg: 'Success' }));
      const value = await addCustomer();
      expect(value.msg).toEqual('Success');
    });
    it('It not Fill the data and insert click', async () => {
      sandbox.stub(CustomerSchema, 'create').returns(Promise.reject(new Error('err1')));
      await expectAsync(addCustomer()).toBeRejected();
      // expect(value).toBe('err');
    });
  });
  describe('countCustomerLocation', () => {
    it('Should make call to DB and return count', async () => {
      sandbox.stub(CustomerSchema, 'count').returns(4);
      const value = await countCustomerLocation('Ohio');
      expect(value).toEqual(4);
    });
    it('Should failed and throws error', async () => {
      sandbox.stub(CustomerSchema, 'count').throws(new Error('Query failed'));
      await expectAsync(countCustomerLocation()).toBeRejected();
    });
  });

  // Cron Spec
  // Test case for the getting distinct location
  describe('Get Location', () => {
    it('It Get Location', async () => {
      sandbox.stub(CustomerSchema, 'distinct').returns(['Atlanta', 'Ohio']);
      const value = await getCustomerLocation();
      // console.log(value);
      expect(value).toEqual(['Atlanta', 'Ohio']);
    });
    it('Not Location found', async () => {
      sandbox.stub(CustomerSchema, 'distinct').throws(new Error('Error'));
      await expectAsync(getCustomerLocation()).toBeRejected();
      // expect(value).toBe('err');
    });
  });
  // Test case for the getting contact details
  describe('Get contact', () => {
    it('Get the contact', async () => {
      sandbox.stub(CustomerSchema, 'find').returns('[{Revathi, 8989578548}]');
      const value = await getCustomerContact('Ohio');
      // console.log(value);
      expect(value).toEqual('[{Revathi, 8989578548}]');
    });
    it('If not found', async () => {
      sandbox.stub(CustomerSchema, 'find').throws(new Error('Error'));
      await expectAsync(getCustomerContact()).toBeRejected();
    });
  });
});
