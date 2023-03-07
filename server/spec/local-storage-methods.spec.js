/* eslint-disable prefer-promise-reject-errors */
/* eslint-disable no-undef */
const sinon = require('sinon');
const { LocalStorage } = require('node-localstorage');

const sandBox = sinon.createSandbox();

const { setItemInLocalStorage, getItemInLocalStorage } = require('../local-storage-methods');

describe('local-storage-methods ', () => {
  describe('setItemInLocalStorage', () => {
    afterEach(() => {
      sandBox.restore();
    });
    it('should run and return true', () => {
      sandBox.stub(LocalStorage.prototype, 'setItem').returns(true);
      const value = setItemInLocalStorage('Speed', 10);
      expect(value).toEqual(true);
    });
    it('should fails and throws error', async () => {
      sandBox.stub(LocalStorage.prototype, 'setItem').throws(new Error('getItem failed'));
      expect(() => setItemInLocalStorage('Speed', 10)).toThrow();
    });
  });
  describe('getItemInLocalStorage', () => {
    afterEach(() => {
      sandBox.restore();
    });

    it('should run and return value', () => {
      sandBox.stub(LocalStorage.prototype, 'getItem').returns(10);
      const value = getItemInLocalStorage('Speed');
      expect(value).toEqual(10);
    });
    it('should run and throws error', async () => {
      sandBox.stub(LocalStorage.prototype, 'getItem').throws(new Error('getItem failed'));
      expect(() => getItemInLocalStorage('Speed')).toThrow();
    });
  });
});
