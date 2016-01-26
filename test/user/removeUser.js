var env = require('../../environment.js');
var useBrowser = "";
var os = "";

describe('Remove User',function() {
  var userPageBtn = element(by.css('[href="/user"]'));
  var removeBtn = element.all(by.buttonText('Remove'));
  var yesBtn = element(by.buttonText('Yes'));
  var userNameList = element.all(by.repeater('user in list.users').column('user.name'));
  var userPhoneList = element.all(by.repeater('user in list.users').column('user.phone'));
  var userAddressList = element.all(by.repeater('user in list.users').column('user.address'));
  var userCount = 0;

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
          case 'windows':
            name = '更新-' + os + '-' + env.params.windows.user;
            phone = '更新-' + os + '-' + env.params.windows.phone;
            address = '更新-' + os + '-' + env.params.windows.address;
          break;
        }
      });
    });
  });

  it('Remove User',function() {
    wait(2);
    goToUserPage();
    setUserCount();
    userNameList.getText().then(function(result) {
      for(var i = 0; i < result.length; i++){
        if(result[i] == "更新-" + os + '-' + useBrowser + "-user") {
          removeBtn.get(i).click();
          yesBtn.click();
          wait(2);
        }
      }
    });
  });
  
  it('Check User List Count',function() {
    goToUserPage();
    userNameList.count().then(function(result) {
      expect(result).not.toContain("更新-" + os + '-' + useBrowser + "-user");
    });
  });
});