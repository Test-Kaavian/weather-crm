/* eslint-disable no-undef */
const sinon = require('sinon');
const jwt = require('jsonwebtoken');

const { Users } = require('../schema');
const { loginWithEmail } = require('../login-email');
// const { findeUserEmail } = require('../userEmail');

const sandbox = sinon.createSandbox();

describe('login-email', () => {
  afterEach(async () => {
    sandbox.restore();
  });
  it('user not found..', async () => {
    sandbox.stub(Users, 'findOne').returns(undefined);
    const value = await loginWithEmail('manikandan.s@kaaviansys.com');
    expect(value.status).toEqual('failure');
  });
  it('check user', async () => {
    sandbox.stub(Users, 'findOne').returns('mohammedsamsuthin.k@kaaviansys.com');
    sandbox.stub(jwt, 'sign').returns('asdfghjklrtyuioppoiuytr');
    const value = await loginWithEmail('mohammedsamsuthin.k@kaaviansys.com');
    expect(value.status).toEqual('success');
    expect(value.token).toEqual('asdfghjklrtyuioppoiuytr');
  });
});
