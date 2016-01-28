module.exports = {
  framework: 'jasmine2',
  seleniumAddress: (process.env.SELENIUM_URL || 'http://10.26.1.27:4444/wd/hub'),
  params: {
    chrome: {
      user: 'chrome-user',
      phone: '0987654321',
      address: '台中市'
    },
    firefox: {
      user: 'firefox-user',
      phone: '0912345678',
      address: '台北市'
    },
    windows7: {
      user: 'windows7-user',
      phone: '0988776655',
      address: '高雄市'
    },
    windows8: {
      user: 'windows8-user',
      phone: '0911223345',
      address: '台南市'
    },
    windows10: {
      user: 'windows10-user',
      phone: '0985566520',
      address: '新北市'
    },
    safari: {
      user: 'safari-user',
      phone: '0913579246',
      address: '桃園市'
    }
  },
  web: 'http://10.26.1.14:3000/'
};
