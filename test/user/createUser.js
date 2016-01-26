var env = require('../../environment.js');

describe('Create User',function() {
  var userPageBtn = element(by.css('[href="/user"]'));
  var createBtn = element(by.buttonText('Create'));
  var userNameInput = element(by.model('create.user.name'));
  var userPhoneInput = element(by.model('create.user.phone'));
  var userAddressInput = element(by.model('create.user.address'));
  var createUserBtn = element(by.css('[ng-click="create.create()"]'));
  var userNameList = element.all(by.repeater('user in list.users').column('user.name'));
  var userPhoneList = element.all(by.repeater('user in list.users').column('user.phone'));
  var userAddressList = element.all(by.repeater('user in list.users').column('user.address'));
  var userPage = element(by.css('[class="md-headline ng-binding ng-scope"]'));
  var userCount = 0;
  var os, name, phone, address;

  function wait(s) {
    browser.sleep(1000 * s);
  }

  function goToUserPage() {
    userPageBtn.click();
  }

  function setUserCount() {
    userNameList.count().then(function(result) {
      userCount = result;
    });
  }

  beforeEach(function() {
    browser.get(env.web);
    browser.getProcessedConfig().then(function(config) {
      os = config.capabilities.os;
      browser.getCapabilities().then(function (cap) {
        switch(cap.caps_.browserName) {
          case 'chrome':
            name = os + '-' + env.params.chrome.user;
            phone = os + '-' + env.params.chrome.phone;
            address = os + '-' + env.params.chrome.address;
          break;
          case 'firefox':
            name = os + '-' + env.params.firefox.user;
            phone = os + '-' + env.params.firefox.phone;
            address = os + '-' + env.params.firefox.address;
          break;
          case 'windows':
            name = os + '-' + env.params.windows.user;
            phone = os + '-' + env.params.windows.phone;
            address = os + '-' + env.params.windows.address;
          break;
        }
      });
    });
  });
  
  it('create user', function() {
    wait(2);
    goToUserPage();
    setUserCount();
    createBtn.click();
    userNameInput.sendKeys(name);
    userPhoneInput.sendKeys(phone);
    userAddressInput.sendKeys(address);
    createUserBtn.click();
  });

  it('check user page',function() {
    goToUserPage();
    userPage.getText().then(function(result) {
      expect(result).toBe('User');
    });
  });
  
  it('check name', function() {
    goToUserPage();
    userNameList.getText().then(function(result) {
      expect(result).toContain(name);
    });
  });

  it('check phone', function() {
    goToUserPage();
    userPhoneList.getText().then(function(result) {
      expect(result).toContain('Phone: '+phone);
    });
  });

  it('check address', function() {
    goToUserPage();
    userAddressList.getText().then(function(result) {
      expect(result).toContain('Address: '+address);
    });
  });
});