/* eslint-disable no-undef */
// const request = require('request');

const sinon = require('sinon');
const jwt = require('jsonwebtoken');
const { login } = require('../login');
const Users = require('../Users');

const sandbox = sinon.createSandbox();

describe('login', () => {
  afterEach(async () => {
    sandbox.restore();
  });
  it('check user', async () => {
    sandbox.stub(Users, 'userFind').returns(undefined);
    const value = await login('mani', 'mani123');
    expect(value.status).toEqual('failure');
  });
  it('checkPassword...', async () => {
    sandbox.stub(Users, 'userFind').returns({ userID: 'mani', password: 'mani123' });
    sandbox.stub(jwt, 'sign').returns('qawsdefrtvgbynhumjiasdfghjklwertyuiop');
    const value = await login('mani', 'mani123');
    expect(value.status).toEqual('success');
    expect(value.token).toEqual('qawsdefrtvgbynhumjiasdfghjklwertyuiop');
  });
  it('checkPassword...', async () => {
    sandbox.stub(Users, 'userFind').returns({ userID: 'mani', password: 'mani' });
    const value = await login('mani', 'mani123');
    expect(value.status).toEqual('failure');
  });
});
