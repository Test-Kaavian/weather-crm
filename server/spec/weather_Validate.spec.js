/* eslint-disable no-undef */
const sinon = require('sinon');

const sandBox = sinon.createSandbox();

const weather = require('../weather');
const weatherValidate = require('../weather_Validate');
const localstorage = require('../local-storage-methods');

describe('Weather validate', () => {
  describe('windSpeedValidate method ', () => {
    afterEach(() => {
      sandBox.restore();
    });

    it('should run and return true', () => {
      sandBox.stub(localstorage, 'getItemInLocalStorage').returns(11);
      const value = weatherValidate.windSpeedValidate(12);
      expect(value).toEqual(true);
    });
    it('should run and return false', () => {
      sandBox.stub(localstorage, 'getItemInLocalStorage').returns(11);
      const value = weatherValidate.windSpeedValidate(9);
      expect(value).toEqual(false);
    });
  });
  describe('rainFallValidate method ', () => {
    afterEach(() => {
      sandBox.restore();
    });

    it('should run and return true', () => {
      sandBox.stub(localstorage, 'getItemInLocalStorage').returns(70);
      const value = weatherValidate.rainFallValidate(80, 21);
      expect(value).toEqual(true);
    });
    it('should run and return false', () => {
      sandBox.stub(localstorage, 'getItemInLocalStorage').returns(70);
      const value = weatherValidate.rainFallValidate(60, 10);
      expect(value).toEqual(false);
    });
  });

  describe('snowFallValidate method ', () => {
    afterEach(() => {
      sandBox.restore();
    });

    it('should run and return true', () => {
      sandBox.stub(localstorage, 'getItemInLocalStorage').returns(5);
      const value = weatherValidate.snowFallValidate(5, 2);
      expect(value).toEqual(true);
    });
    it('should run and return false', () => {
      sandBox.stub(localstorage, 'getItemInLocalStorage').returns(5);
      const value = weatherValidate.snowFallValidate(8, 6);
      expect(value).toEqual(false);
    });
  });

  describe('weatherAlert method ', () => {
    afterEach(() => {
      sandBox.restore();
    });

    it('should run and return wind_alert', async () => {
      const wind = { speed: 11, deg: 211, gust: 6.71 };
      const main = {
        temp: 20,
        feels_like: -6.6,
        temp_min: -2.82,
        temp_max: -1.38,
        pressure: 1017,
        humidity: 79,
      };
      sandBox.stub(weather, 'currentWeather').returns({ wind, main });
      sandBox.stub(weatherValidate, 'windSpeedValidate').returns(true);
      const value = await weatherValidate.weatherAlert('Ohio');
      expect(value).toEqual('wind_alert');
    });
    it('should run and return rainfall_alert_msg', async () => {
      const wind = { speed: 7, deg: 211, gust: 6.71 };
      const main = {
        temp: 21,
        feels_like: -6.6,
        temp_min: -2.82,
        temp_max: -1.38,
        pressure: 1017,
        humidity: 96,
      };
      sandBox.stub(weather, 'currentWeather').returns({ wind, main });
      sandBox.stub(weatherValidate, 'rainFallValidate').returns(true);
      const value = await weatherValidate.weatherAlert('Ohio');
      expect(value).toEqual('rainfall_alert_msg');
    });

    it('should run and return snowfall_alert', async () => {
      const wind = { speed: 5, deg: 211, gust: 6.71 };
      const main = {
        temp: 4,
        feels_like: -6.6,
        temp_min: -2.82,
        temp_max: -1.38,
        pressure: 1017,
        humidity: 79,
      };
      sandBox.stub(weather, 'currentWeather').returns({ wind, main });
      sandBox.stub(weatherValidate, 'snowFallValidate').returns(true);
      const value = await weatherValidate.weatherAlert('Ohio');
      expect(value).toEqual('snowfall_alert');
    });
    it('should run and return safe level', async () => {
      const wind = { speed: 5, deg: 211, gust: 6.71 };
      const main = {
        temp: 4,
        feels_like: -6.6,
        temp_min: -2.82,
        temp_max: -1.38,
        pressure: 1017,
        humidity: 79,
      };
      sandBox.stub(weather, 'currentWeather').returns({ wind, main });
      sandBox.stub(weatherValidate, 'windSpeedValidate').returns(false);
      sandBox.stub(weatherValidate, 'rainFallValidate').returns(false);
      sandBox.stub(weatherValidate, 'snowFallValidate').returns(false);
      const value = await weatherValidate.weatherAlert('Ohio');
      expect(value).toEqual('safe level');
    });
    it('should fail and throw error', async () => {
      sandBox.stub(weather, 'currentWeather').throws(new Error('weather failed'));
      await expectAsync(weatherValidate.weatherAlert('ohio')).toBeRejected();
    });
  });
});
