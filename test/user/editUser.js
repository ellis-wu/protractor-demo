var env = require('../../environment.js');
var useBrowser = "";
var os = "";

describe('Edit User',function() {
  var name, phone, address;
  var userPageBtn = element(by.css('[href="/user"]'));
  var editBtn = element.all(by.css('[class="md-button md-ink-ripple"]'));
  var userNameInput = element(by.model('edit.user.name'));
  var userPhoneInput = element(by.model('edit.user.phone'));
  var userAddressInput = element(by.model('edit.user.address'));
  var editUserBtn = element(by.css('[ng-click="edit.edit()"]'));
  var userNameList = element.all(by.repeater('user in list.users').column('user.name'));
  var userPhoneList = element.all(by.repeater('user in list.users').column('user.phone'));
  var userAddressList = element.all(by.repeater('user in list.users').column('user.address'));
  var userPage = element(by.css('[class="md-headline ng-binding ng-scope"]'));

  function wait(s) {
    browser.sleep(1000 * s);
  }

  function goToUserPage() {
    userPageBtn.click();
  }

  beforeEach(function() {
    browser.get(env.web);
    browser.getProcessedConfig().then(function(config) {
      os = config.capabilities.os
      browser.getCapabilities().then(function (cap) {
        useBrowser = cap.caps_.browserName;
        switch(cap.caps_.browserName){
          case 'chrome':
            name = '更新-' + os + '-' + env.params.chrome.user;
            phone = '更新-' + os + '-' + env.params.chrome.phone;
            address = '更新-' + os + '-' + env.params.chrome.address;
          break;
          case 'firefox':
            name = '更新-' + os + '-' + env.params.firefox.user;
            phone = '更新-' + os + '-' + env.params.firefox.phone;
            address = '更新-' + os + '-' + env.params.firefox.address;
          break;
          case 'windows7':
            name = os + '-' + env.params.windows7.user;
            phone = os + '-' + env.params.windows7.phone;
            address = os + '-' + env.params.windows7.address;
          break;
          case 'windows8':
            name = '更新-' + os + '-' + env.params.windows8.user;
            phone = '更新-' + os + '-' + env.params.windows8.phone;
            address = '更新-' + os + '-' + env.params.windows8.address;
          break;
          case 'windows10':
            name = '更新-' + os + '-' + env.params.windows10.user;
            phone = '更新-' + os + '-' + env.params.windows10.phone;
            address = '更新-' + os + '-' + env.params.windows10.address;
          break;
          case 'mac':
            name = '更新-' + os + '-' + env.params.mac.user;
            phone = '更新-' + os + '-' + env.params.mac.phone;
            address = '更新-' + os + '-' + env.params.mac.address;
          break;
        }
      });
    });
  });

  it('Edit User',function() {
    wait(2);
    goToUserPage();
    userNameList.getText().then(function(result) {
      for(var i = 0; i < result.length; i++){
        if(result[i] == os + '-' + useBrowser + "-user") {
          editBtn.get(i).click();
          userNameInput.clear();
          userNameInput.sendKeys(name);
          userPhoneInput.clear();
          userPhoneInput.sendKeys(phone);
          userAddressInput.clear();
          userAddressInput.sendKeys(address);
          editUserBtn.click();
        }
      }

      userPage.getText().then(function(result) {
        expect(result).toBe('User');
      });
      userNameList.getText().then(function(result) {
        expect(result).toContain(name);
      });

      userPhoneList.getText().then(function(result) {
        expect(result).toContain('Phone: ' + phone);
      });

      userAddressList.getText().then(function(result) {
        expect(result).toContain('Address: ' + address);
      });
    });
  });
});
