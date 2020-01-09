const assert = require('assert')

describe('Home page', () => {
  before(() => {
    require('./../../server/server.js');
  })
  // it('should have the right title', () => {
  //   browser.url('https://webdriver.io')
  //   const title = browser.getTitle()
  //   assert.strictEqual(title, 'WebdriverIO · Next-gen WebDriver test framework for Node.js')
  // })
  it('should work locally', () => {
    browser.url('http://localhost:3000');
    var chatTitle = browser.getTitle();
    assert.strictEqual(chatTitle, 'Join | KoglesbyChat');
  })
})