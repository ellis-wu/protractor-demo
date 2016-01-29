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
    ie: {
      user: 'ie-user',
      phone: '3345678',
      address: '高雄市'
    },
    safari: {
      user: 'safari-user',
      phone: '0913579246',
      address: '桃園市'
    }
  },
  web: 'http://10.26.1.14:3000/'
};
