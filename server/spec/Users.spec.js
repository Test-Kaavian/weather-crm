/* eslint-disable no-undef */
const sinon = require('sinon');
const { Users } = require('../schema');
const { userFind } = require('../Users');

const sandBox = sinon.createSandbox();

describe('Users', () => {
  afterEach(() => {
    sandBox.restore();
  });
  it('User found successfully', async () => {
    sandBox.stub(Users, 'findOne').returns('data');
    const value = await userFind('mani');
    expect(value).toEqual('data');
  });
  it('User not found', async () => {
    sandBox.stub(Users, 'findOne').throws(new Error('faile'));
    await expectAsync(userFind('mani')).toBeRejected();
  });
});
