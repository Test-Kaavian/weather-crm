/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
const sinon = require('sinon');
const localStorageMethods = require('../local-storage-methods');

const sandBox = sinon.createSandbox();

const { setting } = require('../setting');

describe('setting ', () => {
  afterEach(() => {
    sandBox.restore();
  });

  it('value true get success', async () => {
    sandBox.stub(localStorageMethods, 'setItemInLocalStorage').returns(true);
    const value = setting(3, 4, 5, 2);
    expect(value).toEqual(true);
  });
  it('value fail throws error', async () => {
    sandBox.stub(localStorageMethods, 'setItemInLocalStorage').throws(new Error('Incorrect Inputs..'));
    expect(() => setting()).toThrow();
  });
});
