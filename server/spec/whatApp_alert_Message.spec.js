/* eslint-disable no-undef */
const sinon = require('sinon');
const axios = require('axios');

const whatAppAlert = require('../whatApp_alert_Message');
const log = require('../log');
const customer = require('../customer');

const sandBox = sinon.createSandbox();

const url = 'https://graph.facebook.com/v15.0/106768935582427/messages';

const data = '{"messaging_product": "whatsapp", "to":"918489550288", "type": "template", "template": { "name": "wind_alert", "language": { "code": "en_US" },"components":[{"type":"body","parameters":[{"type":"text","text":"Samsu"},{"type":"text","text":"2022-11-17"}]}]}}';

const options = {
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${process.env.WHATSAPP_ACCESS_TOKEN}`,
  },
};

describe('WhatApp alert Message - ', () => {
  describe('doAxios Method ', () => {
    afterEach(() => {
      sandBox.restore();
    });
    it('should make call and resolve', async () => {
      sandBox.stub(axios, 'post').returns(Promise.resolve({ data: 'message sent' }));
      const value = await whatAppAlert.doAxios(url, data, options);
      expect(value).toEqual('message sent');
    });
    it('should make call and reject', async () => {
      sandBox.stub(axios, 'post').returns(Promise.reject(new Error('Sending message failed')));
      await expectAsync(whatAppAlert.doAxios(url, data, options)).toBeRejected();
    });
  });

  describe('alertMessage method', () => {
    afterEach(() => {
      sandBox.restore();
    });
    it('should make call and resolve', async () => {
      sandBox.stub(whatAppAlert, 'doAxios').returns('message sent');
      sandBox.stub(customer, 'countCustomerLocation').returns(4);
      sandBox.stub(log, 'logInsert').returns('log inserted');
      const value = await whatAppAlert.alertMessage(918489550288, 'Samsu', 'wind_alert');
      expect(value.status).toEqual('message and log stored');
    });
    it('should make call and reject', async () => {
      sandBox.stub(whatAppAlert, 'doAxios').throws(new Error('Message Sending failed'));
      await expectAsync(whatAppAlert.alertMessage(918489550288, 'Samsu', 'wind_alert')).toBeRejected();
    });
  });
});
