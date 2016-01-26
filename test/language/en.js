var env = require('../../environment.js');

describe('en version',function() {
	var languageSelect = element(by.id('select_value_label_0'));
	var enOption = element(by.css('[value="en"]'));
	var title = element(by.css('[class="ng-binding"]'));

	function wait(s) {
		browser.sleep(1000 * );
	}

	beforeEach(function() {
		browser.get(env.web);
	});

	it('select en',function() {
		wait(2);
		languageSelect.click();
		enOption.click();
		title.getText().then(function(result) {
			expect(result).toBe('DemoApp');
		});
	});
});