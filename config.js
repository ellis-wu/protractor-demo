var env = require('./environment.js');
var os;

exports.config = {
  framework: env.framework,
  specs: [
    'test/user/createUser.js',
    'test/user/editUser.js',
    'test/user/removeUser.js',
    'test/about/about.js',
    'test/language/en.js',
    'test/language/zh-TW.js'
  ],
  multiCapabilities: [{
    browserName: 'chrome',
    seleniumAddress: 'http://10.26.1.27:4444/wd/hub',
    os: 'ubuntu14.04'
  },
  {
    browserName: 'firefox',
    seleniumAddress: 'http://10.26.1.27:4444/wd/hub',
    os: 'ubuntu14.04'
  },
  {
    browserName: 'chrome',
    seleniumAddress: 'http://10.26.1.34:4444/wd/hub',
    os: 'windows7'
  },
  {
    browserName: 'internet explorer',
    seleniumAddress: 'http://10.26.1.34:4444/wd/hub',
    os: 'windows7'
  }],
  onPrepare:function(){
    var jasmineReporters = require('jasmine-reporters');
    return browser.getProcessedConfig().then(function(config) {
      var browserName = config.capabilities.browserName;
      var junitReporter = new jasmineReporters.JUnitXmlReporter({
        consolidateAll: false,
        savePath: 'e2e-reports',
        filePrefix: config.capabilities.os + '-' + browserName + '-xmloutput-',
        modifySuiteName: function(generatedSuitName, suite) {
          return browserName + '.' + generatedSuitName;
        }
      });
      jasmine.getEnv().addReporter(junitReporter);
    });
  }
}
