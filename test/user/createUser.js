var env = require('../../environment.js');

describe('Create User',function() {
  var userPageBtn = element(by.css('[href="/user"]'));
  var createBtn = element(by.css('[class="md-raised md-primary md-button md-ink-ripple"]'));
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
          case 'internet explorer':
            name = os + '-' + env.params.ie.user;
            phone = os + '-' + env.params.ie.phone;
            address = os + '-' + env.params.ie.address;
          break;
          case 'safari':
            name = os + '-' + env.params.safari.user;
            phone = os + '-' + env.params.safari.phone;
            address = os + '-' + env.params.safari.address;
          break;
        }
      });
    });
  });
  
  it('create user', function() {
    wait(2);
    goToUserPage();
    createBtn.click();
    userNameInput.sendKeys(name);
    userPhoneInput.sendKeys(phone);
    userAddressInput.sendKeys(address);
    createUserBtn.click();

    userPage.getText().then(function(result) {
      expect(result).toBe('User');
    });

    userNameList.getText().then(function(result) {
      expect(result).toContain(name);
    });

    userPhoneList.getText().then(function(result) {
      expect(result).toContain('Phone: '+phone);
    });

    userAddressList.getText().then(function(result) {
      expect(result).toContain('Address: '+address);
    });
  });
});
