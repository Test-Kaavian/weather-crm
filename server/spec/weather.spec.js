/* eslint-disable no-undef */
const sinon = require('sinon');
// const request = require('request');
const axios = require('axios');
const funcs = require('../weather');

const sandbox = sinon.createSandbox();
const url = `http://api.openweathermap.org/data/2.5/weather?q=london&units=metric&cnt=3&appid=${process.env.API_KEY}`;

describe('weather', () => {
  describe('doRequest', () => {
    afterEach(() => {
      sandbox.restore();
    });
    it('doRequest', async () => {
      sandbox.stub(axios, 'post').returns(Promise.resolve({ data: 'tested' }));
      const value = await funcs.doRequest(url);
      expect(value).toBe('tested');
    });
    it('doRequest fail', async () => {
      sandbox.stub(axios, 'post').returns(Promise.reject(new Error('error')));
      await expectAsync(funcs.doRequest(url)).toBeRejected();
    });
  });
  describe('currentWeather', () => {
    afterEach(() => {
      sandbox.restore();
    });
    it('function got value', async () => {
      sandbox.stub(funcs, 'doRequest').returns('true');
      const value = await funcs.currentWeather('london');
      expect(value).toBe('true');
    });
    it('function got error', async () => {
      sandbox.stub(funcs, 'doRequest').throws(new Error('Failed'));
      await expectAsync(funcs.currentWeather('london')).toBeRejected();
    });
  });
});
