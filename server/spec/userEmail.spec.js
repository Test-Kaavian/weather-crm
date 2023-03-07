/* eslint-disable no-undef */
const sinon = require('sinon');
const { Users } = require('../schema');
const { findeUserEmail } = require('../userEmail');

const sandBox = sinon.createSandbox();

describe('Users', () => {
  afterEach(() => {
    sandBox.restore();
  });
  it('User found successfully with email', async () => {
    sandBox.stub(Users, 'findOne').returns({ data: 'mani' });
    const value = await findeUserEmail('mani');
    expect(value).toEqual({ data: 'mani' });
  });
  it('User not found', async () => {
    sandBox.stub(Users, 'findOne').throws(new Error('faile'));
    await expectAsync(findeUserEmail('mani')).toBeRejected();
  });
});
